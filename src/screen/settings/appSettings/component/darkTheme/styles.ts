import { StyleSheet } from 'react-native'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../../../theme/appConstant'
import appFonts from '../../../../../theme/appFonts'
import appColors from '../../../../../theme/appColors'

const styles = StyleSheet.create({
  /* ---------- theme picker ---------- */
  optionsRow: {
    justifyContent: 'space-between',
    gap: windowWidth(3),
    padding: windowWidth(4),
  },
  option: {
    flex: 1,
    borderRadius: windowWidth(4),
    borderWidth: 1.5,
    padding: windowWidth(2.5),
  },
  preview: {
    height: windowHeight(11),
    borderRadius: windowWidth(2.6),
    borderWidth: 1,
    padding: windowWidth(2.5),
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  previewBar: {
    height: windowHeight(1.4),
    width: '55%',
    borderRadius: windowWidth(1),
    backgroundColor: appColors.primary,
  },
  previewLine: {
    height: windowHeight(1),
    borderRadius: windowWidth(1),
    marginTop: windowHeight(0.9),
  },
  previewCard: {
    height: windowHeight(3.4),
    borderRadius: windowWidth(2),
    marginTop: windowHeight(1.2),
    borderWidth: 1,
  },
  optionFooter: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: windowHeight(1.2),
    paddingHorizontal: windowWidth(1),
  },
  optionLabel: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
  },
  optionLabelActive: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
  },
  radioOuter: {
    height: windowWidth(4.6),
    width: windowWidth(4.6),
    borderRadius: windowWidth(2.3),
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: windowWidth(2.4),
    width: windowWidth(2.4),
    borderRadius: windowWidth(1.2),
    backgroundColor: appColors.primary,
  },

  /* ---------- kept for the currently hidden Rtl row, which imports
       this stylesheet directly ---------- */
  main: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: windowWidth(3.8),
    marginVertical: windowHeight(1.6),
  },
  container: {
    alignItems: 'center',
  },
  border: {
    borderBottomWidth: windowHeight(0.15),
    marginHorizontal: windowWidth(3.8),
    borderStyle: 'dashed',
  },
  iconView: {
    height: windowHeight(5.2),
    width: windowWidth(11),
    borderRadius: windowHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginHorizontal: windowWidth(3),
    fontFamily: appFonts.regular,
  },
})
export default styles
