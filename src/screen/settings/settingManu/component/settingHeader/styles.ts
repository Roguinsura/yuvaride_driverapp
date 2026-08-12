import { StyleSheet } from 'react-native'
import appFonts from '../../../../../theme/appFonts'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../../../theme/appConstant'

const styles = StyleSheet.create({
  main: {
    width: '100%',
    paddingTop: windowHeight(2),
    paddingBottom: windowHeight(2),
    paddingHorizontal: windowWidth(5),
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5HALF,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowHeight(0.4),
  },
  actions: {
    alignItems: 'center',
    gap: windowWidth(2.5),
  },
  iconView: {
    height: windowHeight(5.2),
    width: windowHeight(5.2),
    borderWidth: windowHeight(0.1),
    borderRadius: windowHeight(1.4),
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default styles
