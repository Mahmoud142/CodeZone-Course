
const { validationResult } = require('express-validator');
const Course = require('../models/course.model');


const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({status: "success", data: {courses:courses}});
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}

const getCourse = async (req, res) => {
    try {   
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}

const addCourse = async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
}

const updateCourse = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {$set: req.body});
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        res.status(200).json(deletedCourse);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}