let { courses } = require('../data/courses');
const {validationResult } = require('express-validator');

const getAllCourses = (req, res) => {
    res.json(courses);
}

const getCourse = (req, res) => {
    const courseId = +req.params.courseId;
    const founded_course = courses.find(course => course.id == courseId);
    if (!founded_course) {
        return res.status(404).json({ msg: "Course not found" });
    }
    res.status(200).json(founded_course);
}

const addCourse =  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const course = { id: courses.length + 1, ...req.body };
        courses.push(course);
        res.status(201).json(course);
}

const updateCourse = (req, res) => {
    const courseId = +req.params.courseId;
    let course = courses.find(course => course.id === courseId);
    if (!course) {
        return res.status(404).json({ msg: "course not found" });
    }
    console.log("passed");
    course = { ...course, ...req.body };
    res.status(200).json(course);
}

const deleteCourse = (req, res) => {
    const courseId = +req.params.courseId;
    courses = courses.filter(course => course.id != courseId)
    res.status(200).json({ success: true });
}


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}