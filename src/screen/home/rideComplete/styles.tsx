import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import { fontSizes, windowHeight, windowWidth } from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'
import appTypography from '../../../theme/appTypography'

const styles = StyleSheet.create({
  mapSection: {
    flex: 0.85,
    backgroundColor: appColors.primaryLight,
  },
  extraSection: {
    flex: 0.1,
  },
  greenSection: {
    bottom: windowHeight(2),
    width: '100%',
    height: windowHeight(22),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  additionalSection: {
    marginVertical: windowHeight(2),
    alignItems: 'center',
    height: windowHeight(15.5),
    marginHorizontal: windowWidth(4),
    borderRadius: 5,
    borderWidth: windowHeight(0.1),
  },
  backButton: {
    position: 'absolute',
    marginHorizontal: windowWidth(3),
    top: windowHeight(0.5),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  hourly_package_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hourly_package_main_view: {
    width: 1,
    height: '50%',
    backgroundColor: appColors.categoryTitle,
    marginVertical: 13,
  },
  usedTextView: {
    justifyContent: 'space-evenly',
    borderRadius: 9,
    height: 50,
    width: '45%',
    marginHorizontal: 8,
  },
  totalView: {
    width: 1,
    height: '50%',
    backgroundColor: appColors.categoryTitle,
    marginVertical: 13,
  },
  vehicle_map_icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  loading: {
    width: 100,
    height: 100,
  },
  rideDataMainView: {
    justifyContent: 'space-evenly',
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 60,
  },
  rideDataView: {
    justifyContent: 'space-around',
    borderRadius: 9,
    height: 50,
    width: '45%',
    marginHorizontal: 8,
  },
  bottomSheetlayer: {
    flex: 1,
    height: windowHeight(80),
    marginTop: windowHeight(2)
  },
  fab: {
    position: 'absolute',
    right: windowWidth(2),
    bottom: '34%',
    borderRadius: windowHeight(10),
    zIndex: 10,
  },
  fabMini: {
    position: 'absolute',
    right: windowWidth(2),
    backgroundColor: 'white',
    borderRadius: windowHeight(10),
    zIndex: 11,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  halfButton: {
    width: windowWidth(50)
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: appColors.modelBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: appColors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    ...appTypography.h3,
    marginBottom: 10,
    color: appColors.black,
  },
  modalText: {
    ...appTypography.body,
    color: appColors.primaryFont,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 2,
    right: windowHeight(1),
    backgroundColor: appColors.lightGray,
    borderRadius: windowHeight(2.5),
    marginTop: windowHeight(1),
    height: windowHeight(2.5),
    width: windowHeight(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: appColors.primary,
    width: windowWidth(70),
    height: windowHeight(5),
    borderRadius: windowWidth(1.5),
    marginHorizontal: windowWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    ...appTypography.buttonSecondary,    color: appColors.white,
  },
  otpSheetContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: windowWidth(1.5),
    paddingBottom: windowHeight(2),
  },
  otpTitle: {
    ...appTypography.h2,
    textAlign: 'center',
    marginBottom: windowHeight(1),
  },
  otpSubtitle: {
    ...appTypography.caption,
    textAlign: 'center',
    marginBottom: windowHeight(1),
  },
  otpContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  otpInput: {
    width: windowWidth(15),
    height: windowHeight(7),
    borderWidth: 1,
    borderRadius: 12,
    textAlign: 'center',
    // Size and weight only — a lineHeight would clip the digit inside this
    // fixed-height box on Android, and tracking would break the centring.
    fontFamily: appTypography.otp.fontFamily,
    fontSize: appTypography.otp.fontSize,
    fontWeight: appTypography.otp.fontWeight,
    borderBottomWidth: 1,
    borderColor: appColors.border,
    color: appColors.black,
  },
  otpButtonContainer: {
    width: '100%',
    marginTop: windowHeight(2),
  },
  extraFareSheetContainer: {
    flex: 1,
    paddingHorizontal: windowWidth(5),
    paddingTop: windowHeight(0.2),
  },
  extraFareTitle: {
    ...appTypography.h3,
    textAlign: 'center',
    marginBottom: windowHeight(2.5),
  },
  greenLine: {
    height: 2,
    backgroundColor: appColors.primary,
    width: '20%',
    alignSelf: 'center',
    marginBottom: windowHeight(3),
  },
  inputContainer: {
    marginBottom: windowHeight(2),
  },
  inputLabel: {
    ...appTypography.inputLabel,
    marginBottom: windowHeight(1),
  },
  inputField: {
    borderRadius: windowWidth(2),
    paddingHorizontal: windowWidth(3),
    borderWidth: 1,
  },
  textInput: {
    ...appTypography.inputText,
    height: windowHeight(5.5),
  },
  chargesList: {
    marginVertical: windowHeight(1.5),
  },
  chargeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: windowHeight(1.5),
    paddingHorizontal: windowWidth(3),
    borderRadius: windowWidth(2),
    marginBottom: windowHeight(1),
  },
  chargeText: {
    ...appTypography.body,
    flex: 1,
  },
  chargeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chargeAmount: {
    ...appTypography.bodyMedium,
    marginRight: windowWidth(2),
  },
  removeButton: {
    padding: windowWidth(1),
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: windowHeight(3),
    marginTop:windowHeight(1.5)
  },
  actionButton: {
    flex: 1,
    height: windowHeight(6),
    borderRadius: windowWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMoreButton: {
    marginRight: windowWidth(1),
  },
  saveButton: {
    marginLeft: windowWidth(1),
  },
  actionButtonText: {
    ...appTypography.buttonSecondary,
  },
})
export default styles
