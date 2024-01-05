const isCourseInstructor = async (req, res, next) => {
    const courseId = req.params.id;
    const userId = req.user._id;

    try {
        const course = await Course.findById(courseId);

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

module.exports = {
    isCourseInstructor,
};
