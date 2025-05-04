const express = require('express');
const { body } = require('express-validator');
const verifyToken = require('../middlewares/verfiyToken');
const userRole = require('../utils/userRoles');
const router = express.Router();
const allowedTo = require('../middlewares/allowedTo');
const courseController = require('../controllers/courses.controller');
const { validationScheme } = require('../middlewares/validationScheme');

// Base route
router.get('/', courseController.getAllCourses);
router.post('/', validationScheme(), courseController.addCourse);

// Course by ID routes
router.route('/:id')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(verifyToken, allowedTo(userRole.ADMIN, userRole.MANAGER), courseController.deleteCourse);


module.exports = router;