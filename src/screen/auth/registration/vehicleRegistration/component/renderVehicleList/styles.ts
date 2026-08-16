import { StyleSheet } from 'react-native'
import appColors from '../../../../../../theme/appColors'
import { windowHeight, windowWidth } from '../../../../../../theme/appConstant'
import appFonts from '../../../../../../theme/appFonts'

const styles = StyleSheet.create({
  /*
    Frosted-glass service card. There is no blur library in the project, so the
    effect is layered rather than a real backdrop blur: a translucent fill, a
    lighter hairline border standing in for the lit edge, a soft shadow for
    lift, and `glassSheen` as a highlight across the top. Colours are passed in
    by the component so the selected state can tint without changing shape.
  */
  listView: {
    width: windowWidth(27),
    height: windowWidth(23),
    borderRadius: windowWidth(4),
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: windowWidth(2),
    paddingHorizontal: windowWidth(2),
    overflow: 'hidden',
    // iOS-only shadow props. Deliberately no `elevation`: on Android an
    // elevated view with a translucent background gets an opaque backing
    // painted behind it to catch the shadow, which showed through the tinted
    // selected card as a white box. Glass and elevation do not mix here.
    shadowColor: appColors.black,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  iconAndTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTitle: {
    marginTop: windowHeight(1),
    fontFamily: appFonts.medium,
    fontSize: windowHeight(1.7),
  },
  arrowButton: {
    width: windowWidth(8),
    height: windowWidth(8),
    borderRadius: windowWidth(4),
    backgroundColor: appColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    zIndex: 10,
    marginHorizontal: windowWidth(-2),
    top: windowHeight(3.5)
  },
})

export default styles
