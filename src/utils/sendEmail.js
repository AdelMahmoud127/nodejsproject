import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // بريدك الإلكتروني
      pass: process.env.EMAIL_PASS, // كلمة المرور
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email, // Recipient address (should be dynamic)
    subject: options.subject,
    text: options.text,
    html: options.message
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
