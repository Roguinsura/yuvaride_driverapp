import { StyleSheet } from 'react-native'
import { windowHeight } from '../../theme/appConstant'
import appTypography from '../../theme/appTypography'

const styles = StyleSheet.create({
  button: {
    height: windowHeight(6),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowHeight(1),
  },
  /*
    Primary CTA: 16/600, from the typography tokens.

    This read `appFonts.semiBold`, which does not exist on AppFonts (only bold,
    medium and regular do) — so fontFamily resolved to undefined and no size was
    set at all, leaving every button on the platform default face at 14px.
  */
  buttonText: appTypography.button,
})

export default styles
