const express = require('express');
const router = express.Router()
const passport = require('passport');
const { createCourse, getAllCourses, getCourseById, updateCourseById, deleteCourseById } = require('../controllers/course');
const { initiatePayment, handleWebhook } = require('../controllers/payment');
const { isCourseInstructor } = require('../middlewares/middleware');

router.get('/', getAllCourses);
router.get('/:courseId', getCourseById);

const authenticate = passport.authenticate('jwt', { session: false });
router.use(authenticate);

router.post('/create', isCourseInstructor, createCourse);
router.patch('/:courseId', isCourseInstructor, updateCourseById);
router.delete('/:courseId', isCourseInstructor, deleteCourseById);
router.post('/pay', initiatePayment);
router.post('/webhook', handleWebhook);
module.exports = router;