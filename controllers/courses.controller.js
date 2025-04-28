
const { validationResult } = require('express-validator');
const Course = require('../models/course.model');

const httpStatusText = require('../utils/httpStatusText');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({status: httpStatusText.SUCCESS, data: {courses}});
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, data: null, message: error.message });
    }
}

const getCourse = async (req, res) => {
    try {   
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ status: httpStatusText.FAIL, data: {course : null} });
        }
        res.status(200).json({ status: httpStatusText.SUCCESS, data: {course}});
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, data: null, message: error.message ,code :400});
    }
}

const addCourse = async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: httpStatusText.FAIL, data: {errors: errors.array()} });
    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: {course : newCourse} });
}

const updateCourse = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const updatedCourse = await Course.updateOne({_id: courseId}, {$set: req.body});
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { course: updatedCourse } });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: null});
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
} 


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}