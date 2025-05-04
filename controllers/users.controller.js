const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');

const getAllUsers = asyncWrapper(async (req, res, next) => {
    // pagination
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const users = await User.find({}, { "__v": false, 'password': false }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { users } });
})
const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password) {
        const error = appError.create("All fields are required", 400, httpStatusText.FAIL);
        return next(error)
    }
    const user = await User.findOne({ email });
    if (user) {
        const error = appError.create("User already exists", 400, httpStatusText.FAIL);
        return next(error)
    }
    const hashedPassword = await bcrypt.hash(password, 10);



    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        avatar: req.file.filename
        
    });
    const token = await generateJWT({ email: newUser.email, id: newUser._id, role: newUser.role });
    newUser.token = token;
    await newUser.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { newUser } });

})
const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = appError.create("Email and password are required", 400, httpStatusText.FAIL);
        return next(error)
    }

    const user = await User.findOne({ email });
    if (!user) {
        const error = appError.create("User not found", 404, httpStatusText.FAIL);
        return next(error)
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        const error = appError.create("Invalid password", 401, httpStatusText.FAIL);
        return next(error)
    }
    const token = await generateJWT({ email: user.email, id: user._id, role: user.role });
    user.token = token;

    res.status(200).json({ status: httpStatusText.SUCCESS, data: { token } });
})

module.exports = {
    getAllUsers,
    register,
    login
}

