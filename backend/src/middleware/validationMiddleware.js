const { body, validationResult } = require('express-validator');

// Fonction réutilisable pour la validation des erreurs
const validateErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => err.msg) });
  }
  next();
};

// Validation pour la création de client
exports.validateCustomer = [
  body('email')
    .exists().withMessage('Customer.email cannot be null').bail()
    .notEmpty().withMessage('Customer.email cannot be null').bail()
    .isLength({ max: 255 }).withMessage('Validation len on email failed').bail()
    .isEmail().withMessage('Validation isEmail on email failed'),

  body('password')
    .exists().withMessage('Password is required').bail()
    .notEmpty().withMessage('Password cannot be empty'),

  validateErrors
];

// Validation pour la mise à jour de client
exports.validateCustomerUpdate = [
  body('email')
    .optional()
    .isEmail().withMessage('Validation isEmail on email failed')
    .isLength({ max: 255 }).withMessage('Validation len on email failed'),

  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('address')
    .optional(),

  validateErrors
];