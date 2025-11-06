import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const admin = process.env.ADMIN_EMAIL!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // ---- simple validation ----
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ---- send email ----
    await resend.emails.send({
      from: "Signup <onboarding@resend.dev>", // verified sender in Resend
      to: [admin],
      subject: `New signup: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `.trim(),
      // optional HTML version
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
