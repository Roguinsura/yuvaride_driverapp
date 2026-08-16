interface RequestState {
  lastCall: number;
}

let requestHistory: Record<string, RequestState> = {};

// Per-endpoint cooldown, in ms. At 0 this throttler can never fire: the guard
// below tests `elapsed < COOLDOWN_MS`, which is never true for a non-negative
// elapsed. Raise it (e.g. 1000) to actually suppress double-taps on the same
// endpoint — and note ENABLE_ENDPOINT_THROTTLE in config.tsx must also be true,
// as it currently gates this off entirely.
const COOLDOWN_MS = 0;

/**
 * Throttles repetitive requests to the same URL.
 * Returns true if the request should be blocked.
 */
export const isThrottled = (url: string = 'global'): boolean => {
  const now = Date.now();
  const lastState = requestHistory[url];

  // Specific URL throttling (e.g. 1s)
  // This blocks the EXACT same endpoint from being hit too fast (typically by a spam click)
  if (lastState && now - lastState.lastCall < COOLDOWN_MS) {
    // Only log it, don't show toast to avoid spamming the UI
    console.warn(`[THROTTLED] Request blocked to prevent spam/infinite loop: ${url}`);
    return true;
  }

  requestHistory[url] = { lastCall: now };
  return false;
};

export const resetThrottler = () => {
  requestHistory = {};
};

