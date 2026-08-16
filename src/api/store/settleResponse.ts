/**
 * Turns a swallowed HTTP error back into a thunk rejection.
 *
 * Every service in `api/services` catches the axios error and returns
 * `e.response`, so a 4xx resolves through the exact same path as a 200 — the
 * call site cannot tell them apart, and `.unwrap()` never throws. That is how a
 * rejected arrival (422) still advanced the driver to the OTP screen, and how a
 * failed payment still navigated away as if cash had been recorded.
 *
 * `response` is undefined when axios never received a reply at all (network
 * down, request aborted), which is why that case is separate from an HTTP
 * status: there is no status to report, so callers get status 0.
 *
 * Usage:
 *   async (arg, { rejectWithValue }) =>
 *     settleResponse(await someService.call(arg), rejectWithValue)
 */
export const settleResponse = (
  response: any,
  rejectWithValue: (value: any) => any,
) => {
  if (!response) {
    return rejectWithValue({ status: 0, message: null })
  }

  if (response.status >= 400) {
    return rejectWithValue({ status: response.status, ...response.data })
  }

  return response.data
}
