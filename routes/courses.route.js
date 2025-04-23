
const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const courseController = require('../controllers/courses.controller');
const { validationScheme } = require('../middlewares/validationScheme');

router.route('/')
    .get(courseController.getAllCourses)
    .post(validationScheme(), courseController.addCourse);
router.route('/:courseId')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

module.exports = router;