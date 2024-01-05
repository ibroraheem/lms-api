const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('../utils/nodemailerConfig');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { username, password, email, name, role } = req.body;
        if (!username || !password || !email || !name || !role) {
            return res.status(422).json({ message: 'Complete all fields!' })
        }
        if (!['student', 'instructor'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const newUser = new User({ username, password, email, name, otp, role });
        await newUser.save();
        const mailOptions = {
            from: process.env.EMAIL,
            to: newUser.email,
            subject: 'Welcome',
            text: `Welcome to our app! Verify your email address with this otp <strong>${otp}</strong>`,
        };

        await nodemailer.sendMail(mailOptions);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
const verifyEmail = async (req, res) => {
    const otp = req.body.otp;
    try {
        const user = await User.findOne({ otp });
        if (!user) return res.status(401).json({ message: 'Invalid OTP' });
        user.isVerified = true;
        user.otp = undefined;
        user.save();
        res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(422).json({ message: "username and password are required" });
    const user = await User.findOne({ username });
    if (!user) return res.status(403).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(403).json({ message: "Invalid Password" })
    const token = jwt.sign({ sub: user._id }, process.env.SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login Successful", username: user.username, token });
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        const appLink = ''
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(7).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        const resetLink = `${appLink}/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetLink}`,
        };

        await nodemailer.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        const user = await User.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
            return done(null, existingUser);
        }

        const existingEmailUser = await User.findOne({ email: profile.emails[0].value });

        if (existingEmailUser) {

            existingEmailUser.googleId = profile.id;
            await existingEmailUser.save();

            return done(null, existingEmailUser);
        }

        const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
        });

        await newUser.save();
        return done(null, newUser);
    } catch (error) {
        return done(error, false);
    }
}));

const googleSignup = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleSignupCallback = passport.authenticate('google', { failureRedirect: '/login' }, (req, res) => {
    res.redirect('/');
});
module.exports = {
    signup,
    login,
    forgotPassword,
    verifyEmail,
    resetPassword,
    googleSignup,
    googleSignupCallback
};