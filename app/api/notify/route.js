import nodemailer from "nodemailer";
import twilio from "twilio";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, doctor, specialization, slot, date } = body;

    // ✅ Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DoctorBuddy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Appointment Confirmation",
      text: `Hello ${name}, your appointment is confirmed.
      
Doctor: ${doctor || specialization}
Date: ${date}
Slot: ${slot || "N/A"}
      
Thank you for booking with us!`,
    });

    // ✅ SMS setup
    try {
      const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
      await client.messages.create({
        body: `Hello ${name}, your appointment with ${doctor || specialization} is confirmed for ${date} at ${slot || "N/A"}.`,
        from: process.env.TWILIO_PHONE,
        to: phone, // must include country code
      });
    } catch (smsErr) {
      console.error("❌ SMS failed:", smsErr.message);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Notify API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}


