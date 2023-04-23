const { body } = require('express-validator');
module.exports=[
    body("userName").matches(/[a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    body("email").isEmail(),
    body("password").isStrongPassword(),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
]