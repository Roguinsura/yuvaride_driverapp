import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import appFonts from '../../../theme/appFonts'
import { windowHeight, fontSizes, windowWidth } from '../../../theme/appConstant'
import appTypography from '../../../theme/appTypography'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapSection: {
    flex: 1,
    backgroundColor: appColors.primaryLight,
    height: '100%'
  },
  extraSection: {
    flex: 0.1,
  },
  greenSection: {
    position: 'absolute',
    width: '100%',
    height: windowHeight(100),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  additionalSection: {
    marginBottom: windowHeight(10),
    alignItems: 'center',
    height: windowHeight(29),
    marginHorizontal: windowWidth(4),
    borderRadius: 5,
    borderWidth: windowHeight(0.1),
    marginTop: windowHeight(2),
  },
  date: {
    height: windowHeight(3.8),
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: windowWidth(3),
    marginBottom: windowHeight(1),
  },
  address: {
    height: windowHeight(3.8),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWidth(3),
    marginTop: windowHeight(1),
  },
  // Pickup address line.
  timing: {
    ...appTypography.locationPrimary,
    textAlign: 'left'
  },
  otpInput: {
    height: windowHeight(6.5),
    width: '100%',
    borderWidth: windowHeight(0.1),
    borderRadius: 8,
    paddingHorizontal: windowWidth(3),
  },
  modelbackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.modelBg,
  },
  model: {
    borderRadius: windowHeight(0.9),
    height: windowHeight(28),
    width: windowWidth(98),
  },
  space: {
    paddingHorizontal: windowWidth(5),
  },
  closeIcon: {
    height: windowHeight(3.2),
    width: windowWidth(6.4),
    position: 'absolute',
    right: windowHeight(0),
    marginVertical: windowHeight(1.5),
    marginHorizontal: windowWidth(3),
  },
  // Screen title: 20/700, per the spec's rule that page titles are not 24-28.
  title: {
    ...appTypography.screenTitle,
    textAlign: 'center',
    justifyContent: 'center',
    marginVertical: windowHeight(1.5),
    bottom: windowHeight(3)
  },
  backButton: {
    position: 'absolute',
    marginHorizontal: windowWidth(3),
    top: windowHeight(0.5),
  },
  image: {
    height: '100%',
    width: '100%',
    bottom: windowHeight(5)
  },
  otpContainer: {
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight(0.5),
  },
  /*
    OTP digits: 26/700 per the spec's "important numbers" rule.

    fontSize and fontWeight are set explicitly rather than spreading the otp
    token, because that token carries a lineHeight and letterSpacing. Inside a
    fixed-size TextInput box, a lineHeight taller than the box clips the glyph
    vertically on Android, and tracking pushes a centred digit off-centre — the
    spacing between digits comes from the boxes themselves here, not the text.
  */
  otpInputs: {
    width: windowHeight(7),
    height: windowHeight(7),
    borderWidth: windowHeight(0.2),
    borderRadius: windowHeight(1.3),
    marginTop: windowHeight(2),
    fontFamily: appTypography.otp.fontFamily,
    fontSize: appTypography.otp.fontSize,
    fontWeight: appTypography.otp.fontWeight,
    borderBottomWidth: windowHeight(0.2)
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    height: windowHeight(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    position: 'absolute',
    bottom: 2,
    width: '100%'
  },
  img: {
    width: 100,
    height: 100
  },
  vehicleMapImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
})

export default styles

