const { validationResult } = require("express-validator")

const handleValidation = (URLPath) => {
	return (req, res, next) => {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
		  return next()
		} else {
            req.flash("errorsValidators", errors.errors);
            res.redirect(URLPath)
		}  
	}
}
module.exports=handleValidation;