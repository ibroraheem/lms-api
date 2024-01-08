// routes/feedback.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isStudentEnrolled } = require('../middlewares/middleware')
const { submitFeedback } = require('../controllers/feedback');

const authenticate = passport.authenticate('jwt', { session: false });

router.use(authenticate);

router.post('/submit', isStudentEnrolled, submitFeedback);

module.exports = router;
