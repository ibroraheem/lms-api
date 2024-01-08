const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
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
    completedLessons: [
        {
            lessonId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course.lessons',
            },
            completed: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
