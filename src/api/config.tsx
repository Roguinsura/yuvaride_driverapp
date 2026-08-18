import {
  GOOGLE_MAP_KEY as ENV_GOOGLE_MAP_KEY,
  ORS_API_KEY as ENV_ORS_API_KEY,
} from '@env';

export const URL = 'https://fieldnova.com';

// Google Maps browser key. Set GOOGLE_MAP_KEY in .env (gitignored) — see .env.example.
//
// Every map here is a WebView loading the Maps JavaScript API, so this value ships
// inside the bundle by design and cannot be kept secret. What protects it is the
// HTTP-referrer restriction, the API allow-list and the quota caps set on it in
// Google Cloud Console — not secrecy. Never paste a literal back in: a key committed
// to this repo is a key that has to be rotated.
export const GOOGLE_MAP_KEY: string = ENV_GOOGLE_MAP_KEY ?? '';

if (__DEV__ && !GOOGLE_MAP_KEY) {
  console.warn(
    '[config] GOOGLE_MAP_KEY is empty — copy .env.example to .env and set it, ' +
      'then restart Metro with --reset-cache. Every map screen will be blank until you do.',
  );
}

// OpenRouteService key, used for route geometry on the active-ride map
// (src/screen/home/ride). Set ORS_API_KEY in .env — see .env.example.
//
// Unlike the Maps key this is a private per-account credential: OpenRouteService
// offers no referrer, IP or package restriction of any kind, and it is currently
// interpolated straight into WebView HTML, so it leaves the device in clear text.
// De-hardcoding it here keeps it out of git, but it still ships in the bundle —
// the durable fix is to proxy ORS through the Laravel backend so the key never
// reaches the client at all.
export const ORS_API_KEY: string = ENV_ORS_API_KEY ?? '';

// Realtime (WebSocket) broadcasting.
//
// Leave WS_KEY or WS_HOST empty to run with realtime switched off — see
// utils/echo.ts, which then falls back to Echo's `null` broadcaster instead of
// trying to open a socket. Ride requests, chat and document-verification
// updates stop arriving live, but nothing crashes.
//
// WS_KEY must match REVERB_APP_KEY (or PUSHER_APP_KEY) in the server's .env.
//
// Unlike GOOGLE_MAP_KEY above, this one is deliberately a literal rather than an
// .env value. A Pusher-protocol app key is a public identifier, not a secret:
// every client has to present it in the connection URL before it can subscribe
// to anything, and it grants nothing on its own — REVERB_APP_SECRET does the
// authorising and never leaves the server. Routing it through .env would only
// mean that a clone without one silently loses realtime, because babel is set
// to allowUndefined and the empty fallback disables Echo without an error.
//
// Reverb listens on 8080 because that port is open on the host and terminates
// TLS itself; there is no Apache proxy in front of it. See ~/reverb/ on the
// server for the keepalive and certificate-rotation scripts.
export const WS_BROADCASTER: 'reverb' | 'pusher' = 'reverb';
export const WS_KEY = 'yrtdtapyoopzf7p46ved';
export const WS_HOST = 'fieldnova.com';
export const WS_PORT = 8080;
export const WS_SCHEME: 'https' | 'http' = 'https';
// Pusher-hosted only; Reverb ignores this.
export const WS_CLUSTER = 'mt1';

export const ENABLE_GLOBAL_RATE_LIMIT = true
export const ENABLE_ENDPOINT_THROTTLE = false
export const ENABLE_TAB_GUARD = true
