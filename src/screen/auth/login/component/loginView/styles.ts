import { StyleSheet } from 'react-native'
import appColors from '../../../../../theme/appColors'
import appFonts from '../../../../../theme/appFonts'
import brandColors from '../../../../../theme/brandColors'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../../../theme/appConstant'

const styles = StyleSheet.create({
  // --- shared with AuthTitle, which loginMail + otpverify still render ---
  // Left on the original Taxido values on purpose. The Login screen has its own
  // title styles below; changing these would restyle those other screens too.
  container: {
    marginVertical: windowHeight(2),
  },
  mainTitle: {
    fontSize: fontSizes.FONT6,
    fontFamily: appFonts.medium,
  },
  subTitle: {
    color: appColors.secondaryFont,
    marginTop: windowHeight(0.5),
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.regular,
  },

  // --- Login screen ---
  // No flex: 1 here. Inside the ScrollView's flexGrow: 1 content container it
  // would claim the whole viewport, leaving the skyline stranded below the fold.
  main: {},

  logoWrap: {
    alignItems: 'center',
    marginTop: windowHeight(3),
    marginBottom: windowHeight(3),
  },
  // Source art is only 246x246. At this size it is already being upscaled on
  // 3x screens — going much bigger will visibly soften it.
  logo: {
    width: windowWidth(36),
    height: windowWidth(36),
    borderRadius: windowWidth(18),
  },

  // --- card wrapping the whole form ---
  card: {
    marginHorizontal: windowWidth(5),
    borderRadius: windowWidth(5),
    borderWidth: 1,
    paddingHorizontal: windowWidth(5),
    paddingTop: windowHeight(2.5),
    paddingBottom: windowHeight(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },

  // --- driver / fleet segmented tabs ---
  tabsTrack: {
    borderRadius: windowWidth(2.8),
    padding: windowWidth(1),
    marginBottom: windowHeight(2.5),
  },
  tab: {
    flex: 1,
    height: windowHeight(5.2),
    borderRadius: windowWidth(2.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.medium,
  },

  screenTitle: {
    fontSize: fontSizes.FONT5HALF,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  screenSubtitle: {
    marginTop: windowHeight(0.7),
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.regular,
    lineHeight: windowHeight(2.5),
  },

  // --- phone / email field ---
  fieldLabel: {
    fontSize: fontSizes.FONT3,
    fontFamily: appFonts.medium,
    marginTop: windowHeight(2.5),
    marginBottom: windowHeight(1),
    letterSpacing: 0.2,
  },
  // Country chip and text input share one rounded shell, so they read as a
  // single control rather than two disconnected grey boxes.
  fieldShell: {
    alignItems: 'center',
    borderRadius: windowWidth(3),
    borderWidth: 1.5,
    height: windowHeight(6.6),
    overflow: 'hidden',
  },
  countryCode: {
    height: '100%',
    paddingHorizontal: windowWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.medium,
  },
  fieldDivider: {
    width: 1,
    height: '55%',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: windowWidth(3.5),
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.regular,
    // Android centres text oddly in a fixed-height input without this.
    paddingVertical: 0,
  },
  errorText: {
    color: brandColors.danger,
    fontSize: fontSizes.FONT3,
    fontFamily: appFonts.regular,
    marginTop: windowHeight(0.8),
  },

  // --- submit ---
  cta: {
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
  ctaDisabled: {
    opacity: 0.55,
  },
  ctaText: {
    fontSize: fontSizes.FONT4,
    fontFamily: appFonts.medium,
    color: brandColors.onPrimary,
  },
})

export default styles
