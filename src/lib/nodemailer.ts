import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 25,
  secure: false, // true for 465, false for other ports
  pool: true,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
