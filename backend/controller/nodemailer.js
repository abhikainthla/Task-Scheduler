const nodemailer = require('nodemailer');
const Mail = require('../models/mailSchema');
require('dotenv').config();

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "abhikainthla001@gmail.com",
        pass: process.env.PASS
    }
});

const sendEmail = async (req, res) => {
    const { email, subject, message } = req.body;

    try {
        const mailOptions = {
            from: "abhikainthla001@gmail.com",
            to: email,
            subject: subject,
            text: message
        };

        await transport.sendMail(mailOptions);
        

        let mailRecord = await Mail.findOne({ email, subject });
        
        if (!mailRecord) {
            
            mailRecord = new Mail({
                email: mailOptions.to,
                subject: mailOptions.subject,
                message: mailOptions.text,
                timestamp: new Date(),
                frequency: {
                    totalSent: 1, 
                    lastSent: new Date() 
                }
            });
        } else {

            mailRecord.frequency.totalSent += 1; 
            mailRecord.frequency.lastSent = new Date(); 
        }
        
        await mailRecord.save(); 

        res.status(200).json({ message: "Email sent successfully" });

    } catch (error) {
        console.error('Error in sending email:', error);
        res.status(500).json({ message: "An error occurred while sending the email." });
    }
};

const getEmails = async (req, res) => {
    try {
        const mails = await Mail.find();
        res.status(200).json(mails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ message: 'An error occurred while fetching emails.' });
    }
};

module.exports = {
    sendEmail,
    getEmails
};
