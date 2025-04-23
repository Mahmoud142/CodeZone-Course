const { body } = require('express-validator')
const validationScheme = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('title is required')
            .isLength({ min: 2 })
            .withMessage("title at least 2 chars"),
        body('price')
            .notEmpty()
            .withMessage('price is required')
    ]
}

module.exports = {
    validationScheme
}