import { StyleSheet } from 'react-native'
import appColors from '../../../../../../theme/appColors'
import appFonts from '../../../../../../theme/appFonts'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../../../theme/appConstant'

/*
  Three cards per row, sized as a percentage of the parent rather than from a
  measured width. Measuring meant the first paint had no width at all (cards
  collapsed to a tiny content-sized box) and, worse, if an ancestor was a row
  container the measurement locked in at that collapsed width and never
  recovered. `space-between` supplies the gutter, so nothing has to be measured.
*/
export const COLUMNS = 3

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: windowHeight(1.5),
  },
  card: {
    width: '31.5%',
    borderRadius: windowWidth(3),
    borderWidth: 1.5,
    paddingTop: windowHeight(1.2),
    paddingBottom: windowHeight(1),
    paddingHorizontal: windowWidth(1.5),
    alignItems: 'center',
    overflow: 'hidden',
  },
  /*
    Keeps a short last row packed left. `space-between` would otherwise spread
    two leftover cards to the outer edges with a hole in the middle.
  */
  spacer: {
    width: '31.5%',
  },
  artWrap: {
    width: '100%',
    aspectRatio: 1.35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: windowHeight(0.6),
  },
  art: {
    width: '82%',
    height: '82%',
  },
  // Shown when a vehicle type has no artwork configured in admin.
  artFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT3,
    textAlign: 'center',
  },
  seats: {
    marginTop: windowHeight(0.2),
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT2HALF,
    textAlign: 'center',
  },
  // Sits over the top-right corner of a selected card.
  tick: {
    position: 'absolute',
    top: windowHeight(0.6),
    right: windowWidth(1.5),
    width: windowWidth(4.2),
    height: windowWidth(4.2),
    borderRadius: windowWidth(2.1),
    backgroundColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickMark: {
    color: appColors.white,
    fontSize: fontSizes.FONT2HALF,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    lineHeight: fontSizes.FONT3HALF,
  },
  stateWrap: {
    width: '100%',
    paddingVertical: windowHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateText: {
    marginTop: windowHeight(1),
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    textAlign: 'center',
  },
  retry: {
    marginTop: windowHeight(1.2),
    paddingVertical: windowHeight(0.8),
    paddingHorizontal: windowWidth(5),
    borderRadius: windowWidth(6),
    borderWidth: 1.5,
    borderColor: appColors.primary,
  },
  retryText: {
    color: appColors.primary,
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3,
  },
})

export default styles
