const {
  check
} = require('express-validator');

exports.validSign = [
  check('name', 'Le nom est requis').notEmpty()
  .isLength({
    min: 3,
    max: 30
}).withMessage('le nom doit comporter entre 3 et 32 caractères'),

check('email')
.isEmail()
.withMessage('Doit être une adresse e-mail valide'),

check('password', 'Mot de passe requis').notEmpty(),

check('password').isLength({
  min: 6
}).withMessage('Le mot de passe doit contenir au moins 6 caractères').matches(/\d/).withMessage('le mot de passe doit contenir au moins un chiffre')
]

exports.validLogin = [
  check('email')
  .isEmail()
  .withMessage('Doit être une adresse e-mail valide'),
  check('password', 'Mot de passe requis').notEmpty(),
  check('password').isLength({
      min: 6
  }).withMessage('Le mot de passe doit contenir au moins 6 caractères').matches(/\d/).withMessage('le mot de passe doit contenir au moins un chiffre')
]

exports.forgotPasswordValidator = [
  check('email')
      .not()
      .isEmpty()
      .isEmail()
      .withMessage('Doit être une adresse e-mail valide')
];

exports.resetPasswordValidator = [
  check('newPassword')
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage('Le mot de passe doit contenir au moins 6 caractères').matches(/\d/).withMessage('le mot de passe doit contenir au moins un chiffre')
];