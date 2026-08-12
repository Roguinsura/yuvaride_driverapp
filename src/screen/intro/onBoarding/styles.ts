import { StyleSheet, DimensionValue, Dimensions, PixelRatio, Platform } from 'react-native'
import appColors from '../../../theme/appColors'
import appFonts from '../../../theme/appFonts'

export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_WIDTH = Dimensions.get('window').width

export const IsIOS = Platform.OS === 'ios'
export const IsIPAD = IsIOS && SCREEN_HEIGHT / SCREEN_WIDTH < 1.6

export const IsHaveNotch = SCREEN_HEIGHT > 750

export const Isiphone12promax = IsIOS && SCREEN_HEIGHT > 2778

export const windowHeight = (height: DimensionValue): number => {
  if (!height) {
    return 0
  }
  let tempHeight = SCREEN_HEIGHT * (parseFloat(height.toString()) / 667)
  return PixelRatio.roundToNearestPixel(tempHeight)
}

export const windowWidth = (width: DimensionValue): number => {
  if (!width) {
    return 0
  }
  let tempWidth = SCREEN_WIDTH * (parseFloat(width.toString()) / 480)
  return PixelRatio.roundToNearestPixel(tempWidth)
}

export const fontSizes = {
  FONT6: windowWidth(6),
  FONT7: windowWidth(7),
  FONT8: windowWidth(8),
  FONT9: windowWidth(9),
  FONT10: windowWidth(10),
  FONT11: windowWidth(11),
  FONT12: windowWidth(12),
  FONT13: windowWidth(13),
  FONT14: windowWidth(14),
  FONT15: windowWidth(15),
  FONT16: windowWidth(16),
  FONT17: windowWidth(17),
  FONT18: windowWidth(18),
  FONT19: windowWidth(19),
  FONT20: windowWidth(20),
  FONT21: windowWidth(21),
  FONT22: windowWidth(22),
  FONT23: windowWidth(23),
  FONT24: windowWidth(24),
  FONT25: windowWidth(25),
  FONT26: windowWidth(26),
  FONT27: windowWidth(27),
  FONT28: windowWidth(28),
  FONT30: windowWidth(30),
}

// Brand palette, scoped to onboarding only.
//
// Deliberately NOT in theme/appColors — that file is still the green Taxido
// palette used by the other 295 files, and mixing the two there would recolour
// the whole app. When the global rebrand happens these move into appColors and
// this block goes away.
export const BRAND = {
  primary: '#f86f00',
  primaryPressed: '#d75f00',
  onPrimary: '#FFFFFF',
  dotInactive: '#F6DCC4',
  cardDark: '#1C1C1E',
  heroBgLight: '#FFFFFF',
  heroBgDark: '#241A12',
  // Card is orange now, so its contents invert: white text, white CTA with
  // orange label. Without this the CTA and the active dot are orange-on-orange.
  onCardMuted: 'rgba(255,255,255,0.85)',
  dotIdleOnCard: 'rgba(255,255,255,0.45)',
}

// Card overlaps the hero image by this much, so the art bleeds behind it.
const CARD_OVERLAP = windowHeight(28)

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  // --- hero (top) ---
  heroArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: windowHeight(52),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  skipWrap: {
    position: 'absolute',
    top: windowHeight(14),
    right: windowWidth(18),
    zIndex: 10,
  },
  skipText: {
    color: appColors.secondaryFont,
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT17,
    paddingVertical: windowHeight(6),
    paddingHorizontal: windowWidth(16),
    borderRadius: windowHeight(20),
    overflow: 'hidden',
    textAlign: 'center',
  },
  // --- bottom sheet card ---
  card: {
    marginTop: -CARD_OVERLAP,
    borderTopLeftRadius: windowHeight(28),
    borderTopRightRadius: windowHeight(28),
    paddingHorizontal: windowWidth(28),
    paddingTop: windowHeight(22),
    paddingBottom: windowHeight(26),
    // lift the card off the art
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight(18),
  },
  dot: {
    height: windowHeight(5),
    borderRadius: windowHeight(3),
    marginRight: windowWidth(6),
  },
  dotActive: {
    width: windowWidth(28),
    backgroundColor: BRAND.onPrimary,
  },
  dotIdle: {
    width: windowWidth(10),
    backgroundColor: BRAND.dotIdleOnCard,
  },
  title: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT26,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: windowHeight(8),
  },
  description: {
    fontFamily: appFonts.regular,
    color: BRAND.onCardMuted,
    fontWeight: '400',
    fontSize: fontSizes.FONT17,
    lineHeight: windowHeight(19),
    textAlign: 'left',
    marginBottom: windowHeight(22),
  },
  cta: {
    flexDirection: 'row',
    height: windowHeight(46),
    borderRadius: windowHeight(23),
    backgroundColor: BRAND.onPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: BRAND.primary,
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT19,
    marginRight: windowWidth(8),
  },
  ctaArrow: {
    transform: [{ scaleX: -1 }],
  },
})

export { styles }
