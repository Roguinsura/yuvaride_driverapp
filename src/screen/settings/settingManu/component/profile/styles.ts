import { StyleSheet } from 'react-native'
import appColors from '../../../../../theme/appColors'
import appFonts from '../../../../../theme/appFonts'
import brandColors from '../../../../../theme/brandColors'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../../../theme/appConstant'

export const AVATAR = windowHeight(8)

const styles = StyleSheet.create({
  main: {
    width: '100%',
    marginTop: windowHeight(2.2),
    marginBottom: windowHeight(1),
    borderRadius: windowWidth(5),
    borderWidth: 1,
    padding: windowWidth(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },

  /* ---------- identity ---------- */
  detainContain: {
    alignItems: 'center',
  },
  avatarWrap: {
    padding: 2.5,
    borderRadius: AVATAR,
    borderWidth: 2,
    borderColor: brandColors.primaryBorder,
  },
  profileImage: {
    height: AVATAR,
    width: AVATAR,
    resizeMode: 'cover',
    borderRadius: AVATAR / 2,
  },
  nameTag: {
    alignItems: 'center',
    justifyContent: 'center',
    height: AVATAR,
    width: AVATAR,
    backgroundColor: appColors.primary,
    borderRadius: AVATAR / 2,
  },
  char: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT6HALF,
  },
  details: {
    flex: 1,
    marginHorizontal: windowWidth(3.5),
  },
  name: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT4HALF,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  mail: {
    color: appColors.secondaryFont,
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    marginTop: windowHeight(0.3),
  },
  ratingBox: {
    alignItems: 'center',
    borderRadius: windowWidth(5),
    paddingHorizontal: windowWidth(2.6),
    paddingVertical: windowHeight(0.5),
  },
  ratingText: {
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT3,
    fontWeight: '700',
  },

  /* ---------- wallet ---------- */
  divider: {
    height: 1,
    marginVertical: windowHeight(2),
  },
  walletContain: {
    alignItems: 'center',
    borderRadius: windowWidth(4),
    borderWidth: 1,
    borderColor: brandColors.primaryBorder,
    backgroundColor: brandColors.primarySoft,
    padding: windowWidth(3),
  },
  walletIcon: {
    height: windowHeight(5.4),
    width: windowHeight(5.4),
    borderRadius: windowWidth(3),
    backgroundColor: appColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletTextWrap: {
    flex: 1,
    marginHorizontal: windowWidth(3),
  },
  walletTitle: {
    color: appColors.secondaryFont,
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
  },
  walletAmount: {
    color: appColors.primary,
    fontFamily: appFonts.bold,
    fontSize: fontSizes.FONT5,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: windowHeight(0.2),
  },
})

export default styles
