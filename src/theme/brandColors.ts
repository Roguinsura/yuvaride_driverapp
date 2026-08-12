// YuvaRide brand palette, used by redesigned screens only.
//
// theme/appColors.tsx is still the original green Taxido palette and is imported
// by ~295 files — editing `primary` there would repaint the entire app at once.
// Screens that have been rebranded pull their colours from here instead, so the
// migration can happen screen by screen. When every screen is done this folds
// into appColors and this file goes away.
const brandColors = {
  primary: '#f86f00',
  primaryPressed: '#d75f00',
  // Tinted fills for secondary buttons, chips and focus rings.
  primarySoft: '#FFF3E9',
  primaryBorder: '#FFD5B2',
  onPrimary: '#FFFFFF',

  // Neutrals tuned to sit next to the orange without going muddy.
  pageLight: '#FFFFFF',
  pageDark: '#121212',
  cardLight: '#FFFFFF',
  cardDark: '#1C1C1E',
  fieldLight: '#F6F7F9',
  fieldDark: '#232326',
  borderLight: '#E8EAED',
  borderDark: '#33333A',
  titleLight: '#14161A',
  titleDark: '#FFFFFF',
  bodyLight: '#6B7280',
  bodyDark: '#9CA3AF',
  danger: '#E5484D',
}

export default brandColors
