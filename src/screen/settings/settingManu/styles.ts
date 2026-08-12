import { StyleSheet } from 'react-native'
import { fontSizes, windowHeight, windowWidth } from '../../../theme/appConstant'
import appColors from '../../../theme/appColors'
import appFonts from '../../../theme/appFonts'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  // Padding rather than a margin on the scroll view, so the content clears the
  // floating tab bar without shortening the scrollable area itself.
  scrollContent: {
    paddingBottom: windowHeight(13),
  },
  container: {
    paddingHorizontal: windowWidth(5),
  },
  version: {
    color: appColors.iconColor,
    textAlign: 'center',
    marginTop: windowHeight(3),
    marginBottom: windowHeight(1.5),
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.regular,
  },
  cancelButton: {
    height: windowHeight(5.7),
    width: '47.5%',
    borderRadius: windowHeight(0.7),
  },
})
export default styles
