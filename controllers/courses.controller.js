const { validationResult } = require('express-validator');
const Course = require('../models/course.model');
const mongoose = require('mongoose');

const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const AppError = require('../utils/appError');

const getAllCourses = asyncWrapper(async (req, res, next) => {
    // pagination
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const courses = await Course.find({}, { "__v": false }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { courses } });
})

const getCourse = asyncWrapper(async (req, res, next) => {
    const courseId = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        const err = AppError.create("Invalid course ID format", 400, httpStatusText.FAIL);
        return next(err);
    }

    const course = await Course.findById(courseId);
    if (!course) {
        const err = AppError.create("Course not found", 404, httpStatusText.FAIL);
        return next(err);
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
})

const addCourse = asyncWrapper(async (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = AppError.create(errors.array(), 400, httpStatusText.FAIL);
            next(err);
        }
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
    })

const updateCourse = asyncWrapper(async (req, res, next) => {
        const courseId = req.params.id;
        const updatedCourse = await Course.updateOne({ _id: courseId }, { $set: req.body });
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { course: updatedCourse } });
    })

const deleteCourse = asyncWrapper(async (req, res, next) => {
    const courseId = req.params.id;
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        const err = AppError.create("Invalid course ID format", 400, httpStatusText.FAIL);
        return next(err);
    }
    const course = await Course.findById(courseId);
    if (!course) {
        const err = AppError.create("Course not found", 404, httpStatusText.FAIL);
        return next(err);
    }
    await Course.deleteOne({ _id: courseId });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
})


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}