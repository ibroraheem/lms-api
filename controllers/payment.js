const axios = require('axios');
const Payment = require('../models/payment');

const generateUniqueReference = () => {
    
};

const initiatePayment = async (req, res) => {
    const { userId, courseId, amount, paymentDescription } = req.body;
    const paymentReference = generateUniqueReference();

    const monnifyData = {
        amount,
        customerName: req.user.name,
        customerEmail: req.user.email,
        paymentReference,
        paymentDescription,
        currencyCode: 'NGN',
        contractCode: 'your-contract-code',
        redirectUrl: 'https://your-redirect-url.com',
        paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
    };

    try {
        const monnifyResponse = await axios.post('monnify-api-url/initiate-payment', monnifyData);

        const newPayment = new Payment({
            userId,
            courseId,
            amount,
            paymentReference,
            paymentDescription,
            transactionReference: monnifyResponse.responseBody.transactionReference,
            checkoutUrl: monnifyResponse.responseBody.checkoutUrl,
        });
        await newPayment.save();

        res.status(200).json({ checkoutUrl: monnifyResponse.responseBody.checkoutUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const handleWebhook = async (req, res) => {
    const eventData = req.body.eventData;

    if (eventData && eventData.paymentStatus === 'PAID') {
        const paymentReference = eventData.paymentReference;

        try {
            const payment = await Payment.findOne({ paymentReference });

            if (payment) {
                // Update the payment status in your database
                payment.paymentStatus = 'PAID';
                await payment.save();

                // Trigger enrollment logic
                await enrollInCourse(payment);
            }
        } catch (error) {
            console.error(error);
        }
    }

    res.status(200).end();
};
module.exports = { initiatePayment, handleWebhook };
