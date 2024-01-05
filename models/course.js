const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lessons: [lessonSchema],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    price: {
        type: Number,
        default: 0, 
        required: true,
    },
    couponCodes: [
        {
            code: {
                type: String,
            },
            discount: {
                type: Number,
            },
        },
    ],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
