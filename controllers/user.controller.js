const User = require('../models/auth.model');

const expressJwt = require('express-jwt');

const transporteur = require("../models/transporteurs.model");

const restaurateur = require("../models/restaurateurs.model");

exports.readController = (req, res) => {
    const userId = req.params.id;

    User.findById(userId).exec((err, user) => {
        if (err || !user) {

            return res.status(400).json({
                errors: 'User not found'
               
            });
           
        }
        res.json(user);
 
    });
};

exports.updateController = (req, res) => {
    
  
    const { name, tel } = req.body;

    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                errors: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                errors: 'Le nom est requis'
            });
        } else {
            user.name = name;
        }
        var valide = /^0[5-7]\d{8}$/;
        if (!tel) {
            
            return res.status(400).json({
                errors: 'Veuillez Saisir un numero de teléphone'
            });
        }else if (!valide.test(tel)) {
                return res.status(400).json({
                    errors: 'Veuillez Saisir un numero de teléphone Valide'
                });
            } else {
                user.tel = tel;
            }
        

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    errors: 'User update failed'
                });
            }
            res.json(updatedUser);
        });
    });
};





exports.readControlleraAllUsers = (req, res) => {
   

    User.find().exec((err, user) => {
        if (err || !user) {

            return res.status(400).json({
                errors: 'Users not found'
               
            });
           
        }
        res.json(user);
 
    });
};




exports.DeleteController = (req, res) => {

    User.findByIdAndDelete({_id:req.params.id}).exec((err, user) => {
        if (err || !user) {

            return res.status(400).json({
                errors: 'User not deleted'
               
            });
           
        }
        res.json(user)
   

},   )}

exports.toAdminController = (req, res) => {

    User.findOne({_id:req.params.id}).exec((err, user) => {
        if (err || !user) {

            return res.status(400).json({
                errors: 'User not found'
               
            });
           
        }else{
            user.role="Admin"
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    errors: 'User update failed'
                });
            }
            res.json(updatedUser);
        });
   
})}





exports.readTransporteurs = (req, res) => {
   

    transporteur.find().exec((err, user) => {
        if (err || !user) {

            return res.status(400).json({
                errors: 'transporteur not found'
               
            });
           
        }
        res.json(user);
 
    });
};




exports.readRestaurateurs = (req, res) => {
   

    restaurateur.find().exec((err, user) => {
        if (err || !user) {

            return res.status(400).json({
                errors: 'transporteur not found'
               
            });
           
        }
        res.json(user);
 
    });
};



