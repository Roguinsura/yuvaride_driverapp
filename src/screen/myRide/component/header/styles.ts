import { StyleSheet } from 'react-native'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../theme/appConstant'
import appFonts from '../../../../theme/appFonts'

const styles = StyleSheet.create({
  main: {
    paddingTop: windowHeight(2),
    paddingBottom: windowHeight(2),
    paddingHorizontal: windowWidth(5),
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontSizes.FONT5HALF,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.regular,
    marginTop: windowHeight(0.4),
  },
  bellButton: {
    height: windowHeight(5.2),
    width: windowHeight(5.2),
    borderRadius: windowHeight(1.4),
    borderWidth: windowHeight(0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default styles
