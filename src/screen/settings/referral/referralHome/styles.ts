import appColors from '../../../../theme/appColors'
import appFonts from '../../../../theme/appFonts'
import brandColors from '../../../../theme/brandColors'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../theme/appConstant'

import { StyleSheet } from 'react-native'

export const HERO_WIDTH = windowWidth(90)
export const HERO_HEIGHT = windowHeight(26)

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: windowHeight(2),
    paddingBottom: windowHeight(3),
  },

  /* ---------- hero ---------- */
  hero: {
    width: HERO_WIDTH,
    height: HERO_HEIGHT,
    alignSelf: 'center',
    borderRadius: windowWidth(5),
    overflow: 'hidden',
    padding: windowWidth(5),
    justifyContent: 'space-between',
    shadowColor: brandColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },
  heroKicker: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
    color: 'rgba(255,255,255,0.85)',
  },
  heroAmount: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT8,
    color: appColors.white,
    letterSpacing: -1,
    marginTop: windowHeight(0.4),
  },
  heroSub: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    color: 'rgba(255,255,255,0.9)',
    marginTop: windowHeight(0.4),
    lineHeight: fontSizes.FONT3HALF * 1.45,
  },

  codeLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: windowHeight(0.8),
  },
  codePill: {
    height: windowHeight(6),
    backgroundColor: appColors.white,
    borderRadius: windowWidth(3),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: windowWidth(4),
  },
  codeText: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT5,
    color: appColors.primary,
    letterSpacing: 2,
    flex: 1,
  },

  /* ---------- shared card ---------- */
  card: {
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(2.4),
    borderRadius: windowWidth(5),
    borderWidth: 1,
    padding: windowWidth(4.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
  },
  cardHead: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: windowHeight(1.6),
  },
  que: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT4HALF,
    letterSpacing: -0.2,
    flexShrink: 1,
  },
  trems: {
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.medium,
    textDecorationLine: 'underline',
    color: appColors.primary,
  },

  /* ---------- steps ---------- */
  stepRow: {
    alignItems: 'flex-start',
    marginTop: windowHeight(1.6),
  },
  stepBadge: {
    height: windowWidth(6.6),
    width: windowWidth(6.6),
    borderRadius: windowWidth(3.3),
    backgroundColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT3,
    color: appColors.white,
  },
  stepText: {
    flex: 1,
    marginHorizontal: windowWidth(3),
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    lineHeight: fontSizes.FONT3HALF * 1.45,
  },

  /* ---------- note ---------- */
  noteBox: {
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(2),
    padding: windowWidth(4),
    borderRadius: windowWidth(4),
    borderWidth: 1,
    borderColor: brandColors.primaryBorder,
    backgroundColor: brandColors.primarySoft,
  },
  note: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    lineHeight: fontSizes.FONT3HALF * 1.5,
  },

  /* ---------- referrals card ---------- */
  listRow: {
    alignItems: 'center',
  },
  listIcon: {
    height: windowHeight(6),
    width: windowHeight(6),
    borderRadius: windowWidth(3.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTextWrap: {
    flex: 1,
    marginHorizontal: windowWidth(3.5),
  },
  des1: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3,
    marginTop: windowHeight(0.3),
    lineHeight: fontSizes.FONT3 * 1.5,
  },
  viewButton: {
    height: windowHeight(5.6),
    marginTop: windowHeight(2),
    borderRadius: windowWidth(3),
    borderWidth: 1.5,
    borderColor: appColors.primary,
    backgroundColor: brandColors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: appColors.primary,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT3HALF,
  },

  /* ---------- share cta ---------- */
  shareButton: {
    backgroundColor: appColors.primary,
    height: windowHeight(6.4),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth(3),
    marginHorizontal: windowWidth(5),
    marginBottom: windowHeight(2),
    marginTop: windowHeight(1),
    shadowColor: brandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },
  shareText: {
    color: appColors.white,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT4,
  },
})

export default styles
