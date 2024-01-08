const Course = require('../models/course');

const isCourseInstructor = async (req, res, next) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findOne({ _id: courseId });
        const userId = course.instructor
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.instructor.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        req.course = course;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const checkCourseCompletion = async (req, res, next) => {
    const courseId = req.params.courseId;

    try {
        const enrollment = await Course.findOne({ courseId, userId: req.user._id, isCompleted: true });

        if (!enrollment) {
            return res.status(403).json({ message: 'You have not completed this course' });
        }


        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const isStudentEnrolled = async (req, res, next) => {
    const courseId = req.params.id;
    const userId = req.user._id; // Assuming userId is available in the request, adjust it based on your authentication setup

    try {
        const course = await Course.findOne({ _id: courseId });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user is enrolled as a student in the course
        if (!course.students.includes(userId.toString())) {
            return res.status(403).json({ message: 'Permission denied. User is not enrolled in the course.' });
        }

        req.course = course;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = { isCourseInstructor, checkCourseCompletion, isStudentEnrolled };
