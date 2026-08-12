import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'

const styles = StyleSheet.create({
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight(6),
    paddingHorizontal: windowWidth(1.5),
    borderRadius: windowWidth(1.5),
  },
  codeText: {
    fontSize: fontSizes.FONT3SMALL,
    color: appColors.black,
    top: windowHeight(0),
    paddingHorizontal: windowWidth(2),
  },
  main: {
    flex: 1,
    width: '100%',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: windowHeight(2),
  },
  profileView: {
    marginHorizontal: windowWidth(4),
    marginTop: windowHeight(10),
    borderWidth: windowHeight(0.1),
    borderRadius: windowHeight(1),
    // Was height: '80%'. A percentage height inside a ScrollView resolves
    // against an indefinite container, so it could not be relied on; the card
    // now sizes to its own content and the delete row below it lands where it
    // should.
    paddingBottom: windowHeight(2),
  },
  profileImageView: {
    position: 'absolute',
    top: windowHeight(-7),
    left: '48%',
    marginLeft: windowWidth(-12),
    width: windowHeight(14),
    height: windowHeight(14),
    borderRadius: windowHeight(15),
    borderWidth: windowHeight(0.1),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: windowHeight(12.8),
    height: windowHeight(12.8),
    resizeMode: 'cover',
    borderRadius: windowHeight(6),
  },
  charImage: {
    width: windowHeight(10),
    height: windowHeight(10),
    resizeMode: 'cover',
    borderRadius: windowHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.primary,
  },
  firstLetter: {
    color: appColors.white,
    fontSize: fontSizes.FONT7,
    fontFamily: appFonts.bold,
  },
  fieldView: {
    marginHorizontal: windowWidth(4),
    marginTop: windowHeight(8.9),
    paddingBottom: windowHeight(3.3),
  },
  updateBtn: {
    marginBottom: windowHeight(1.5),
  },
  codeComponent: {
    marginRight: windowWidth(2.5),
  },
  countryCode: {
    height: windowHeight(6),
    width: windowWidth(15),
    backgroundColor: appColors.graybackground,
    paddingHorizontal: windowWidth(1.5),
    paddingVertical: windowHeight(1),
    borderRadius: windowWidth(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: windowHeight(0.1),
  },
  dialCode: {
    color: appColors.secondaryFont,
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.medium,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginTop: windowHeight(19),
  },
  editIconContainer: {
    width: windowHeight(4),
    height: windowHeight(4),
    borderRadius: windowHeight(24),
    position: 'absolute',
    alignSelf: 'flex-end',
    flexGrow: 1,
    top: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: windowHeight(0.1),
  },
  char: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5,
    backgroundColor: appColors.primary,
    width: windowHeight(75),
    height: windowHeight(74),
    borderRadius: windowHeight(74),
    textAlign: 'center',
    paddingVertical: windowHeight(25),
  },
  emailContainer: {
    top: windowHeight(0.2),
  },
  countryContainer: {
    marginVertical: windowHeight(1),
  },
  mobileNumber: {
    marginTop: windowHeight(0.3),
    fontFamily: appFonts.medium,
  },
  errorText: {
    color: appColors.red,
    fontSize: fontSizes.FONT3HALF,
  },

  /* ---------- delete account (moved off the Settings menu) ---------- */
  deleteRow: {
    alignItems: 'center',
    marginHorizontal: windowWidth(4),
    marginTop: windowHeight(2),
    marginBottom: windowHeight(3),
    paddingHorizontal: windowWidth(4),
    paddingVertical: windowHeight(1.8),
    borderRadius: windowWidth(4),
    borderWidth: 1,
  },
  deleteIcon: {
    height: windowHeight(5.2),
    width: windowHeight(5.2),
    borderRadius: windowWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteTextWrap: {
    flex: 1,
    marginHorizontal: windowWidth(3.5),
  },
  deleteTitle: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4,
    fontWeight: '700',
  },
  sheetTitle: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4HALF,
    fontWeight: '700',
    marginTop: windowHeight(1),
    textAlign: 'center',
  },
  sheetBody: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    color: appColors.secondaryFont,
    textAlign: 'center',
    width: '88%',
    marginTop: windowHeight(1.2),
  },
  sheetActions: {
    width: '90%',
    marginTop: windowHeight(3),
    justifyContent: 'space-between',
    gap: 12,
  },
  sheetButton: {
    flex: 1,
    height: windowHeight(6.2),
    borderRadius: windowWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetButtonText: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4,
    fontWeight: '700',
  },
})

export default styles
