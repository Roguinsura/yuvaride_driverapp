import { StyleSheet } from 'react-native'
import appColors from '../../../../theme/appColors'
import appFonts from '../../../../theme/appFonts'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../theme/appConstant'
import appTypography from '../../../../theme/appTypography'

const styles = StyleSheet.create({
  initialsCircle: {
    backgroundColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  main: {
    width: '100%',
    borderWidth: windowHeight(0.1),
    borderRadius: windowHeight(0.5),
    paddingVertical: windowHeight(1.5),
    paddingHorizontal: windowWidth(3),
    marginTop: windowHeight(1.5),
  },
  top: {
    flex: 1,
    marginBottom: windowHeight(1.5),
    borderRadius: windowHeight(0.5),
    paddingBottom: windowHeight(1.2),
    overflow: 'hidden',
  },
  alignment: {
    justifyContent: 'space-between',
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight(1.3),
  },
  userimage: {
    height: windowHeight(6),
    width: windowHeight(6),
    borderRadius: windowHeight(3),
    resizeMode: 'cover',
  },
  // Rider name — the card's title line.
  userName: {
    ...appTypography.cardTitle,
    marginHorizontal: windowWidth(1.5),
    color: appColors.primary,
  },
  rate: {
    marginHorizontal: windowWidth(0.4),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: windowHeight(1.2),
    height: windowHeight(5.5),
  },
  distanceValue: {
    marginHorizontal: windowWidth(0.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    ...appTypography.rating,
    marginHorizontal: windowWidth(0.4),
  },
  verticalBorder: {
    borderLeftWidth: windowHeight(0.1),
    height: windowHeight(2),
    marginHorizontal: windowWidth(1.5),
  },
  /*
    Fare. 20/700 — the spec wants this to draw the eye without overpowering the
    rider name above it, which is why the name is 16/600 rather than matching.
  */
  price: {
    ...appTypography.cardPrice,
    color: appColors.price,
    marginHorizontal: windowWidth(0.4),
  },
  border: {
    borderStyle: 'dashed',
    borderBottomWidth: windowHeight(0.15),
    borderColor: appColors.bordercolor,
    marginVertical: windowHeight(1.5),
  },
  // Secondary metadata beside the fare.
  timing: {
    ...appTypography.cardMeta,
    color: appColors.secondaryFont,
    top: windowHeight(0.1),
    marginHorizontal: windowHeight(0.6),
  },
  distance: {
    ...appTypography.cardMeta,
  },
  bottom: {
    borderRadius: windowHeight(0.5),
    bottom: windowHeight(0.3),
  },
  mainContainer: {
    alignItems: 'center',
    paddingVertical: windowHeight(1.2),
  },

  verticaldot: {
    borderLeftWidth: windowHeight(0.1),
    height: windowHeight(5.5),
    marginHorizontal: windowHeight(0.7),
    borderStyle: 'dashed',
  },
  /*
    Pickup and drop, 16/500 (locationPrimary). These are the two lines a driver
    reads under time pressure, so they carry more weight than the surrounding
    metadata rather than sitting at body weight as before.
  */
  pickup: {
    ...appTypography.locationPrimary,
    top: windowHeight(0.8),
    marginHorizontal: windowHeight(1),
  },
  drop: {
    ...appTypography.locationPrimary,
    width: windowWidth(70),
    top: windowHeight(0.5),
    marginBottom: windowHeight(0.9),
    marginHorizontal: windowHeight(1),
  },
  tagBg: {
    padding: windowHeight(0.5),
    borderRadius: windowHeight(3),
    marginTop: windowHeight(0.5),
    marginHorizontal: windowHeight(1),
    backgroundColor: appColors.invoiceBtn,
  },
  direction: {
    width: '100%',
    justifyContent: 'space-between',
    height: windowHeight(1.3),
  },
  lineImage: {
    height: windowHeight(2.5),
    resizeMode: 'contain',
    marginHorizontal: windowHeight(1.3),
    bottom: windowHeight(1.5),
  },
  acceptContainer: {
    backgroundColor: appColors.primary,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight(6),
    borderRadius: windowWidth(1.8),
  },
  acceptText: {
    ...appTypography.button,
    color: appColors.white,
  },
  moreInfo: {
    ...appTypography.buttonSecondary,
    color: appColors.secondaryFont,
  },
  moreInfoContainer: {
    backgroundColor: appColors.graybackground,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight(5.5),
    borderRadius: windowHeight(0.6),
  },
  InfoContainer: {
    justifyContent: 'space-between',
    marginTop: windowHeight(1.2),
    width: '100%',
  },
  rentalInfoContainer: {
    marginTop: windowHeight(1.5),
    borderRadius: windowHeight(0.6),
    alignItems: 'center',
    justifyContent: 'center',
    padding: windowHeight(1.5),
  },
  borderContainer: { top: windowHeight(0.5) },
  gps: { bottom: windowHeight(0.2) },
  rideContainer: {
    marginHorizontal: windowWidth(2),
    height: windowHeight(5),
    justifyContent: 'space-between',
  },
  starContainer: {
    bottom: windowHeight(0.5),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth(10),
  },
  text1: { fontFamily: appFonts.regular },
  scheduleContainer: {
    justifyContent: 'space-between',
    marginBottom: windowHeight(2),
    backgroundColor: appColors.white,
    borderRadius: windowHeight(0.6),
  },
  startDateText: {
    color: appColors.primaryFont,
    fontFamily: appFonts.medium,
  },
  calanderSmall: {
    marginTop: windowHeight(0.5)
  },
  formattedDateText: {
    color: appColors.secondaryFont,
    fontFamily: appFonts.regular,
  },
  startContainer: {
    borderLeftWidth: windowHeight(0.1),
    marginVertical: windowHeight(1),
  },
  startTime: {
    color: appColors.primaryFont,
    fontFamily: appFonts.medium,
  },
  containerSchedule: {
    padding: windowHeight(1)
  },
  rentalContainer: {
    justifyContent: 'space-between',
    marginBottom: windowHeight(0.5),
    backgroundColor: appColors.white,
    borderRadius: windowHeight(0.6),
    marginTop: windowHeight(1)
  },
  rentalBorder: {
    borderLeftWidth: windowHeight(0.1),
    marginVertical: windowHeight(1),
  },
  rentalDateContainer: {
    justifyContent: 'space-between',
    marginBottom: windowHeight(2),
    backgroundColor: appColors.white,
    borderRadius: windowHeight(0.6),
  },
  borderLine: {
    borderStartWidth: windowHeight(0.1),
    marginHorizontal: windowHeight(1.3),
  },
  scheduleClock: {
    marginTop: windowHeight(0.5)
  },
  smallCalander: {
    marginBottom: windowHeight(0.8)
  },
  container: {
    width: '100%',
    height: 5,
    backgroundColor: appColors.loader,
    overflow: 'hidden',
    borderRadius: 5,
  },
  progressBar: {
    height: '100%',
  },
})
export default styles
