import { StyleSheet } from 'react-native'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../theme/appConstant'
import appColors from '../../../theme/appColors'
import appFonts from '../../../theme/appFonts'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  container: {
    paddingHorizontal: windowWidth(5),
    marginTop: windowHeight(1.3),
  },
  sectionTitle: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4HALF,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginTop: windowHeight(1.6),
    marginBottom: windowHeight(1.2),
  },
  hint: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowHeight(1.4),
    lineHeight: fontSizes.FONT3HALF * 1.5,
  },
  listContainer: {
    // Was a fixed windowHeight(25.5) sized for three rows. It holds its own
    // content now, so hiding rows cannot leave dead space behind.
    width: '100%',
    borderRadius: windowWidth(5),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
  },
  modalAlign: {
    alignItems: 'center',
    marginTop: windowHeight(1.5),
    justifyContent: 'space-between',
    paddingHorizontal: windowHeight(0),
  },
  selection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCountry: {
    height: windowHeight(5.8),
    width: windowWidth(11.6),
    resizeMode: 'contain',
  },
  name: {
    marginHorizontal: windowWidth(3),
  },
  borderBottom: {
    borderBottomWidth: windowHeight(0.1),
    marginVertical: windowHeight(1.3),
    width: '98%',
    top: windowHeight(0.8),
  },
  buttonView: {
    marginVertical: windowHeight(2),
    backgroundColor: appColors.primary,
    paddingVertical: windowHeight(2),
    paddingHorizontal: windowWidth(4),
    borderRadius: windowHeight(0.8),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: windowHeight(0.9),
  },
  buttonTitle: {
    color: appColors.white,
    fontSize: fontSizes.FONT4HALF,
    fontFamily: appFonts.medium,
  },
})
export default styles
