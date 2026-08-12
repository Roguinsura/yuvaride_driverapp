import { StyleSheet } from 'react-native'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'
import appColors from '../../../theme/appColors'
import brandColors from '../../../theme/brandColors'

export const CARD_HEIGHT = windowHeight(62)

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  /* ---------- intro ---------- */
  planTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth(6),
    paddingTop: windowHeight(1),
  },
  planTitle: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5HALF,
    fontWeight: '700',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  planHeading: {
    color: appColors.secondaryFont,
    marginTop: windowHeight(0.8),
    textAlign: 'center',
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.regular,
    lineHeight: fontSizes.FONT3HALF * 1.5,
  },

  /* ---------- carousel ---------- */
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    height: CARD_HEIGHT,
    borderRadius: windowWidth(6),
    borderWidth: 1.5,
    marginHorizontal: windowWidth(1.5),
    padding: windowWidth(5),
    shadowColor: appColors.black,
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  /* ---------- plan head ---------- */
  // A tinted band bled to the card's edges. The negative margins cancel the
  // card's own padding; the radius is the card's minus its border width so the
  // two curves sit concentric.
  planHead: {
    marginHorizontal: -windowWidth(5),
    marginTop: -windowWidth(5),
    paddingHorizontal: windowWidth(5),
    paddingTop: windowWidth(5),
    paddingBottom: windowHeight(2.2),
    borderTopLeftRadius: windowWidth(4.6),
    borderTopRightRadius: windowWidth(4.6),
    borderBottomWidth: 1,
  },
  headRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: fontSizes.FONT5,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    letterSpacing: 1.6,
    flexShrink: 1,
  },
  nameAccent: {
    height: windowHeight(0.45),
    width: windowWidth(11),
    borderRadius: windowWidth(1),
    backgroundColor: appColors.primary,
    marginTop: windowHeight(1.1),
  },
  currentPill: {
    paddingHorizontal: windowWidth(2.8),
    paddingVertical: windowHeight(0.5),
    borderRadius: windowWidth(5),
    backgroundColor: brandColors.primarySoft,
  },
  currentPillText: {
    color: appColors.primary,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT3,
  },

  priceRow: {
    alignItems: 'flex-end',
    marginTop: windowHeight(1.8),
  },
  price: {
    fontSize: fontSizes.FONT8,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    letterSpacing: -1.2,
    fontVariant: ['tabular-nums'],
  },
  type: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT4,
    color: appColors.secondaryFont,
    marginHorizontal: windowWidth(1.5),
    marginBottom: windowHeight(0.8),
  },

  divider: {
    height: 1,
    marginVertical: windowHeight(2.2),
  },

  /* ---------- features ---------- */
  featureList: {
    flex: 1,
  },
  featureRow: {
    alignItems: 'center',
    marginBottom: windowHeight(1.8),
  },
  tick: {
    height: windowWidth(6),
    width: windowWidth(6),
    borderRadius: windowWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  features: {
    flex: 1,
    marginHorizontal: windowWidth(3),
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.regular,
    lineHeight: fontSizes.FONT3HALF * 1.45,
  },
  emptyFeature: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    color: appColors.secondaryFont,
  },

  /* ---------- cta ---------- */
  selectBtn: {
    height: windowHeight(6.2),
    borderRadius: windowWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight(1.6),
  },
  bottomNote: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT4,
  },

  /* ---------- pagination ---------- */
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: windowHeight(1),
    marginBottom: windowHeight(1.4),
    gap: windowWidth(1.6),
  },
  dot: {
    height: windowWidth(2),
    borderRadius: windowWidth(1),
  },

  /* ---------- footer note ---------- */
  noteContainer: {
    paddingVertical: windowHeight(2),
    paddingHorizontal: windowWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: {
    textAlign: 'center',
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    lineHeight: fontSizes.FONT3HALF * 1.5,
  },
})

export default styles
