const User = require('../models/auth.model');
const expressJwt = require('express-jwt');
const _ = require('lodash');

const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

// Custom Err Handler
const {errorHandler} = require('../helpers/dbErrorHandling'); 

// Mailing
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD, 
    },
  });



exports.registerController= (req,res)=>{
  
    const { name,email,password,tel} = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=>error.msg)[0];
        return res.status(422).json({
            errors: firstError
        })
    }else{
        User.findOne({
            email
        }).exec((err,user)=>{
            if(user){
                return res.status(400).json({
                    errors: "L'e-mail est déja pris"
                });
            }
        })
        const token= jwt.sign(
            {
                name,
                email,
                password,
                tel
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn : '15m'
            }
        )
            // Mail Data Sending
        const emailData = {
            from : process.env.EMAIL_FORM,
            to:email,
            subject: "Lien d'activation de compte",
            html : `
                <h1>Veuillez cliquer sur le lien ci-dessous pour activer</h1>
                <p>${process.env.CLIENT_URL}users/activate/${token}</p>
                <hr/>
                <p>Cet e-mail contient des informations sensibles</p>
                <p>${process.env.CLIENT_URL}</p>
            `

        }
        transporter.sendMail(emailData).then(sent=>{
            return res.json({
                message : `Email Has been sent To ${email}`
            })
        }).catch(err=>{
            return res.status(400).json({
                errors : errorHandler(err)
            })
        })
    }

}

// Active And save te DB
exports.activationController = (req, res) => {
    const { token } = req.body;

    if (token) {
        // verify if token is valide pr expired
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
            if (err) {
                    return res.status(401).json({
                    errors: 'Lien expiré. S\'inscrire à nouveau'
        });
            }else{
                // if valid save to DB
                const { name, email, password, tel } = jwt.decode(token);
                const user = new User({
                    name,
                    email,
                    password,
                    tel
                  });
        
                  user.save((err)=>{
                    if (err) {
                        console.log('Save error', errorHandler(err));
                        return res.status(401).json({
                        errors: errorHandler(err)
                          });
                    }else{
                        return res.json({
                            success: true,
                            message: 'Inscription réussie'
                          });
                    }
                  })
            }
        })
    }else{
        return res.json({
            message: 'une erreur se produit, veuillez réessayer'
          });
    }
}



exports.signinController = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      // check if user exist
      User.findOne({
        email
      }).exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            errors: 'L\'utilisateur avec cet e-mail n\'existe pas. Inscrivez vous s\'il vous plait'
          });
        }
         // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: 'Email et mot de passe ne correspondent pas'
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d'
        }
      );
      const { _id, name, email, role,tel } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role,
          tel
        }
      });
    });
  }
};

exports.requireSignin = expressJwt({ secret:  process.env.JWT_SECRET, algorithms: ["HS256"] });



exports.adminMiddleware = (req, res, next) => {
   User.findById({
     _id: req.user._id
  }).exec((err, user) => {
    if (err || !user) {
       return res.status(400).json({
      error: 'User not found'
     });
    }

     if (user.role !== 'admin') {
       return res.status(400).json({
         error: 'Admin resource. Access denied.'
       });
     }

     req.profile = user;
     next();
   });
 };



exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  }else{
    User.findOne({email},(err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: 'L\'utilisateur avec cet e-mail n\'existe pas'
        });
      }
      const token = jwt.sign({_id: user._id},process.env.JWT_RESET_PASSWORD,{expiresIn: '10m'});

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Lien de réinitialisation du mot de passe`,
        html: `
                  <h1>Veuillez utiliser le lien suivant pour réinitialiser votre mot de passe</h1>
                  <p>${process.env.CLIENT_URL}users/password/reset/${token}</p>
                  <hr />
                  <p>Cet e-mail peut contenir des informations sensibles</p>
                  <p>${process.env.CLIENT_URL}</p>
              `
      };
      return user.updateOne({resetPasswordLink: token},(err, success) => {
        if (err) {
          //console.log('RESET PASSWORD LINK ERROR', err);
          return res.status(400).json({
            errors:
              'Erreur de connexion à la base de données sur la demande d\'oubli du mot de passe de l\'utilisateur'
          });
        }else{
          transporter.sendMail(emailData).then(sent=>{
            return res.json({
              message: `Un e-mail a été envoyé à ${email}.`
            });
          }).catch(err=>{
            return res.json({message: err.message});
          })
        } 
      })
    })
  }
}


exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  }else{
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err,decoded){
        if (err) {
          return res.status(400).json({
            errors: 'Lien expiré. Réessayer'
          });
        }
        User.findOne({resetPasswordLink},(err, user) => {
          if (err || !user) {
            return res.status(400).json({
              errors: 'Quelque chose s\'est mal passé. Essayer plus tard'
            });
          }
          const updatedFields = {password: newPassword,resetPasswordLink: ''};

          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                errors: 'Erreur lors de la réinitialisation du mot de passe utilisateur'
              });
            }
            res.json({
              message: `Vous pouvez maintenant vous connecter avec votre nouveau mot de passe`
            });
          });
        })
      })
    }
  }
}