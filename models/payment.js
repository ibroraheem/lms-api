const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentReference: {
        type: String,
        required: true,
        unique: true,
    },
    paymentDescription: {
        type: String,
        required: true,
    },
    transactionReference: {
        type: String,
        required: true,
    },
    checkoutUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
