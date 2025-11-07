import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { SignUpData } from "@/types/sign_up_data";

const resend = new Resend(process.env.RESEND_API_KEY);

/** Validates the SignUpData. */
function validateData(data: SignUpData): NextResponse | null {
  const { email, zip, timestamp } = data;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: "Invalid ZIP code" }, { status: 400 });
  }
  if (!timestamp) {
    return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });
  }
  return null;
}

/** Sends the email using Resend to complete the sign up process. */
async function sendEmail(data: SignUpData) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.RESEND_TO_EMAIL!,
    subject: `CivIQ Sign Up: ${data.email}`,
    html: `
      <h2>New Signup!</h2>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>ZIP:</strong> ${data.zip}</p>
      <p><strong>Timestamp:</strong> ${new Date(
        data.timestamp
      ).toLocaleString()}</p>
    `,
  });
}

/** Handler for the POST request at '/api/signup'. */
export async function POST(request: Request): Promise<NextResponse> {
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    console.log(`'/api/signup' request received.`);
  }

  try {
    // Validate the data.
    const data = (await request.json()).data as SignUpData;
    const failureResponseOr = validateData(data);
    if (failureResponseOr) {
      console.log(`'/api/signup' failed validation:`, failureResponseOr);
      return failureResponseOr;
    }

    // If in production, send an email.
    if (isProd) {
      sendEmail(data);
      console.log(`Successful sign up at ${data.timestamp}`);
    } else {
      console.log(`Non prod success (${process.env.NODE_ENV}):`, data);
    }

    return NextResponse.json({ success: true });
  } catch (reason: unknown) {
    console.error("Signup email error:", reason);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
