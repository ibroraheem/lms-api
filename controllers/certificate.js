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
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { generateCertificate };
