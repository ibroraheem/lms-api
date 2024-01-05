const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    otp: { type: String },
    isVerified: { type: Boolean, required: true, default: false },
    resetPasswordExpires: { type: Date },
    googleId: { type: String },
    role: { type: String, required: true, enum: ['instructor', 'student'] }
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
