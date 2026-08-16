

import axios from "axios";
import { URL, ENABLE_GLOBAL_RATE_LIMIT, ENABLE_ENDPOINT_THROTTLE } from "./config";
import { getValue, clearValue } from "../utils/localstorage/index";
import { isThrottled } from "./requestThrottler";
// import { isGlobalRateLimited } from "./ratelimitter";
import { navigationRef } from "./methods";
import { notificationHelper } from "../commonComponents";
import { isGlobalRateLimited } from "./rateLimiter";
// import { notificationHelper } from "@src/commonComponent";

export const api = axios.create({
  baseURL: `${URL}/api/`,
});

let apiCallCount = 0;
let lastGlobalWarningTime = 0; // Throttle toast popups too

api.interceptors.request.use(
  async (config) => {
    try {
      const isWhitelisted = config.url && (
        config.url.includes("language") ||
        config.url.includes("translate") ||
        config.url.includes("settings") ||
        config.url.includes("home-screen") ||
        config.url.includes("self")
      );

      // 1. GLOBAL RATE LIMIT (Burst protection: 20 per 10s)
      if (ENABLE_GLOBAL_RATE_LIMIT && !isWhitelisted && isGlobalRateLimited()) {
        const now = Date.now();
        if (now - lastGlobalWarningTime > 3000) { // Don't spam the toast itself
          notificationHelper("", "Too many attempts. Please wait a minute before trying again", "error");
          lastGlobalWarningTime = now;
        }
        const error: any = new Error(`[GlobalLimit] burst limit reached`);
        // Flag it: axios still runs the response interceptor for a rejection
        // raised here, and that branch must not report a local block as a
        // server response.
        error.isLocalRateLimit = true;
        error.response = { status: 429, data: { message: "Too many attempts" } };
        return Promise.reject(error);
      }

      // 2. PER-ENDPOINT THROTTLER (Same URL spam: 1 per 2s)
      if (ENABLE_ENDPOINT_THROTTLE && config.url && !isWhitelisted && isThrottled(config.url)) {
        const error: any = new Error(`[Throttler] Blocked duplicate: ${config.url}`);
        error.isLocalRateLimit = true;
        error.response = { status: 429, data: { message: "Too many requests" } };
        return Promise.reject(error);
      }

      const token = await getValue("token");
      const language = await getValue("selectedLanguage");
      const defaultLng = await getValue("defaultLanguage");
      const currentLng = language || defaultLng;

console.log('Tokeen',token);

      config.headers = config.headers || {};

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers["Accept-Lang"] = currentLng;
      config.headers["Content-Type"] = "application/json";
      config.headers.Accept = "application/json";

      const callTime = new Date().toLocaleTimeString();
      ;

      return config;
    } catch (e: any) {
      console.error(`[API Request Error]`, e);
      return Promise.reject(e);
    }
  },
  (error) => {
    console.error(`[API Request Interceptor Error]`, error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // Log response details
    return response;
  },
  async (error) => {
    // Log specifically if the error is from the response (status code etc)
    if (error.response) {
      console.error(
        `[API Response Error] ${error.response.status} ${error.config.url}`,
        error.response.data,
      );
    } else {
      console.error(`[API Network/Unknown Error] ${error.message || 'No message'}`, error);
    }

    if (error.name === "AbortError") {
      return Promise.reject(new Error("Request cancelled"));
    }

    // 423 is a cancellation hold: the account is blocked for a fixed number of
    // minutes. Unlike 429 it is NOT retryable — retrying does not shorten the
    // hold. Flagged on the error so callers can tell it apart from a generic
    // failure without re-reading the status.
    if (error.response?.status === 423) {
      const data = error.response.data || {};
      const retryAfterHeader =
        error.response.headers?.["retry-after"] ??
        error.response.headers?.["Retry-After"];

      let minutes = data.retry_after_minutes;
      if (minutes == null && retryAfterHeader != null) {
        const seconds = Number(retryAfterHeader);
        // Retry-After may also be an HTTP-date, which Number() makes NaN.
        minutes = Number.isFinite(seconds) ? Math.ceil(seconds / 60) : null;
      }

      error.isCancellationHold = true;
      error.holdReason = data.reason ?? null;
      error.retryAfterMinutes = minutes ?? null;

      // The service layer discards the error and returns `e.response`, so the
      // header-derived fallback has to live on the body to survive that hop.
      if (error.response.data && data.retry_after_minutes == null) {
        error.response.data.retry_after_minutes = minutes ?? null;
      }

      notificationHelper(
        "",
        minutes != null
          ? `Blocked for ${minutes} more minute${minutes === 1 ? "" : "s"} due to recent cancellations.`
          : "Blocked for a short while due to recent cancellations.",
        "error",
      );
      return Promise.reject(error);
    }

    if (error.response?.status === 429) {
      // A local burst-limit block never reached the server and has already
      // toasted in the request interceptor — a second, server-attributed
      // message here would be both duplicated and untrue.
      if (!error.isLocalRateLimit) {
        notificationHelper("", "Too many requests from server", "error");
      }
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      const token = await getValue("token");
      if (token) {
        await clearValue();
        notificationHelper("", "Session Expired", "error");
        if (navigationRef.isReady()) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
      }
    }

    return Promise.reject(error);
  },
);
