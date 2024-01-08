// routes/certificate.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { generateCertificate } = require('../controllers/certificate');
const { checkCourseCompletion } = require('../middlewares/middleware')
const authenticate = passport.authenticate('jwt', { session: false });

router.use(authenticate);

router.post('/:courseId/generate', checkCourseCompletion, generateCertificate);

module.exports = router;
