const Feedback = require('../models/feedback');

const submitFeedback = async (req, res) => {
    const { courseId, rating, comment } = req.body;

    try {
        const newFeedback = new Feedback({
            userId: req.user._id,
            courseId,
            rating,
            comment,
        });

        await newFeedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    submitFeedback,
};
