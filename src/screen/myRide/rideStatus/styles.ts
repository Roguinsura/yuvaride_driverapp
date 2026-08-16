import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import { windowHeight, fontSizes, windowWidth } from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'
import brandColors from '../../../theme/brandColors'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  segment: {
    flexDirection: 'row',
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(2),
    marginBottom: windowHeight(0.5),
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
})
export { styles }
