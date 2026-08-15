# YuvaRide Driver

The driver-side mobile app for YuvaRide — a ride-hailing platform. Drivers sign
up and upload their documents here, go online, receive and bid on ride
requests, navigate to riders, and track earnings, wallet and payouts.

It talks to a Laravel backend (`Modules/YuvaRide`) that also serves the rider
app and the admin panel. This repository is the driver app only.

- **Package id:** `com.yuvaride.driver`
- **Platforms:** Android (primary) and iOS
- **Backend:** https://fieldnova.com

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React Native 0.82.1, React 19.1.1 |
| Language | TypeScript 5.8 |
| State | Redux Toolkit + React Redux, thunks in `src/api/store/action` |
| HTTP | Axios, with a thin service layer in `src/api/services` |
| Navigation | React Navigation 6 (native stack + bottom tabs) |
| Maps | Google Maps **JS API inside a WebView** — not `react-native-maps` — plus the Directions REST API |
| Push | Firebase Cloud Messaging + Notifee for display |
| Realtime | Laravel Echo over Reverb (or Pusher) — **off by default**, see below |
| Animation | Reanimated 4, Lottie, `rn-tourguide` for onboarding coach marks |
| UI | Hand-rolled components in `src/commonComponents`, SVG icons via `react-native-svg` |

---

## Requirements

| Tool | Version |
| --- | --- |
| Node | >= 20 |
| JDK | 17 |
| Android SDK | compileSdk/targetSdk **36**, minSdk **24** |
| Android NDK | 27.1.12297006 |
| Gradle | 9.0.0 (via the wrapper — do not install it yourself) |
| Kotlin | 2.1.20 |
| Xcode + CocoaPods | for iOS only |

Android Studio's SDK Manager is the easiest way to get SDK 36 and NDK
27.1.12297006. Both must be installed or the Gradle build fails at configure
time.

---

## Getting started

```bash
git clone https://github.com/Roguinsura/yuvaride_driverapp.git
cd yuvaride_driverapp
npm install

# iOS only
cd ios && pod install && cd ..
```

### Run it

Start Metro in one terminal:

```bash
npm start
```

Then, with a device connected over USB (`adb devices` should list it) or an
emulator running:

```bash
npm run android      # or: npm run ios
```

`npm run android` builds a debug APK, installs it, and connects it to Metro,
so edits reload on the device without rebuilding.

### Useful commands

```bash
npm run lint             # ESLint
npx tsc --noEmit         # type check
npm test                 # Jest
adb reverse tcp:8081 tcp:8081   # if the device can't reach Metro
```

> **Type-check baseline:** `npx tsc --noEmit` currently reports ~381 errors,
> nearly all inherited from the original template (mistyped style props,
> duplicate JSX attributes). They do not block the build. When changing code,
> compare against that baseline rather than expecting zero.

---

## Configuration

### Backend and keys — `src/api/config.tsx`

```ts
export const URL = 'https://fieldnova.com'   // Laravel API base
export const GOOGLE_MAP_KEY = '...'          // Directions, Places, geocoding
```

Point `URL` at your own server to develop against it. It has no trailing slash
and no `/api` — the service layer appends those.

### Realtime — same file

Broadcasting is **switched off by default**: `WS_KEY` and `WS_HOST` are empty,
so `src/utils/echo.ts` falls back to Echo's `null` broadcaster. The app works
fully; ride requests, chat and document-verification updates simply arrive on
refresh rather than instantly, and nothing crashes.

To switch it on, set `WS_KEY` to match the server's `REVERB_APP_KEY` (or
`PUSHER_APP_KEY`) and `WS_HOST` to the Reverb host.

### Google Maps

There is no native map view. `src/screen/mapView` builds an HTML page that
loads the Google Maps JavaScript API and renders it in a `react-native-webview`,
with routes fetched separately from the Directions REST API. So the key needs
**Maps JavaScript API**, **Directions API** and **Geocoding API** enabled — and
if you restrict it by platform, the JS API call comes from a WebView, not from
the native SDK.

The key is in two places and both must be set:

- `GOOGLE_MAP_KEY` in `src/api/config.tsx` — used by the JS/WebView map and the
  Directions calls
- `google_maps_api_key` in `android/app/src/main/res/values/strings.xml`,
  referenced from `AndroidManifest.xml`

### Firebase

`android/app/google-services.json` is committed and registered for
`com.yuvaride.driver`. Replace it with your own project's file if you change
the package id, or push notifications stop arriving.

### Ads

Test AdMob ids ship in `app.json`. Replace them before a production release.

---

## Project layout

```
src/
├── api/
│   ├── config.tsx        # base URL, map key, realtime + feature flags
│   ├── services/         # one module per endpoint group
│   └── store/            # Redux slices, thunks, types
├── assets/               # images, SVG icons, Lottie animations, fonts
├── commonComponents/     # shared UI (Input, Button, Header, helpers)
├── navigation/           # stacks and tab navigators
├── screen/
│   ├── auth/             # login, OTP, multi-step registration
│   ├── home/             # online toggle, incoming requests, live ride
│   ├── mapView/          # navigation and route drawing
│   ├── myRide/           # ride history and detail
│   ├── fleet/            # fleet-manager screens (hidden at login for now)
│   ├── settings/         # profile, vehicle, documents, wallet, payouts
│   └── intro/            # splash, walkthrough
├── theme/                # colours, fonts, responsive size helpers
└── utils/                # permissions, storage, echo, context, helpers
```

**Sizing:** use `windowWidth(n)` / `windowHeight(n)` from `theme/appConstant`
rather than raw pixels — they are percentages of the screen, which is how the
rest of the app stays consistent across devices.

**Colours:** `theme/appColors`. Brand orange is `appColors.primary`. Do not
hardcode hex values; several screens support light and dark themes through
`useTheme()` and `useValues()`.

---

## Building a release APK

```bash
cd android
./gradlew assembleRelease
```

The APK lands in `android/app/build/outputs/apk/release/`. The build splits per
ABI, so `app-arm64-v8a-release.apk` is the one for a modern phone.

Two things that will waste your afternoon:

1. **Never chain `clean` and `assembleRelease` in one invocation.**
   `./gradlew clean assembleRelease` fails — cleaning wipes Reanimated's prefab
   package before the app's native build reads it. Run them as separate
   commands.
2. **Do not pipe Gradle to `tail`.** It masks the exit code, so `BUILD FAILED`
   can arrive alongside a zero exit status.

> **Signing is not production-ready.** `android/app/build.gradle` still points
> the `release` build type at the **debug** keystore. Generate a real keystore
> and wire up a `release` signing config before publishing to the Play Store —
> an APK signed with the debug key cannot be uploaded, and the key you first
> publish with can never be changed.

---

## Permissions

The app requests, on Android:

`INTERNET` · `ACCESS_FINE_LOCATION` · `ACCESS_COARSE_LOCATION` ·
`ACCESS_BACKGROUND_LOCATION` · `POST_NOTIFICATIONS` · `SYSTEM_ALERT_WINDOW` ·
`FOREGROUND_SERVICE` · `READ/WRITE_EXTERNAL_STORAGE` · `ACCESS_MEDIA_LOCATION` ·
`WAKE_LOCK` · `VIBRATE` · `RECEIVE_BOOT_COMPLETED` · `ACCESS_NETWORK_STATE`

Background location and the "appear on top" overlay are both needed for the
driver to keep receiving ride requests with the screen off.

**If you add a permission request, route it through
`src/utils/appPermissions.tsx`.** Android shows one runtime dialog at a time and
silently drops any request made while another is in flight — returning
*denied* without ever showing it. That module holds a queue that serialises
every prompt. `commonComponents/helper/permissionHelper.tsx` delegates to it;
do not add a third implementation.

---

## Known issues

- **Document uploads are capped at 2 MB by the backend** (`mimes:jpeg,png,jpg,pdf`,
  `max:2048`). The image picker does not downscale, so a photo from a modern
  phone camera can exceed it — and because registration runs in one
  transaction, one oversized file fails the whole signup with a raw Laravel
  message. Adding `maxWidth`/`maxHeight` to the picker options fixes it.
- **Release builds are debug-signed** — see the signing note above.
- **Internal names still say Taxido** (`app.json` `name`, `settings.gradle`
  `rootProject.name`, the `ios/TaxidoDriverUI` directory). Cosmetic and
  invisible to users; renaming touches the Xcode project.
- **Fleet login is hidden.** The Driver/Fleet switcher on the login screen is
  commented out with a restore note; the fleet screens themselves are intact.
- **Illustrations still use the old green** `#199675` rather than brand orange.

---

## Troubleshooting

**Metro is already running / port 8081 in use** — an old instance is still
alive. `lsof -ti:8081` finds it.

**Device can't reach Metro over USB** — `adb reverse tcp:8081 tcp:8081`.

**App can't reach the API on a phone** — check the phone is not on a network
that blocks the host; mobile data is a quick way to rule it out.

**Red screen after switching branches** — `npm start --reset-cache`.

**Gradle can't find the NDK** — install exactly `27.1.12297006` from the SDK
Manager; a different NDK version will not do.
