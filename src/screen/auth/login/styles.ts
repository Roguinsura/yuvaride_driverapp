import { Dimensions, StyleSheet } from 'react-native'
import { windowHeight } from '../../../theme/appConstant'

const SCREEN_WIDTH = Dimensions.get('window').width
// Source art is 1394x546.
const ART_HEIGHT_RATIO = 546 / 1394

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  // The city illustration is gone, so there is no card overlapping artwork any
  // more — the screen is a single white surface with the logo on top of it.
  scroll: {
    flexGrow: 1,
  },
  loginView: {
    flex: 1,
  },
  // Skyline fills the empty space under the card. `marginTop: 'auto'` pushes it
  // to the bottom when the form is short, and it simply follows the content
  // down when the keyboard shrinks the viewport.
  bottomArt: {
    marginTop: 'auto',
    paddingTop: windowHeight(3),
  },
  // Explicit pixel size, not width: '100%' + aspectRatio. A vertical ScrollView
  // gives its content container an indefinite width, so the percentage cannot
  // resolve and the image falls back to its intrinsic 1394x546 dp — roughly
  // 3.4x the screen width.
  bottomArtImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * ART_HEIGHT_RATIO,
  },
})

export default styles
