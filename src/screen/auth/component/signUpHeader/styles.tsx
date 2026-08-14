import { StyleSheet } from 'react-native'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../theme/appConstant'
import appColors from '../../../../theme/appColors'
import appFonts from '../../../../theme/appFonts'

const styles = StyleSheet.create({
  main: {
    height: windowHeight(7),
    alignItems: 'center',
  },
  iconView: {
    borderWidth: windowHeight(0.1),
    width: windowHeight(5.5),
    height: windowWidth(11),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowHeight(0.7),
    position: 'absolute',
    marginHorizontal: windowWidth(4.5),
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Matches the old logo's height so the header bar does not change size.
  brandPill: {
    height: windowHeight(4),
    paddingHorizontal: windowWidth(4.5),
    borderRadius: windowHeight(2),
    backgroundColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandPillText: {
    color: appColors.white,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT4,
    letterSpacing: 0.4,
  },
})

export default styles
