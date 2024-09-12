// const express = require('express');
// const { sendEmail } = require('../controller/nodemailer');
// const cron = require('node-cron');

// const router = express.Router();
// let scheduledJobs = {}; // Object to store scheduled jobs by unique keys (email + subject)

// // Route to schedule an email
// router.post('/send-email', (req, res) => {
//     const { email, subject, message, cronSchedule } = req.body;

//     // Validate request data
//     if (!email || !subject || !message || !cronSchedule) {
//         return res.status(400).json({ message: "All fields are required: email, subject, message, and cronSchedule" });
//     }

//     // Create a unique key for the scheduled job based on the email and subject
//     const jobKey = `${email}-${subject}`;

//     // If a job for the same email and subject already exists, stop it before creating a new one
//     if (scheduledJobs[jobKey]) {
//         scheduledJobs[jobKey].stop(); // Stop the existing job
//         delete scheduledJobs[jobKey]; // Remove it from the scheduled jobs
//         console.log(`Existing job for ${jobKey} stopped and replaced with a new schedule.`);
//     }

//     // Schedule the email sending task based on the cron expression
//     const job = cron.schedule(cronSchedule, async () => {
//         try {
//             // Call the sendEmail function, using mocked response object
//             await sendEmail(
//                 { body: { email, subject, message } },
//                 { status: (statusCode) => ({ json: (data) => console.log(`Mocked Response: ${data}`) }) }
//             );
//             console.log(`Email sent to ${email} with subject "${subject}" at ${new Date().toISOString()}`);
//         } catch (error) {
//             console.error(`Failed to send email to ${email}:`, error);
//         }
//     });

//     // Store the job in the scheduled jobs object
//     scheduledJobs[jobKey] = job;

//     // Start the cron job
//     job.start();

//     console.log(`Scheduled email to ${email} with subject "${subject}" at interval "${cronSchedule}"`);
//     res.status(200).json({ message: "Email scheduling request received and scheduled." });
// });

// module.exports = router;
