/** Payload for sending a request to '/api/signup'. */
export interface SignUpData {
  email: string;
  zip: string;
  timestamp: number;
}

/** EventNames for Meta Ads Events. */
export enum EventName {
  ViewContent = "ViewContent",
  CompleteRegistration = "CompleteRegistration",
  Contact = "Contact",
}

/** Payload for sending a request to `/api/events`. */
export interface Event {
  eventName: EventName;
  eventSourceUrl: string;
  eventTime: number; // Unix timestamp in seconds
  eventId: string; // Unique ID for deduplication
  userData: UserData;
  customData: CustomData;
}

/**
 * UserData for a Meta Ad Event using the Conversions API:
 * https://developers.facebook.com/docs/marketing-api/conversions-api
 * https://developers.facebook.com/docs/marketing-api/conversions-api/parameters
 */
export interface UserData {
  em?: string; // Email
  ph?: string; // Phone
  fn?: string; // First Name
  ln?: string; // Last Name
  ct?: string; // City
  st?: string; // State/Province
  zp?: string; // Zip/Postal Code
  cn?: string; // Country
  // Non-hashed browser identifiers
  fbc?: string; // Facebook Click ID
  fbp?: string; // Facebook Browser ID
  client_ip_address?: string; // Client IP Address (do not hash)
  client_user_agent?: string; // Client User Agent (do not hash)
}

/**
 * CustomData for a Meta Ad Event using the Conversions API:
 * https://developers.facebook.com/docs/marketing-api/conversions-api
 */
export interface CustomData {
  content_name?: string;
  content_category?: string;
  status?: string;
  contact_type?: string;
  // Other custom data can go here (e.g., value, currency)
}

/** Browser-related data collected from the client for event payloads. */
export interface BrowserData {
  client_ip_address?: string; // Client IP Address (do not hash)
  client_user_agent?: string; // Client User Agent (do not hash)
  fbp?: string; // Facebook Browser ID
  fbc?: string; // Facebook Click ID
}

/**
 * Represents event data in the format expected by Meta Conversions API:
 * https://developers.facebook.com/docs/marketing-api/conversions-api/parameters
 */
export interface MetaConversionApiData {
  event_name: string;
  event_time: number;
  event_source_url: string;
  event_id: string;
  action_source: string;
  user_data: UserData;
  custom_data: CustomData;
}

/**
 * Payload structure for making post requests to the Meta Conversions API:
 * https://developers.facebook.com/docs/marketing-api/conversions-api/parameters
 */
export interface MetaConversionApiPayload {
  data: Array<MetaConversionApiData>;
  test_event_code?: string;
}
