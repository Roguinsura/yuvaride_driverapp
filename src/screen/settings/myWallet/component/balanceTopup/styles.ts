import { StyleSheet } from 'react-native'
import appColors from '../../../../../theme/appColors'
import appFonts from '../../../../../theme/appFonts'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../../theme/appConstant'

// The card is measured rather than percentage-sized: the SVG background needs
// concrete numbers to place its gradient and decorative circles.
export const CARD_WIDTH = windowWidth(90)
export const CARD_HEIGHT = windowHeight(25)

const styles = StyleSheet.create({
  mainBalance: {
    marginTop: windowHeight(2),
    marginHorizontal: windowWidth(5),
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: windowWidth(5),
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: windowWidth(4.5),
    shadowColor: appColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },

  topRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceTitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.regular,
  },
  eyeButton: {
    height: windowHeight(4),
    width: windowHeight(4),
    borderRadius: windowHeight(2),
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalBalance: {
    fontSize: fontSizes.FONT8,
    color: appColors.white,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
    marginTop: windowHeight(0.6),
  },

  actions: {
    justifyContent: 'space-between',
    gap: windowWidth(3),
  },
  actionButton: {
    flex: 1,
    height: windowHeight(5.4),
    backgroundColor: appColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth(2.8),
  },
  actionText: {
    color: appColors.primary,
    marginHorizontal: windowWidth(1.5),
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT3HALF,
  },

  footerDate: {
    color: appColors.secondaryFont,
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    textAlign: 'center',
    marginTop: windowHeight(1.4),
  },
})

export default styles
