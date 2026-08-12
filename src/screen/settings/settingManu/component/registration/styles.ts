import { StyleSheet } from 'react-native'
import appFonts from '../../../../../theme/appFonts'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../../../theme/appConstant'

const styles = StyleSheet.create({
  // The section headings used to provide the gap between cards; with them
  // gone the spacing moves onto the section wrapper.
  section: {
    marginTop: windowHeight(2.2),
  },
  listView: {
    width: '100%',
    borderRadius: windowWidth(5),
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
  },
  border: {
    borderBottomWidth: 1,
    marginHorizontal: windowWidth(4),
  },
  loaderStyle: {
    marginBottom: windowHeight(1.3),
    top: windowHeight(1.1),
  },
  loaderBorder: {
    top: windowHeight(0.5),
  },
})

export default styles
