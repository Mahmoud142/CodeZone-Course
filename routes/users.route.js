const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verfiyToken');
const multer = require('multer');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const filename = `user-${Date.now()}.${ext}`;
        cb(null, filename);
    }
});
const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    if (imageType === 'image') {
        cb(null, true);
    } else {
        cb(appError.create('Invalid file type', 400, httpStatusText.ERROR), false);
    }
}
const upload = multer({ storage: diskStorage, fileFilter });

router.route('/')
    .get(verifyToken,usersController.getAllUsers)
router.route('/register')
    .post(upload.single('avatar'), usersController.register)
router.route('/login')
    .post(usersController.login)

module.exports = router;
