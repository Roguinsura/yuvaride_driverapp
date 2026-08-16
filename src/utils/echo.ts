import Echo from 'laravel-echo';
import { getValue } from './localstorage';
import {
  URL,
  WS_BROADCASTER,
  WS_KEY,
  WS_HOST,
  WS_PORT,
  WS_SCHEME,
  WS_CLUSTER,
} from '../api/config';


// @ts-ignore
const PusherClient = require('pusher-js/react-native').Pusher || require('pusher-js/react-native');

PusherClient.logToConsole = __DEV__;

// @ts-ignore
window.Pusher = PusherClient;

let echoInstance: any = null;
let cachedToken: string | null = null;
let warnedUnconfigured = false;

// Realtime needs a reachable WebSocket host and an app key. Until both are set
// in api/config.ts we use Echo's built-in `null` broadcaster, whose channels are
// chainable no-ops. Every screen can still call .private().listen() safely — the
// events just never arrive, instead of the socket layer throwing
// `invalid url host` and taking the screen down with it.
const isConfigured = Boolean(WS_KEY && WS_HOST);

const buildOptions = (token: string | null): any => {
  const auth = {
    // NOTE: /broadcasting/auth, NOT /api/broadcasting/auth — the latter 302s.
    authEndpoint: `${URL}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  };

  if (!isConfigured) {
    return { broadcaster: 'null' as const, ...auth };
  }

  return {
    broadcaster: WS_BROADCASTER,
    key: WS_KEY,
    wsHost: WS_HOST,
    wsPort: WS_PORT,
    wssPort: WS_PORT,
    forceTLS: WS_SCHEME === 'https',
    disableStats: true,
    // Reverb has no notion of clusters; laravel-echo blanks it out for us, but
    // pusher-js still wants the field present when talking to hosted Pusher.
    cluster: WS_CLUSTER,
    enabledTransports: ['ws', 'wss'],
    Pusher: PusherClient,
    ...auth,
  };
};

const getEchoInstance = async () => {
  const token = await getValue('token');

  if (echoInstance && cachedToken === token) {
    return echoInstance;
  }

  if (echoInstance) {
    try {
      echoInstance.disconnect();
    } catch (e) {
      console.error("Error disconnecting stale Echo instance:", e);
    }
  }

  cachedToken = token;

  if (!isConfigured && !warnedUnconfigured) {
    warnedUnconfigured = true;
    console.warn(
      '[Echo] Realtime disabled: set WS_KEY and WS_HOST in src/api/config.tsx. ' +
      'Ride requests, chat and verification updates will not arrive live.',
    );
  }

  echoInstance = new Echo(buildOptions(token));

  if (echoInstance.connector.pusher) {
    echoInstance.connector.pusher.connection.bind('state_change', (states: any) => {
      console.log(`[Echo] Connection state changed from ${states.previous} to ${states.current}`);
    });
    echoInstance.connector.pusher.connection.bind('error', (err: any) => {
      console.error('[Echo] Connection error:', err);
      if (err?.error?.data?.code === 4004) {
        console.error('[Echo] Critical: app not found or wrong credentials.');
      }
    });
    echoInstance.connector.pusher.connection.bind('connected', () => {
      console.log('[Echo] Connected! Socket ID:', echoInstance.socketId());
    });
    echoInstance.connector.pusher.connection.bind('disconnected', () => {
      console.log('[Echo] Disconnected.');
    });
  }

  return echoInstance;
};

export const disconnectEcho = () => {
  if (echoInstance) {
    echoInstance.disconnect();
    echoInstance = null;
  }
};

export default getEchoInstance;
