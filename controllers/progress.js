const Progress = require('../models/progress');

const updateProgress = async (req, res) => {
    const courseId = req.params.courseId;
    const lessonId = req.body.lessonId;
    const userId = req.user._id;

    try {
        let progress = await Progress.findOne({ userId, courseId });

        if (!progress) {
            progress = new Progress({
                userId,
                courseId,
                completedLessons: [{ lessonId, completed: true }],
            });

            await progress.save();
        } else {
            const lessonIndex = progress.completedLessons.findIndex(
                (lesson) => lesson.lessonId.toString() === lessonId.toString()
            );

            if (lessonIndex === -1) {
                progress.completedLessons.push({ lessonId, completed: true });
            }

            await progress.save();
        }

        res.status(200).json({ message: 'Progress updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    updateProgress,
};
