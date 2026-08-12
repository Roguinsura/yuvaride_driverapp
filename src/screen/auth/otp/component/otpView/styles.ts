import { Dimensions, StyleSheet } from 'react-native'
import brandColors from '../../../../../theme/brandColors'
import { fontSizes, windowHeight, windowWidth } from '../../../../../theme/appConstant'
import appFonts from '../../../../../theme/appFonts'

const SCREEN_W = Dimensions.get('window').width

const styles = StyleSheet.create({
  // No flex: 1 — inside the shell's flexGrow: 1 scroll container that would
  // claim the whole viewport and strand the card below the fold.
  main: {},

  // Brand mark sits above the illustration so the screen still reads as ours —
  // the Taxido header that used to carry branding here is gone.
  logoWrap: {
    alignItems: 'center',
    marginTop: windowHeight(2),
  },
  // Smaller than the login screen's windowWidth(36); here it is a marker, not
  // the focal point. Source art is 246x246, so it is already upscaled at 3x —
  // pushing much past this will start to look soft.
  logo: {
    width: windowWidth(28),
    height: windowWidth(28),
    borderRadius: windowWidth(14),
  },

  artWrap: {
    alignItems: 'center',
    marginTop: windowHeight(1),
    marginBottom: windowHeight(1),
  },
  // Source art is a 1316x1316 square with a baked white background, so it is
  // sized off screen width rather than given a percentage — a vertical
  // ScrollView's content container has an indefinite width and percentages
  // silently fall back to the intrinsic dp size.
  art: {
    width: SCREEN_W * 0.62,
    height: SCREEN_W * 0.62,
  },

  card: {
    marginHorizontal: windowWidth(5),
    borderRadius: windowWidth(5),
    borderWidth: 1,
    paddingHorizontal: windowWidth(5),
    paddingTop: windowHeight(3),
    paddingBottom: windowHeight(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
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

  // Deliberately NOT flexDirection: 'row'. The card is a column, so this box
  // stretches to the full card width and the OTP row inside it gets real free
  // space to distribute. As a row, its child sized to content instead and
  // space-between had nothing to spread, so the boxes sat flush against each
  // other. RTL is handled on the OTP container itself.
  inputContainer: {
    marginTop: windowHeight(3),
  },
  otpContainer: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  // The library styles its boxes as underlines by default, so borderWidth and
  // borderBottomWidth both have to be set here to get an even rounded box.
  //
  // `margin: 0` is load-bearing: the library's default textInput style sets
  // `margin: 5`, which adds 10dp per box. Six boxes at this width plus that
  // margin came to ~342dp inside a ~314dp card, pushing the last box off the
  // edge. Spacing is left entirely to the container's space-between.
  otpInput: {
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 0,
    borderWidth: 1.5,
    borderBottomWidth: 1.5,
    borderRadius: windowWidth(2.8),
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: windowWidth(11.5),
    height: windowHeight(6.2),
    fontSize: fontSizes.FONT5,
    fontFamily: appFonts.medium,
  },

  warningText: {
    color: brandColors.danger,
    fontSize: fontSizes.FONT3,
    fontFamily: appFonts.regular,
    marginTop: windowHeight(1),
  },

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

  retry: {
    marginTop: windowHeight(2.5),
    alignSelf: 'center',
    alignItems: 'center',
    gap: windowWidth(1.5),
  },
  notReceive: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
  },
  resend: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
  },
})

export default styles
