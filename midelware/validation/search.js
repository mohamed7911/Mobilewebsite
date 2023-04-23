const { body } = require('express-validator');

module.exports=[
    body("search").matches(/[a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)

]