const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: { type: Date, default: Date.now },
    frequency: {
        totalSent: { type: Number, default: 0 },
        lastSent: { type: Date }
    }
});

const Mail = mongoose.model('Mail', mailSchema);
module.exports = Mail;
