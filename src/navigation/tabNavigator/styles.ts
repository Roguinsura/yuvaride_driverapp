import { StyleSheet } from 'react-native'
import { windowHeight } from '../../theme/appConstant'
import appTypography from '../../theme/appTypography'
import spacing from '../../theme/spacing'

/**
 * Bar height excluding the safe-area inset. 68 sits mid-range of the spec's
 * 64-72 and holds a 24px icon, a 4px gap and a 16px label line without
 * crowding. The inset is added on top at runtime.
 */
export const TAB_BAR_CONTENT_HEIGHT = 68

const styles = StyleSheet.create({
  // Background and border are passed in by the navigator — brand orange in
  // light mode, the dark surface in dark mode, matching the headers.
  /*
    Height and bottom padding are applied at runtime in index.tsx, because both
    depend on the safe-area inset.

    The bar is absolutely positioned at bottom: 0, and the root SafeAreaView
    excludes the bottom edge (edges={['top','left','right']}) so screens can
    draw to the bottom of the display. Nothing was therefore accounting for
    Android's gesture bar, and the labels were sitting under it.

    The old height of windowHeight(9.6) was 9.6% of screen height — about 77dp
    on this device, growing on taller ones — where the spec asks for 64-72.
  */
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    paddingTop: spacing.xs,
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
