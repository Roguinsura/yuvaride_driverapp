import { StyleSheet } from 'react-native'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'
import appColors from '../../../theme/appColors'

/*
  The old stylesheet was a stack of negative `bottom` offsets used to drag a
  borrowed signup-form layout into place, and the screen also pulled
  `windowHeight` from settings/chat/context (a /667 scale, ~6x the app-wide
  /100 one). Both are gone: this is a plain details layout on the standard
  theme/appConstant scale.
*/
const vehicleStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: windowWidth(5),
    paddingTop: windowHeight(2),
    paddingBottom: windowHeight(4),
  },

  /* ---------- hero ---------- */
  hero: {
    borderRadius: windowWidth(4),
    borderWidth: 1,
    padding: windowWidth(4.5),
    shadowColor: appColors.black,
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  heroTop: {
    alignItems: 'center',
  },
  heroIcon: {
    height: windowHeight(7),
    width: windowHeight(7),
    borderRadius: windowWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // The admin-uploaded artwork is square-ish, so the tile stays square — a
  // wider one just padded the image with orange. `contain` still letterboxes
  // safely if a wide image ever comes through.
  heroImage: {
    height: '82%',
    width: '82%',
  },
  heroText: {
    flex: 1,
    marginHorizontal: windowWidth(3.5),
  },
  heroName: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT5,
    letterSpacing: -0.3,
  },
  heroMeta: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowHeight(0.4),
  },
  // Plate reads as a plate: boxed, spaced, uppercase, tabular figures.
  plate: {
    alignSelf: 'flex-start',
    marginTop: windowHeight(1.8),
    paddingHorizontal: windowWidth(3.5),
    paddingVertical: windowHeight(0.9),
    borderRadius: windowWidth(2),
    borderWidth: 1.4,
    borderStyle: 'dashed',
  },
  plateText: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT4HALF,
    letterSpacing: 2,
    fontVariant: ['tabular-nums'],
  },

  /* ---------- sections ---------- */
  sectionTitle: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT3HALF,
    letterSpacing: 0.9,
    marginTop: windowHeight(3),
    marginBottom: windowHeight(1.2),
    marginHorizontal: windowWidth(1),
  },
  card: {
    borderRadius: windowWidth(4),
    borderWidth: 1,
    paddingHorizontal: windowWidth(4.5),
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: windowHeight(1.9),
  },
  rowLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    flexShrink: 1,
  },
  rowValueWrap: {
    alignItems: 'center',
    marginHorizontal: windowWidth(3),
    flexShrink: 1,
  },
  rowValue: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
    textAlign: 'right',
  },
  divider: {
    height: 1,
  },
  swatch: {
    height: windowWidth(3.4),
    width: windowWidth(3.4),
    borderRadius: windowWidth(1.7),
    borderWidth: 1,
    marginHorizontal: windowWidth(2),
  },

  /* ---------- price chips ---------- */
  priceRow: {
    flexWrap: 'wrap',
    gap: windowWidth(2.5),
    paddingVertical: windowHeight(2),
  },
  priceChip: {
    flexGrow: 1,
    minWidth: windowWidth(26),
    borderRadius: windowWidth(3),
    borderWidth: 1,
    paddingVertical: windowHeight(1.4),
    paddingHorizontal: windowWidth(3),
  },
  priceChipLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3,
  },
  priceChipValue: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT4HALF,
    marginTop: windowHeight(0.4),
    fontVariant: ['tabular-nums'],
  },

  /* ---------- description block ---------- */
  descBlock: {
    paddingVertical: windowHeight(2),
  },
  descLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
  },
  descValue: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowHeight(0.8),
    lineHeight: fontSizes.FONT3HALF * 1.5,
  },

  /* ---------- notice / empty ---------- */
  notice: {
    marginTop: windowHeight(2.5),
    borderRadius: windowWidth(3.5),
    borderWidth: 1,
    padding: windowWidth(4),
    alignItems: 'flex-start',
  },
  noticeText: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    lineHeight: fontSizes.FONT3HALF * 1.5,
    flex: 1,
    marginHorizontal: windowWidth(3),
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: windowHeight(14),
    paddingHorizontal: windowWidth(8),
  },
  emptyTitle: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT4HALF,
    marginTop: windowHeight(2),
  },
  emptyBody: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    textAlign: 'center',
    marginTop: windowHeight(1),
    lineHeight: fontSizes.FONT3HALF * 1.5,
  },
})

export default vehicleStyles
