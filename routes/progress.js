// routes/progress.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { updateProgress } = require('../controllers/progress');

const authenticate = passport.authenticate('jwt', { session: false });

router.use(authenticate);

router.post('/:courseId/update-progress', updateProgress);

module.exports = router;
