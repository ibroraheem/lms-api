const Certificate = require('../models/certificate');

const generateCertificate = async (req, res) => {
    const { courseId } = req.params;

    try {
        const newCertificate = new Certificate({
            userId: req.user._id,
            courseId,
        });

        await newCertificate.save();

        res.status(201).json({ message: 'Certificate generated successfully', certificate: newCertificate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find({ userId: req.user._id });

        res.status(200).json({ certificates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

const getCertificateByCourse = async (req, res) => {
    try {
        const certificate = await Certificate.findOne({ userId: req.user._id, courseId: req.params.courseId });
        if (!certificate) {
            return res.status(404).json({ error: 'Certificate not found' });
        }
        res.status(200).json({ certificate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { generateCertificate, getCertificates, getCertificateByCourse };
