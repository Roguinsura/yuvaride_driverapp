export const URL = 'https://fieldnova.com';

export const GOOGLE_MAP_KEY = 'REDACTED_GOOGLE_MAPS_KEY';

// Realtime (WebSocket) broadcasting.
//
// Leave WS_KEY or WS_HOST empty to run with realtime switched off — see
// utils/echo.ts, which then falls back to Echo's `null` broadcaster instead of
// trying to open a socket. Ride requests, chat and document-verification
// updates stop arriving live, but nothing crashes.
//
// WS_KEY must match REVERB_APP_KEY (or PUSHER_APP_KEY) in the server's .env.
export const WS_BROADCASTER: 'reverb' | 'pusher' = 'reverb';
export const WS_KEY = '';
export const WS_HOST = '';
export const WS_PORT = 443;
export const WS_SCHEME: 'https' | 'http' = 'https';
// Pusher-hosted only; Reverb ignores this.
export const WS_CLUSTER = 'mt1';

export const ENABLE_GLOBAL_RATE_LIMIT = true
export const ENABLE_ENDPOINT_THROTTLE = false
export const ENABLE_TAB_GUARD = true
