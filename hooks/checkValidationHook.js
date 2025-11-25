const { validationResult } = require('express-validator');

const checkValidationHook = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                errors: errors.array()
            });
        }

        next();
    };
};

module.exports = checkValidationHook;
