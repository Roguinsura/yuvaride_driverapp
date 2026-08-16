import { Platform, TextStyle } from 'react-native'

/**
 * Centralised typography tokens.
 *
 * One place defines every text style in the app. Screens should reference a
 * token (`appTypography.title`) rather than spelling out fontSize/fontWeight,
 * so the scale can be tuned once instead of hunted through 100+ files.
 *
 * FONT FAMILY
 * -----------
 * Roboto, resolved from the platform rather than bundled:
 *
 *  - Android ships Roboto as its system font in every weight, so
 *    `fontFamily: 'Roboto'` + a numeric `fontWeight` resolves natively. This
 *    also means no font files to license, ship, or keep in sync.
 *  - iOS has no Roboto. It falls back to the system face (San Francisco) until
 *    the four TTFs are bundled — see BUNDLING below.
 *
 * Numeric weights are honoured by `Typeface.create(family, weight, italic)`,
 * which is API 28+. This project's minSdk is 24, so on API 24-27 weights
 * collapse to regular/bold. That affects 500 and 600, which degrade to regular.
 *
 * BUNDLING (for iOS parity, or exact weights on old Android)
 * ---------------------------------------------------------
 * Drop Roboto-Regular/Medium/SemiBold/Bold .ttf into src/assets/fonts, add that
 * directory to react-native.config.js assets, run `npx react-native-asset`, then
 * swap FONT_FAMILY below for the per-weight family names. Nothing else changes:
 * every screen reads these tokens, not the family name.
 *
 * SIZES
 * -----
 * Fixed pixel sizes, per the design spec. Note this differs from the older
 * `fontSizes` scale in appConstant, which is a fraction of screen WIDTH and so
 * changes size per device. The two are intentionally separate: migrating a
 * screen means moving it onto these tokens wholesale, not mixing the models.
 */

const FONT_FAMILY = Platform.select({
  android: 'Roboto',
  // Leave undefined on iOS so it uses the system face rather than silently
  // falling back to a font that is not installed.
  default: undefined,
})

const base = (
  fontSize: number,
  fontWeight: TextStyle['fontWeight'],
  lineHeight: number,
  letterSpacing = 0,
): TextStyle => ({
  fontFamily: FONT_FAMILY,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
})

/**
 * Letter spacing is tied to size, not to each style, so a 20px heading and a
 * 20px price track identically. Conservative by design — the spec explicitly
 * rules out exaggerated tracking.
 */
export const letterSpacingFor = (fontSize: number): number => {
  if (fontSize >= 28) return -0.3
  if (fontSize >= 24) return -0.3
  if (fontSize >= 20) return -0.2
  if (fontSize >= 18) return -0.1
  return 0
}

const appTypography = {
  // Display and headings
  display: base(28, '700', 34, -0.3),
  h1: base(24, '700', 32, -0.3),
  h2: base(20, '700', 28, -0.2),
  h3: base(18, '600', 24, -0.1),

  /** Screen titles. 20/700 — not 24-28, which is reserved for display copy. */
  screenTitle: base(20, '700', 28, -0.2),

  // Titles and body
  title: base(16, '600', 22),
  bodyLarge: base(16, '400', 24),
  /** 16px emphasised body. */
  bodyLargeMedium: base(16, '500', 22),
  body: base(14, '400', 20),
  /** 14px emphasised body. */
  bodyMedium: base(14, '500', 20),
  caption: base(12, '400', 16),
  captionMedium: base(12, '500', 16),

  // Controls
  button: base(16, '600', 20),
  buttonSecondary: base(14, '600', 20),
  buttonSmall: base(13, '600', 18),
  /** Bottom navigation labels — compact by design. */
  navigation: base(12, '500', 16),

  // Money
  price: base(20, '700', 24, -0.2),
  priceLarge: base(24, '700', 32, -0.3),

  // Inputs
  inputText: base(16, '400', 22),
  inputPlaceholder: base(16, '400', 22),
  inputLabel: base(13, '500', 18),
  inputError: base(13, '500', 18),

  // Domain-specific
  /** OTP / important numerics. Tracking is applied where digits are separated. */
  otp: base(26, '700', 32, 2),
  /** Pickup / destination primary line. */
  locationPrimary: base(16, '500', 22),
  /** Address detail under a location. */
  locationSecondary: base(13, '400', 18),
  driverName: base(16, '600', 22),
  vehicleModel: base(14, '400', 20),
  /** Plate numbers read as data, so they carry more weight than the model. */
  vehicleRegistration: base(14, '600', 20),
  rating: base(14, '500', 20),
  /** SOS must dominate its screen; supporting copy stays regular. */
  sos: base(26, '700', 32, -0.3),
  emergencyAction: base(14, '600', 20),

  // Cards
  cardTitle: base(16, '600', 22),
  cardDescription: base(14, '400', 20),
  cardPrice: base(20, '700', 24, -0.2),
  cardMeta: base(13, '400', 18),
} as const

export type AppTypographyToken = keyof typeof appTypography

export default appTypography
