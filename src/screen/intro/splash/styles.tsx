import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import { fontSizes, windowHeight, windowWidth } from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  /*
    Was the full screen width and height. The splash art is a near-square logo,
    and `contain` fits a square into a portrait box by its width — so the logo
    rendered as wide as the display. A square box sizes it as a logo instead,
    and `contain` still letterboxes safely if a wider image is ever configured.
  */
  img: {
    width: windowWidth(48),
    height: windowWidth(48),
    resizeMode: 'contain',
  },
  taglineWrap: {
    alignItems: 'center',
    paddingBottom: windowHeight(7),
  },
  // Brand orange dropped to a low alpha so it reads as a watermark rather than
  // a second headline; the hash sits a little stronger than the words.
  tagline: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT4HALF,
    letterSpacing: 2.6,
    color: 'rgba(248,111,0,0.38)',
  },
  taglineHash: {
    color: 'rgba(248,111,0,0.62)',
  },
  modalContent: {
    alignItems: 'center',
    padding: windowHeight(0.5),
  },
  // Replaced the logo image in the force-update modal.
  modalBrand: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT5HALF,
    letterSpacing: 0.4,
    color: appColors.primary,
    marginBottom: windowHeight(0.5),
  },
  modalTitle: {
    fontSize: fontSizes.FONT4HALF,
    fontWeight: 'bold',
    color: appColors.primaryFont,
    marginTop: windowHeight(1),
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: fontSizes.FONT3HALF,
    color: appColors.secondaryFont,
    marginTop: windowHeight(1),
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: appColors.primary,
    height: windowHeight(5),
    width: '100%',
    borderRadius: windowHeight(0.7),
    marginTop: windowHeight(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: appColors.white,
    fontSize: fontSizes.FONT4,
    fontFamily: appFonts.medium
  },
})
export default styles
