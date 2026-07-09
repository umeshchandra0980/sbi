const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendOTPEmail = async (email, otp, type = 'login') => {
  const typeLabels = {
    login: 'Login',
    transfer: 'Fund Transfer',
    registration: 'Registration',
    password_reset: 'Password Reset',
  };
  const label = typeLabels[type] || type;

  // In dev mode, just log it
  if (process.env.NODE_ENV !== 'production') {
    console.log(`\n📧 OTP EMAIL TO: ${email}\n   Type: ${label}\n   OTP: ${otp}\n   (Not sent in dev mode)\n`);
    return { success: true, preview: true };
  }

  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'SBI Online <noreply@sbi.co.in>',
    to: email,
    subject: `SBI Online Banking - ${label} OTP`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="background: #1a5276; padding: 15px; border-radius: 6px 6px 0 0; text-align: center;">
          <h2 style="color: #fff; margin: 0;">🏦 SBI Online Banking</h2>
        </div>
        <div style="padding: 25px; background: #f9f9f9;">
          <p>Dear Customer,</p>
          <p>Your One Time Password (OTP) for <strong>${label}</strong> is:</p>
          <div style="background: #1a5276; color: #fff; font-size: 32px; font-weight: bold; text-align: center; padding: 20px; border-radius: 6px; letter-spacing: 8px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #c0392b;"><strong>⚠️ This OTP is valid for 10 minutes only.</strong></p>
          <p style="color: #555; font-size: 12px;">Do NOT share this OTP with anyone. SBI will never ask for your OTP. If you did not initiate this request, please call 1800-11-2211 immediately.</p>
        </div>
        <div style="padding: 10px; background: #eee; text-align: center; font-size: 11px; color: #777; border-radius: 0 0 6px 6px;">
          © State Bank of India. This is an auto-generated email.
        </div>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
};

module.exports = { sendOTPEmail };
