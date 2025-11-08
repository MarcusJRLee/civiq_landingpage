import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/types/types";
import { sendMetaConversionApiPayload } from "@/utility/events";

/** Handler for the POST request at '/api/events'. */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const event = (await request.json()).event as Event;
  return sendMetaConversionApiPayload(event);
}
