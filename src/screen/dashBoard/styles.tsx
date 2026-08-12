import { StyleSheet } from 'react-native'
import { windowHeight, windowWidth, fontSizes } from '../../theme/appConstant'
import appColors from '../../theme/appColors'
import appFonts from '../../theme/appFonts'
import brandColors from '../../theme/brandColors'

// The donut is sized off the screen width so it keeps its proportions on
// short/tall devices — the old version used windowHeight and went oval-ish.
export const CHART_SIZE = windowWidth(46)
export const CHART_STROKE = windowWidth(4.4)

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  /* ---------- header ---------- */
  header: {
    backgroundColor: appColors.primary,
    paddingTop: windowHeight(2),
    paddingBottom: windowHeight(2),
    paddingHorizontal: windowWidth(5),
  },
  headerRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: appColors.white,
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5HALF,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowHeight(0.4),
  },
  bellButton: {
    height: windowHeight(5.2),
    width: windowHeight(5.2),
    borderRadius: windowHeight(1.4),
    borderWidth: windowHeight(0.1),
    borderColor: appColors.greenborder,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- scroll ---------- */
  scroll: {
    flex: 1,
  },
  scrollContent: {
    // Clears the floating tab bar.
    paddingBottom: windowHeight(12),
  },

  /* ---------- shared card ---------- */
  card: {
    marginHorizontal: windowWidth(5),
    borderRadius: windowWidth(5),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },

  /* ---------- earnings hero ---------- */
  earningCard: {
    marginTop: windowHeight(2.4),
    padding: windowWidth(4.5),
    alignItems: 'center',
  },
  earningIcon: {
    height: windowHeight(6.4),
    width: windowHeight(6.4),
    borderRadius: windowWidth(3.4),
    backgroundColor: brandColors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earningTextWrap: {
    flex: 1,
    marginHorizontal: windowWidth(3.5),
  },
  earningLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
  },
  earningValue: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT6,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginTop: windowHeight(0.3),
  },

  /* ---------- section heading ---------- */
  sectionTitle: {
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(3.2),
    marginBottom: windowHeight(1.6),
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4HALF,
    fontWeight: '700',
    letterSpacing: -0.2,
  },

  /* ---------- rides / donut ---------- */
  ridesCard: {
    marginTop: windowHeight(0),
    paddingVertical: windowHeight(3),
    paddingHorizontal: windowWidth(4.5),
    alignItems: 'center',
  },
  chartWrap: {
    height: CHART_SIZE,
    width: CHART_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartCount: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT7,
    fontWeight: '700',
    letterSpacing: -1,
  },
  chartCaption: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3,
    marginTop: windowHeight(0.2),
    textAlign: 'center',
  },

  legend: {
    alignSelf: 'stretch',
    marginTop: windowHeight(2.6),
  },
  legendRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: windowHeight(1.1),
  },
  legendLeft: {
    alignItems: 'center',
    flex: 1,
  },
  legendDot: {
    height: windowWidth(2.6),
    width: windowWidth(2.6),
    borderRadius: windowWidth(1.3),
    marginHorizontal: windowWidth(2.4),
  },
  legendLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
  },
  legendValue: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4,
    fontWeight: '700',
    marginHorizontal: windowWidth(2.4),
  },
  legendDivider: {
    height: 1,
    alignSelf: 'stretch',
  },

  /* ---------- performance tiles ---------- */
  tileGrid: {
    marginHorizontal: windowWidth(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    // Two per row with a gap between them.
    width: '48.5%',
    borderRadius: windowWidth(5),
    borderWidth: 1,
    padding: windowWidth(4),
    marginBottom: windowWidth(3),
  },
  tileIcon: {
    height: windowHeight(5.4),
    width: windowHeight(5.4),
    borderRadius: windowWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileValue: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5HALF,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginTop: windowHeight(1.6),
  },
  tileUnit: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
  },
  tileLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowHeight(0.4),
  },
})

export default styles
