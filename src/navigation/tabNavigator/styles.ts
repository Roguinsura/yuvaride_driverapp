import { StyleSheet } from 'react-native'
import appFonts from '../../theme/appFonts'
import { fontSizes, windowHeight } from '../../theme/appConstant'

const styles = StyleSheet.create({
  // Background and border are passed in by the navigator — brand orange in
  // light mode, the dark surface in dark mode, matching the headers.
  tabBarContainer: {
    position: 'absolute',
    bottom: windowHeight(0),
    left: windowHeight(0),
    right: windowHeight(0),
    height: windowHeight(9.6),
    overflow: 'hidden',
    paddingBottom: windowHeight(1.1),
    paddingTop: windowHeight(1),
    borderTopWidth: 0,
    elevation: 0,
  },
  // The active tab's icon sits in a filled pill; inactive tabs get the same
  // box with a transparent fill so nothing shifts position when focus moves.
  iconWrap: {
    height: windowHeight(4.2),
    width: windowHeight(7.2),
    borderRadius: windowHeight(2.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabelStyle: {
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.Lexend,
    marginTop: windowHeight(0.3),
  },
})
export default styles
