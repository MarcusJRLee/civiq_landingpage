import {
  MetaConversionApiPayload,
  EventName,
  Event,
  SignUpData,
} from "@/types/types";
import { getUnixTimestamp } from "@/utility/time";
import { hash256 } from "@/utility/crypto";
import { getBrowserData } from "@/utility/device";
import { NextResponse } from "next/server";

/** Generate a random and unique EventID. */
export function generateEventId(): string {
  return `nextjs_cap_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/** Base function to send the event to your Next.js API Route. */
export async function sendEvent(event: Event) {
  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Server Event Failed:", result);
      // Optional: Add a client-side message here (e.g., using a toast library)
      return { success: false, error: result };
    }

    console.log(`Event ${event.eventName} sent successfully:`, result);
    return { success: true, result };
  } catch (error) {
    console.error("Error sending event to API:", error);
    return { success: false, error };
  }
}

/** Sends a "ViewContent" event to the server. */
export async function createViewContentEvent(
  contentName?: string,
  contentCategory?: string
): Promise<Event> {
  const browserData = await getBrowserData();
  const event: Event = {
    eventName: EventName.ViewContent,
    eventSourceUrl: window.location.href,
    eventTime: getUnixTimestamp(),
    eventId: generateEventId(),
    userData: {
      ...browserData,
    },
    customData: {
      content_name: contentName,
      content_category: contentCategory,
    },
  };
  return event;
}

/** Sends a "CompleteRegistration" event to the server. */
export async function createCompleteRegistrationEvent(
  signUpData: SignUpData
): Promise<Event> {
  const browserData = await getBrowserData();
  const event: Event = {
    eventName: EventName.CompleteRegistration,
    eventSourceUrl: window.location.href,
    eventTime: getUnixTimestamp(),
    eventId: generateEventId(),
    userData: {
      em: hash256(signUpData.email),
      zp: hash256(signUpData.zip),
      ...browserData,
    },
    customData: {
      status: "Success",
    },
  };
  return event;
}

/** Sends a "Contact" event to the server. */
export async function createContactEvent(): Promise<Event> {
  const browserData = await getBrowserData();
  const event: Event = {
    eventName: EventName.Contact,
    eventSourceUrl: window.location.href,
    eventTime: getUnixTimestamp(),
    eventId: generateEventId(),
    userData: {
      ...browserData,
    },
    customData: {
      status: "Success",
    },
  };
  return event;
}

/**
 * Sends an Event payload to the Meta Conversions API:
 * https://developers.facebook.com/docs/marketing-api/conversions-api
 *
 * This should only be called from server-side code.
 */
export async function sendMetaConversionApiPayload(
  event: Event
): Promise<NextResponse> {
  const pixelId = process.env.FACEBOOK_PIXEL_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const apiVersion = process.env.FACEBOOK_API_VERSION || "v24.0";

  if (!pixelId || !accessToken) {
    console.error("Missing Facebook API configuration.");
    return NextResponse.json(
      {
        error: "Server configuration error.",
      },
      { status: 500 }
    );
  }

  try {
    // Build the Conversions API payload.
    const payload: MetaConversionApiPayload = {
      data: [
        {
          event_name: event.eventName,
          event_time: event.eventTime,
          event_source_url: event.eventSourceUrl,
          event_id: event.eventId,
          action_source: "website",
          user_data: event.userData,
          custom_data: event.customData,
        },
      ],
      test_event_code: process.env.FACEBOOK_TEST_EVENT_CODE,
    };

    // Send the event to Meta.
    const apiUrl = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${accessToken}`;

    // Implement simple retry mechanism with exponential backoff.
    const MAX_RETRIES = 3;
    let lastResponse;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      lastResponse = await response.json();

      if (response.ok && lastResponse.events_received) {
        // Success
        return NextResponse.json(lastResponse, { status: 200 });
      } else if (response.status >= 500 && attempt < MAX_RETRIES - 1) {
        // Retry on server errors
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        // Fatal error or last retry failed
        console.error("Facebook CAPI Error:", lastResponse);
        return NextResponse.json(
          {
            error: "Failed to send event to Facebook.",
            details: lastResponse,
          },
          { status: response.status || 500 }
        );
      }
    }

    // Should not be reached if MAX_RETRIES is > 0, but as a fallback:
    return NextResponse.json(
      {
        error: "Failed to send event after multiple retries.",
        details: lastResponse,
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("API Route execution error:", error);
    return NextResponse.json(
      {
        error: "Internal server error processing event.",
      },
      { status: 500 }
    );
  }
}
