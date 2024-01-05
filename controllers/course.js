const Course = require('../models/course');

const createCourse = async (req, res) => {
    const { title, description, lessons, couponCodes, price } = req.body;
    try {
        const newCourse = new Course({
            title,
            description,
            lessons,
            instructor: req.user._id,
            price,
            couponCodes
        });
        const savedCourse = await newCourse.save();
        res.status(200).send({ message: 'Course created successfully', savedCourse });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const getAllCourses = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const courses = await Course.paginate({}, { page, limit });

        return res.status(200).json({
            totalPages: courses.totalPages,
            currentPage: courses.page,
            courses: courses.docs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const getCourseById = async (req, res) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateCourseById = async (req, res) => {
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

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteCourseById = async (req, res) => {
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

        const deletedCourse = await Course.findByIdAndDelete(courseId);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCourse, getAllCourses, getCourseById, updateCourseById, deleteCourseById };
