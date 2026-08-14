import { StyleSheet } from 'react-native'
import appColors from '../../../../theme/appColors'
import brandColors from '../../../../theme/brandColors'
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from '../../../../theme/appConstant'
import appFonts from '../../../../theme/appFonts'

/*
  The old layout was a flat run of inputs nudged into place with negative
  `bottom`/`top` offsets (name, email, password, mobileNumber all had them).
  Fields are now grouped into cards in normal flow, so nothing needs nudging.
*/
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: windowWidth(5),
    paddingTop: windowHeight(2),
  },

  /* ---------- intro ---------- */
  stepPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: windowWidth(3),
    paddingVertical: windowHeight(0.5),
    borderRadius: windowWidth(5),
    backgroundColor: brandColors.primarySoft,
  },
  stepPillText: {
    color: appColors.primary,
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT3,
    letterSpacing: 0.6,
  },
  title: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT6,
    letterSpacing: -0.4,
    marginTop: windowHeight(1.4),
  },
  subtitle: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3HALF,
    lineHeight: fontSizes.FONT3HALF * 1.5,
    marginTop: windowHeight(0.7),
  },

  /* ---------- sections ---------- */
  sectionTitle: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT3,
    letterSpacing: 1,
    marginTop: windowHeight(3),
    marginBottom: windowHeight(1.2),
    marginHorizontal: windowWidth(1),
  },
  card: {
    borderRadius: windowWidth(4),
    borderWidth: 1,
    paddingHorizontal: windowWidth(4),
    paddingTop: windowHeight(2),
    paddingBottom: windowHeight(0.6),
  },
  // Consistent gap under each field, replacing the old per-field offsets.
  field: {
    marginBottom: windowHeight(1.6),
  },

  /* ---------- phone row ---------- */
  label: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
    marginBottom: windowHeight(1),
  },
  phoneRow: {
    alignItems: 'center',
  },
  // Code chip and phone field share a height so the row lines up without the
  // absolute offsets the previous version used.
  codeChip: {
    height: windowHeight(6.3),
    paddingHorizontal: windowWidth(3.5),
    borderRadius: windowWidth(2.5),
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    fontSize: fontSizes.FONT4,
    fontFamily: appFonts.medium,
  },
  phoneField: {
    flex: 1,
    height: windowHeight(6.3),
    borderWidth: 1.2,
    borderRadius: windowWidth(2.5),
    marginHorizontal: windowWidth(2.5),
    overflow: 'hidden',
    justifyContent: 'center',
  },
  number: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT4,
    paddingHorizontal: windowWidth(3.5),
    height: '100%',
    width: '100%',
  },
  errorText: {
    color: appColors.red,
    fontSize: fontSizes.FONT3,
    marginTop: windowHeight(0.6),
  },

  /* ---------- footer ---------- */
  footer: {
    marginTop: windowHeight(3),
    marginBottom: windowHeight(2),
  },
  /* ---------- country modal ---------- */
  // The picker renders its title row, search field and list flush to the
  // modal edges, so the padding has to come from the content container.
  modalContent: {
    paddingHorizontal: windowWidth(5),
    paddingTop: windowHeight(1),
  },
  modalTitle: {
    fontFamily: appFonts.bold,
    fontWeight: '700',
    fontSize: fontSizes.FONT5,
  },
  modalClose: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT4,
  },
  // The whole point of the modal: a search field big enough to read what you
  // type. The inline dropdown gave it whatever width was left under the field.
  modalSearch: {
    minHeight: windowHeight(6),
    fontSize: fontSizes.FONT4,
    fontFamily: appFonts.regular,
    borderRadius: windowWidth(2.5),
    borderWidth: 1.2,
    paddingHorizontal: windowWidth(3.5),
  },

  /* ---------- dropdown + input passthrough ---------- */
  // Kept here rather than inline: index.tsx imports windowWidth from
  // intro/onBoarding/styles, which is a /480 scale (~4.8x this file's /100
  // one), so inline width values there come out far too small.
  dropdown: {
    borderWidth: 1.2,
    borderRadius: windowWidth(2.5),
    minHeight: windowHeight(6.3),
    paddingHorizontal: windowWidth(3.5),
  },
  view: {
    marginRight: windowWidth(10),
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderStyles: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT4,
  },
  text: {
    fontFamily: appFonts.regular,
  },
  container: {
    marginBottom: windowHeight(0),
  },
})
export default styles
