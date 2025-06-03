require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.DEST_EMAIL,
    pass: process.env.SMTP_PASS
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Email server up and running' });
});

app.post('/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body;
  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, text or html' });
  }
  try {
    const info = await transporter.sendMail({
      from: `"Render Email Server" <${process.env.DEST_EMAIL}>`,
      to,
      subject,
      text,
      html
    });
    res.json({ message: 'Email sent', messageId: info.messageId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
