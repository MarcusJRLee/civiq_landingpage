import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Event, SignUpData } from "@/types/types";
import { sendMetaConversionApiPayload } from "@/utility/events";
import { supabase } from "@/utility/supabase";
import { Database } from "@/types/supabase";

type SignUpsInsert = Database["public"]["Tables"]["sign_ups"]["Insert"];

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
async function sendEmail(signUpData: SignUpData) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: signUpData.email,
    bcc: process.env.RESEND_TO_EMAIL!,
    subject: `Welcome to CivIQ!`,
    html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to CivIQ!</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .header h1 {
        color: #1a1a1a;
        margin-bottom: 8px;
        font-size: 28px;
      }
      .civiq-brand {
        color: #6d28d9;
        font-weight: 700;
        font-size: 32px;
      }
      .content {
        background: #f9f9f9;
        padding: 24px;
        border-radius: 12px;
        border-left: 4px solid #6d28d9;
      }
      .highlight {
        color: #6d28d9;
        font-weight: 600;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        color: #666;
        font-size: 14px;
      }
      .link {
        color: #6d28d9;
        text-decoration: none;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Welcome to <span class="civiq-brand">CivIQ</span>!</h1>
      <p><em>The platform for modern governance.</em></p>
    </div>

    <div class="content">
      <p>
        Thank you for signing up for the CivIQ beta program — we’re excited to
        have you on board!
      </p>

      <p>
        CivIQ is not yet available in your area (${signUpData.zip}), but rest assured:
        <span class="highlight"
          >we'll send you a personal invitation the moment it launches near
          you</span
        >.
      </p>

      <p>
        We use these early access sign ups to inform where to launch next so
        share CivIQ with your friends to get access sooner!
      </p>

      <p>
        We deeply appreciate your interest and are excited to build a future
        where government is truly responsive to your voice.
      </p>
    </div>

    <div class="footer">
      <p>
        <em
          >CivIQ • <a href="https://forms.gle/8VUcLtYRrHyJBsw9A">Contact</a> •
          <a href="https://bit.ly/49abdbE">Website</a></em
        >
      </p>
    </div>
  </body>
</html>
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
    const payload = await request.json();
    const signUpData = payload.data as SignUpData;

    const failureResponseOr = validateData(signUpData);
    if (failureResponseOr) {
      console.log(`'/api/signup' failed validation:`, failureResponseOr);
      return failureResponseOr;
    }

    // If in production, send an email.
    if (isProd) {
      sendEmail(signUpData);
      console.log(`Successful sign up at ${signUpData.timestamp}`);
    } else {
      console.log(`Non prod success (${process.env.NODE_ENV}):`, signUpData);
    }

    // Update Supabase "sign_ups" table.
    const newTableEntry: SignUpsInsert = {
      email: signUpData.email,
      zip_code: Number(signUpData.zip),
    };
    const { data, error } = await supabase
      .from("sign_ups")
      .insert([newTableEntry]);
    if (error) {
      console.log(`"sign_ups" insert error: `, error);
    }

    // Send a Meta Conversion API event to track this signup.
    const event = payload.event as Event;
    sendMetaConversionApiPayload(event);

    return NextResponse.json({ success: true });
  } catch (reason: unknown) {
    console.error("Signup email error:", reason);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
