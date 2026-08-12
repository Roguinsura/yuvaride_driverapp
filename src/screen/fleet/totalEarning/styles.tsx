import { StyleSheet } from 'react-native'
import { windowHeight, fontSizes, windowWidth } from '../../../theme/appConstant'
import appColors from '../../../theme/appColors'
import appFonts from '../../../theme/appFonts'
import brandColors from '../../../theme/brandColors'

export const CHART_HEIGHT = windowHeight(24)
// One column per bar. The bar itself is narrower, so the leftover is the gap.
export const BAR_SLOT = windowWidth(13)
export const BAR_WIDTH = windowWidth(4.4)
// Fixed line height on the y-axis labels so they can be centred on the grid
// lines rather than merely spaced between them.
export const Y_LABEL_LINE = 14
export const GRID_ROWS = 7

const localStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: windowHeight(4),
  },

  /* ---------- segmented period control ---------- */
  segment: {
    flexDirection: 'row',
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(2),
    borderRadius: windowWidth(3.4),
    padding: windowWidth(1.1),
    borderWidth: 1,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: windowHeight(1.2),
    borderRadius: windowWidth(2.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentItemActive: {
    backgroundColor: appColors.primary,
    shadowColor: brandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  segmentText: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
  },
  segmentTextActive: {
    color: appColors.white,
    fontFamily: appFonts.bold,
    fontWeight: '700',
  },

  /* ---------- shared card ---------- */
  card: {
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(2.2),
    borderRadius: windowWidth(5),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },

  /* ---------- chart card ---------- */
  chartCard: {
    paddingTop: windowHeight(2.4),
    paddingBottom: windowHeight(2),
  },
  readout: {
    paddingHorizontal: windowWidth(4.5),
    marginBottom: windowHeight(2.4),
  },
  readoutLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
  },
  readoutValue: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT6,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginTop: windowHeight(0.4),
  },

  chartRow: {
    flexDirection: 'row',
    paddingLeft: windowWidth(3),
  },
  yAxis: {
    height: CHART_HEIGHT + Y_LABEL_LINE,
    // Pulls the label column up by half a line so each label's centre lands on
    // its grid line instead of sitting below it.
    marginTop: -Y_LABEL_LINE / 2,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: windowWidth(2),
    minWidth: windowWidth(9),
  },
  yAxisLabel: {
    fontSize: fontSizes.FONT3,
    lineHeight: Y_LABEL_LINE,
    color: appColors.iconColor,
    fontFamily: appFonts.regular,
  },
  plot: {
    flex: 1,
  },
  gridLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: CHART_HEIGHT,
    justifyContent: 'space-between',
  },
  gridLine: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  barSlot: {
    width: BAR_SLOT,
    alignItems: 'center',
  },
  barTrack: {
    height: CHART_HEIGHT,
    justifyContent: 'flex-end',
  },
  bar: {
    width: BAR_WIDTH,
    borderTopLeftRadius: BAR_WIDTH / 2,
    borderTopRightRadius: BAR_WIDTH / 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  barLabel: {
    fontSize: fontSizes.FONT3,
    color: appColors.iconColor,
    fontFamily: appFonts.regular,
    marginTop: windowHeight(1),
  },
  barLabelActive: {
    color: appColors.primary,
    fontFamily: appFonts.bold,
    fontWeight: '700',
  },

  emptyChart: {
    height: CHART_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
  },

  /* ---------- average tiles ---------- */
  avgRow: {
    flexDirection: 'row',
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(2.2),
    justifyContent: 'space-between',
  },
  avgTile: {
    width: '48.5%',
    borderRadius: windowWidth(5),
    borderWidth: 1,
    padding: windowWidth(4),
  },
  avgIcon: {
    height: windowHeight(5.4),
    width: windowHeight(5.4),
    borderRadius: windowWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avgValue: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginTop: windowHeight(1.4),
  },
  avgLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowHeight(0.4),
  },

  /* ---------- highest record ---------- */
  sectionTitle: {
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(3),
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4HALF,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  recordCard: {
    padding: windowWidth(4),
    alignItems: 'center',
  },
  recordIcon: {
    height: windowHeight(6),
    width: windowHeight(6),
    borderRadius: windowWidth(3.2),
    backgroundColor: brandColors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordTextWrap: {
    flex: 1,
    marginHorizontal: windowWidth(3.5),
  },
  recordLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
  },
  recordDate: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT4,
    marginTop: windowHeight(0.3),
  },
  recordAmount: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: appColors.primary,
  },
})

export default localStyles
