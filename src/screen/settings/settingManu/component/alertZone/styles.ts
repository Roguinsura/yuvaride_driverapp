import { StyleSheet } from 'react-native'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../../../theme/appConstant'
import appColors from '../../../../../theme/appColors'
import appFonts from '../../../../../theme/appFonts'
import brandColors from '../../../../../theme/brandColors'

const styles = StyleSheet.create({
  main: {
    width: '100%',
    borderRadius: windowWidth(5),
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
  },
  // Matches the "General" / "Registration" headings. A big red heading shouted
  // over the whole section; the danger now reads from the row and the card's
  // tinted border instead.
  title: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4HALF,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginTop: windowHeight(2.4),
    marginBottom: windowHeight(1.2),
  },
  logoutButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight(2),
    height: windowHeight(6.2),
    borderRadius: windowWidth(3),
    borderWidth: 1.5,
    borderColor: brandColors.primary,
    backgroundColor: brandColors.primarySoft,
  },
  logoutText: {
    color: appColors.primary,
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4,
    fontWeight: '700',
  },
  loaderTitle: {
    marginVertical: windowHeight(1.5),
    height: windowHeight(2.5),
    width: windowWidth(20),
    left: windowHeight(2),
  },
  border: {
    borderBottomWidth: 1,
    marginHorizontal: windowWidth(4),
  },
  loaderStyle: {
    bottom: windowHeight(2.5),
  },
  cancelButton: {
    height: windowHeight(5.7),
    width: '47.5%',
    borderRadius: windowHeight(0.7),
  },
})
export default styles
