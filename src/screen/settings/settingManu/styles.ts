import { StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../../../theme/appConstant'

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
  cancelButton: {
    height: windowHeight(5.7),
    width: '47.5%',
    borderRadius: windowHeight(0.7),
  },
})
export default styles
