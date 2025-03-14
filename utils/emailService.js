const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  let transporter;

  // If no SMTP credentials provided, create an Ethereal test account
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log("Ethereal test account created.");
    console.log("Test Account User:", testAccount.user);
    console.log("Test Account Pass:", testAccount.pass);
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.example.com",
      port: process.env.EMAIL_PORT || 587,
      auth: {
        user: process.env.EMAIL_USER || "user@example.com",
        pass: process.env.EMAIL_PASS || "password",
      },
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || "no-reply@example.com",
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);

  // If using Ethereal, get the preview URL
  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log("Preview URL: %s", previewUrl);
  }

  // Return both info and previewUrl so the controller can use it
  return { info, previewUrl };
};
