import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // load .env

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

async function sendTestMail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"DoctorBuddy" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // send mail to yourself for testing
      subject: "✅ Test Email from DoctorBuddy",
      text: "Hello! This is a test email to confirm SMTP setup is working.",
    });

    console.log("Test email sent ✅:", info.messageId);
  } catch (err) {
    console.error("❌ Test email failed:", err);
  }
}

sendTestMail();

