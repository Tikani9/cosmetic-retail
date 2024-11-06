// server.js

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service
    auth: {
        user: 'tikanitikoishi@gmail.com',
        pass: '0713473635'    
    }
});

// API endpoint to handle order submissions
app.post('/order', (req, res) => {
    const { name, email, product } = req.body;

    // Send email notification
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-notification-tikanitikoishi@gmail.com',
        subject: 'New Product Order',
        text: `New order received:\n\nName: ${name}\nEmail: ${email}\nProduct: ${product}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending notification email.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Order placed and notification sent.');
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
