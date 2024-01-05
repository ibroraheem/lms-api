const Payment = require('../models/payment');
const Course = require('../models/course');

const enrollInCourse = async (payment) => {
    const courseId = payment.courseId;

    try {
        const course = await Course.findById(courseId);
        if (course) {
            const isEnrolled = course.students.includes(payment.userId);
            if (!isEnrolled) {
                course.students.push(payment.userId);
                await course.save();
            }
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = { enrollInCourse };
