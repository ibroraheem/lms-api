const express = require('express');

const { signup, login, forgotPassword, verifyEmail, resetPassword, googleSignup, googleSignupCallback } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup);
router.patch('verify-email', verifyEmail);
router.post('/login', login);
router.get('/auth/google', googleSignup);
router.get('/auth/google/callback', googleSignupCallback);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);

module.exports = router;
