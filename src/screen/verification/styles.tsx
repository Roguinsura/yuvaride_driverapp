import { StyleSheet } from 'react-native'
import { windowHeight, fontSizes, windowWidth } from '../../theme/appConstant'
import appFonts from '../../theme/appFonts'
import brandColors from '../../theme/brandColors'

// Theme-dependent colours are applied inline in index.tsx; layout and the fixed
// brand tints live here.
const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },

  // --- header ---
  // Was a 10% tall block with the title absolutely nudged down by top: 3.8.
  // Percentage heights against the window meant the title sat differently on
  // every device; this is a normal padded row instead.
  header: {
    paddingTop: windowHeight(2),
    paddingBottom: windowHeight(2),
    paddingHorizontal: windowWidth(5),
    borderBottomWidth: 1,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: fontSizes.FONT4HALF,
    fontFamily: appFonts.medium,
  },

  // Brand mark sits under the header bar, not inside it — the title is the
  // screen's header and stays at the very top.
  logoWrap: {
    alignItems: 'center',
    marginTop: windowHeight(2),
  },
  // Same size as the OTP screen's mark, so the brand stays a fixed anchor
  // across the auth flow. Source art is 246x246 and already upscaled at 3x.
  logo: {
    width: windowWidth(28),
    height: windowWidth(28),
    borderRadius: windowWidth(14),
  },

  // --- status animation ---
  animationWrap: {
    alignItems: 'center',
    marginTop: windowHeight(1),
  },
  // The old width was windowWidth(150) — 150% of the screen. The Lottie is
  // centred so it read as roughly correct, but it overflowed on both sides.
  // review.json is authored on a 400x400 canvas, so the box is square — a
  // mismatched box just letterboxes the art and wastes vertical space, which
  // matters here with the header and logo already above it.
  animation: {
    height: windowWidth(55),
    width: windowWidth(55),
  },

  // --- card ---
  card: {
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(1),
    borderRadius: windowWidth(5),
    borderWidth: 1,
    paddingHorizontal: windowWidth(5),
    paddingTop: windowHeight(3),
    paddingBottom: windowHeight(3),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },

  statusPill: {
    paddingHorizontal: windowWidth(3.5),
    paddingVertical: windowHeight(0.7),
    borderRadius: windowHeight(2),
  },
  statusText: {
    fontSize: fontSizes.FONT3,
    fontFamily: appFonts.medium,
    letterSpacing: 0.3,
  },

  title: {
    marginTop: windowHeight(1.8),
    textAlign: 'center',
    fontSize: fontSizes.FONT5,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  text: {
    marginTop: windowHeight(1),
    textAlign: 'center',
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.regular,
    lineHeight: windowHeight(2.5),
  },

  // --- actions ---
  cta: {
    alignSelf: 'stretch',
    marginTop: windowHeight(3),
    height: windowHeight(6.4),
    borderRadius: windowWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.primary,
    shadowColor: brandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaText: {
    fontSize: fontSizes.FONT4,
    fontFamily: appFonts.medium,
    color: brandColors.onPrimary,
  },
  // Outline variant so the two actions do not compete — updating documents is
  // the recovery path, chatting with staff is the default.
  ctaSecondary: {
    alignSelf: 'stretch',
    marginTop: windowHeight(1.5),
    height: windowHeight(6.4),
    borderRadius: windowWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: brandColors.primary,
    backgroundColor: brandColors.primarySoft,
  },
  ctaSecondaryText: {
    fontSize: fontSizes.FONT4,
    fontFamily: appFonts.medium,
    color: brandColors.primary,
  },

  // Tertiary action: a real bordered control rather than an underlined string,
  // but neutral so it does not compete with the orange CTAs inside the card.
  // Auto-width and centred, so it reads as secondary to the full-width buttons.
  backToLogin: {
    marginTop: 'auto',
    marginBottom: windowHeight(3),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight(5.6),
    paddingHorizontal: windowWidth(6),
    borderRadius: windowHeight(2.8),
    borderWidth: 1.5,
    gap: windowWidth(2),
  },
  backToLoginText: {
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.medium,
  },

  // --- exit bottom sheet ---
  sheetContent: {
    paddingHorizontal: windowWidth(5),
    paddingTop: windowHeight(1),
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT4,
    width: '85%',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: windowHeight(2.5),
  },
  button: {
    width: windowWidth(42),
    height: windowHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth(3),
  },
  buttonPrimary: {
    backgroundColor: brandColors.primary,
  },
  buttonText: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
  },
  buttonPrimaryText: {
    color: brandColors.onPrimary,
  },
})

export default styles
