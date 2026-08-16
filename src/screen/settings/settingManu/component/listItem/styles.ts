import { StyleSheet } from 'react-native'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../../../theme/appConstant'
import appFonts from '../../../../../theme/appFonts'

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWidth(4),
    paddingVertical: windowHeight(1.6),
  },
  alignment: {
    alignItems: 'center',
    flex: 1,
  },
  iconContain: {
    height: windowHeight(5.2),
    width: windowHeight(5.2),
    // A rounded square rather than a circle, matching the icon chips on the
    // dashboard and earnings screens.
    borderRadius: windowWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#E5484D',
    zIndex: 3,
  },
  title: {
    flex: 1,
    marginHorizontal: windowWidth(3.5),
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
  },
})
export default styles
