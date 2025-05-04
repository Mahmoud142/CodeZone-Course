const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
module.exports = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.currentUser.role)) {
            return next(appError.create('You are not allowed to access this resource', 403, httpStatusText.ERROR));
        }
        next();
    }
}