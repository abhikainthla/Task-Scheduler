const express = require('express');
const { sendEmail, getEmails, cancelEmailSchedule } = require('../controller/nodemailer');
const cron = require('node-cron');

const router = express.Router();
let scheduledJobs = {};

router.post('/send-email', (req, res) => {
  const { email, subject, message, cronSchedule } = req.body;

  if (scheduledJobs[email]) {
    scheduledJobs[email].stop();
  }

  const job = cron.schedule(cronSchedule, async () => {
    try {
      await sendEmail({ body: { email, subject, message } }, { status: () => ({ json: console.log }) });
      console.log(`Email sent to ${email} with subject "${subject}" at ${new Date().toISOString()}`);
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
    }
  });

  scheduledJobs[email] = job;
  job.start();

  console.log(`Scheduled email to ${email} with subject "${subject}" at interval "${cronSchedule}"`);
  res.status(200).json({ message: "Email scheduling request received" });
});


router.post('/cancel-email', (req, res) => {
  const { email } = req.body;

  if (scheduledJobs[email]) {
    scheduledJobs[email].stop();
    delete scheduledJobs[email];
    console.log(`Canceled email schedule for ${email}`);
    res.status(200).json({ message: `Scheduled email for ${email} has been canceled.` });
  } else {
    res.status(404).json({ message: `No scheduled email found for ${email}.` });
  }
});

router.get('/get-emails', getEmails);

module.exports = router;
