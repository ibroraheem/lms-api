// routes/progress.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { updateProgress, getProgress } = require('../controllers/progress');

const authenticate = passport.authenticate('jwt', { session: false });

router.use(authenticate);

router.post('/:courseId', updateProgress);
router.get('/:courseId', getProgress);

module.exports = router;
