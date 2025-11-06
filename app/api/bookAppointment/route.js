import { NextResponse } from "next/server";
import { db } from "@/firebase"; // adjust if needed
import { collection, addDoc, Timestamp } from "firebase/firestore";
import nodemailer from "nodemailer";
import twilio from "twilio";
export const dynamic = "force-dynamic";

// ✅ Email Transporter (Gmail)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// ✅ Twilio Client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, name, phone, email, doctor, specialization, slot, date } = body;

    if (!userId || !name || !phone || !email || !date) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔹 Save Appointment in Firestore
    const docRef = await addDoc(collection(db, "appointments"), {
      userId,
      name,
      phone,
      email,
      doctor: doctor || "General Consultation",
      specialization,
      slot,
      date,
      status: "upcoming",
      createdAt: Timestamp.now(),
    });

    // 🔹 Send Email (only if email exists)
    if (email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Appointment Confirmation",
        text: `Hello ${name}, your appointment with Dr. ${doctor || "our doctor"} is confirmed for ${date} at ${slot || "your selected time"}.`,
      });
    }

    // 🔹 Send SMS (only if phone exists)
    if (phone) {
      await client.messages.create({
        body: `Hello ${name}, appointment confirmed with Dr. ${doctor || "our doctor"} on ${date} at ${slot || "your selected time"}.`,
        from: process.env.TWILIO_PHONE,
        to: phone,
      });
    }

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("❌ Error booking appointment:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

