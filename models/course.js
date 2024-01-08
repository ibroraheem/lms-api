const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
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
    accessibleToAll: {
        type: Boolean,
        default: false,
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
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
