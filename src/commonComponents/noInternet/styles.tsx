import { StyleSheet } from 'react-native'
import { windowHeight, fontSizes, windowWidth } from '../../theme/appConstant'
import appFonts from '../../theme/appFonts'
import brandColors from '../../theme/brandColors'

// Colours that depend on the theme are applied inline in index.tsx; only the
// layout and the brand accent live here.
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Was windowWidth(20) — that left the copy in a narrow column and forced
    // the message onto four or five lines on a normal phone.
    paddingHorizontal: windowWidth(10),
  },
  image: {
    width: windowHeight(30),
    height: windowHeight(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: fontSizes.FONT5HALF,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: windowHeight(2),
  },
  // Short orange rule under the title — the only brand mark on the screen,
  // since there is no CTA here to carry the colour.
  accent: {
    width: windowWidth(12),
    height: windowHeight(0.5),
    borderRadius: windowHeight(0.25),
    backgroundColor: brandColors.primary,
    marginTop: windowHeight(1.5),
  },
  details: {
    textAlign: 'center',
    fontSize: fontSizes.FONT3HALF,
    fontFamily: appFonts.regular,
    lineHeight: windowHeight(2.6),
    marginTop: windowHeight(1.5),
  },
})

export default styles
