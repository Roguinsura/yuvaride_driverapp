import { StyleSheet } from 'react-native'
import { windowHeight } from '../../theme/appConstant'
import appTypography from '../../theme/appTypography'
import spacing from '../../theme/spacing'

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
  /*
    Bottom-nav label: 12/500, per the typography spec.

    This read `appFonts.Lexend`, which does not exist on AppFonts — only bold,
    medium and regular do — so fontFamily resolved to undefined and the labels
    rendered in the platform default face.

    The icon-to-label gap is a fixed 4px (spec: 3-4px) rather than a fraction of
    screen height, so it stays tight on tall devices instead of drifting open.
  */
  tabBarLabelStyle: {
    ...appTypography.navigation,
    marginTop: spacing.xxs,
  },
})
export default styles
