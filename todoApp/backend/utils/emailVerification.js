```javascript
const nodemailer = require('nodemailer');
const { User } = require('../../models/User');
const sequelize = require('../../database/sequelize');

async function sendVerificationEmail(email, verificationToken) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.db',
    port: 587,
    secure: false,
    auth: {
      user: 'example@example.com',
      pass: 'password',
    },
  });

  const mailOptions = {
    from: '"Todo App" <no-reply@todoapp.com>',
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: 
           http://localhost:3000/verify-email?token=${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Verification email sent' };
  } catch (error) {
    throw new Error('Failed to send verification email');
  }
}

async function verifyEmailToken(req, res) {
  const { token } = req.query;

  try {
    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(404).json({ success: false, error: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
}

module.exports = {
  sendVerificationEmail,
  verifyEmailToken,
};
```