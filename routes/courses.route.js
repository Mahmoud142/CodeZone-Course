const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const courseController = require('../controllers/courses.controller');
const { validationScheme } = require('../middlewares/validationScheme');

// Base route
router.get('/', courseController.getAllCourses);
router.post('/', validationScheme(), courseController.addCourse);

// Course by ID routes
router.get('/:id', courseController.getCourse);
router.patch('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;