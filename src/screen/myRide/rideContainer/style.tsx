import { StyleSheet } from 'react-native'
import { windowHeight, windowWidth, fontSizes } from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'
import appColors from '../../../theme/appColors'
import brandColors from '../../../theme/brandColors'

export const AVATAR = windowWidth(12)

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingTop: windowHeight(1.5),
    // Clears the floating tab bar.
    paddingBottom: windowHeight(14),
    flexGrow: 1,
  },

  /* ---------- card ---------- */
  card: {
    marginHorizontal: windowWidth(5),
    marginBottom: windowHeight(1.8),
    borderRadius: windowWidth(4.5),
    borderWidth: 1,
    padding: windowWidth(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },

  /* ---------- top row ---------- */
  topRow: {
    alignItems: 'center',
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    resizeMode: 'cover',
  },
  avatarFallback: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: fontSizes.FONT4HALF,
    fontFamily: appFonts.bold,
    color: appColors.white,
  },
  nameWrap: {
    flex: 1,
    marginHorizontal: windowWidth(3),
  },
  name: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  ratingRow: {
    alignItems: 'center',
    marginTop: windowHeight(0.4),
  },
  ratingText: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3,
    marginHorizontal: windowWidth(1.2),
  },
  reviewText: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3,
    color: appColors.secondaryFont,
  },
  statusPill: {
    paddingHorizontal: windowWidth(2.8),
    paddingVertical: windowHeight(0.5),
    borderRadius: windowWidth(5),
  },
  statusText: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT3,
    fontWeight: '700',
  },

  /* ---------- route ---------- */
  divider: {
    height: 1,
    marginVertical: windowHeight(1.8),
  },
  routeRow: {
    flexDirection: 'row',
  },
  rail: {
    width: windowWidth(4),
    alignItems: 'center',
    paddingTop: windowHeight(0.7),
  },
  dot: {
    width: windowWidth(2.4),
    height: windowWidth(2.4),
    borderRadius: windowWidth(1.2),
    borderWidth: 2,
  },
  railLine: {
    flex: 1,
    width: 1.5,
    marginVertical: windowHeight(0.4),
    minHeight: windowHeight(2.4),
  },
  routeTexts: {
    flex: 1,
    marginHorizontal: windowWidth(3),
  },
  routeLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3,
    color: appColors.secondaryFont,
  },
  routeAddress: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowHeight(0.2),
  },
  routeGap: {
    height: windowHeight(2),
  },

  /* ---------- footer ---------- */
  footerRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaRow: {
    alignItems: 'center',
  },
  metaText: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3,
    color: appColors.secondaryFont,
    marginHorizontal: windowWidth(1.2),
  },
  metaSeparator: {
    height: windowHeight(1.4),
    width: 1,
    marginHorizontal: windowWidth(2),
  },
  fare: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: appColors.primary,
  },

  /* ---------- actions ---------- */
  actionRow: {
    alignItems: 'center',
    marginTop: windowHeight(1.8),
  },
  messageButton: {
    flex: 1,
    height: windowHeight(5.4),
    borderRadius: windowWidth(2.8),
    borderWidth: 1.5,
    borderColor: appColors.primary,
    backgroundColor: brandColors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
    color: appColors.primary,
  },
  callButton: {
    height: windowHeight(5.4),
    width: windowHeight(5.4),
    borderRadius: windowWidth(2.8),
    backgroundColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: windowWidth(2.5),
  },

  /* ---------- empty state ---------- */
  noDataContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: windowWidth(10),
    paddingVertical: windowHeight(8),
  },
  noDataImage: {
    width: windowWidth(55),
    height: windowWidth(55),
    resizeMode: 'contain',
  },
  noDataText: {
    fontSize: fontSizes.FONT4HALF,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    marginTop: windowHeight(1),
    textAlign: 'center',
  },
  noDataDesc: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowHeight(1),
    textAlign: 'center',
  },
})

export { styles }
