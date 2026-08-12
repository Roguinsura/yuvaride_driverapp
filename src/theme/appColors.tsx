import brandColors from './brandColors'

type AppColors = {
  white: string
  black: string
  primary: string
  subPrimary: string
  primaryFont: string
  secondaryFont: string
  graybackground: string
  bordercolor: string
  red: string
  border: string
  delBackground: string
  primaryLight: string
  greenborder: string
  cardicon: string
  price: string
  subFont: string
  modelBg: string
  alertBg: string
  alertIconBg: string
  alertBorder: string
  invoiceBtn: string
  darkThemeSub: string
  categoryTitle: string
  alertRed: string
  activeColor: string
  completeColor: string
  scheduleColor: string
  darkborder: string
  closeBg: string
  darkPurpal: string
  lightPurpal: string
  lightRed: string
  primaryBg: string
  subCategorytag: string
  darkBorderBlack: string
  dotPrimary: string
  bgDark: string
  darkFillBar: string
  darkText: string
  planNote: string
  dropDownColor: string
  planDot: string
  planLine: string
  round: string
  grayRound: string
  tagColor: string
  loader: string
  pink: string
  lightPink: string
  lightOrange: string
  lightGreen: string
  lightYellow: string
  railFillBackgroundColor: string
  loaderBackground: string
  loaderLightHighlight: string
  iconColor: string
  line: string
  darkLine: string,
  dotDark: string,
  border1: string,
  yellow: string,
  bgColor: string,
  value: string,
  value1: string,
  bgColor1: string,
  bgColor2: string,
  blueShade: string,
  toup: string,
  whiteopicity: string,
  gray: string;
  orange: string;
  setp: string;
  lightGray?: string;
  cream?: string
  mintCream: string;
  steelGray: string;
  brightRed: string;
  vividRed: string;
  darkCrimson: string;
  roseTint: string;
  darkPrimary: string;
  lightGreen1:string;
  rgb:string
}

// YuvaRide palette. This was the Taxido green (#199675) and its family of
// tints; every one of them has been remapped onto the brand orange at the same
// relative lightness, so existing screens keep their contrast without needing
// to be touched individually.
//
// The base hue lives in ./brandColors and is imported rather than repeated, so
// the two palettes cannot drift apart. Token *names* are deliberately left
// alone (`greenborder`, `mintCream`, `lightGreen1` …) — they are referenced by
// roughly 295 files, and renaming them is a separate, mechanical change.
//
// Deliberately NOT remapped, because they carry meaning rather than brand:
//   price        #20B149  green for money / earnings
//   activeColor  #3F8FDA  blue   — ride status
//   completeColor#FFB400  amber  — ride status
//   scheduleColor#7F00FF  purple — ride status
//   lightGreen   #ECF4FB  misnamed; it is actually a pale blue
const appColors: AppColors = {
  loaderBackground: '#E8E8E8',
  loaderLightHighlight: '#F2F8FC',
  white: '#fff',
  black: '#000',
  darkText: '#BCBCBC',
  primary: brandColors.primary,
  darkFillBar: '#3E332B',
  dotPrimary: '#4A3524',
  lightYellow: '#FFF7E5',
  pink: '#ff00ff',
  lightPink: '#F2E5FF',
  subPrimary: '#FAD9BE',
  lightGreen: '#ECF4FB',
  primaryFont: '#1F1F1F',
  secondaryFont: '#8F8F8F',
  graybackground: '#F5F5F5',
  border: '#E9E9E9',
  delBackground: '#FFEDED',
  primaryLight: '#FF8A2B',
  greenborder: brandColors.primaryBorder,
  cardicon: '#FFF1E6',
  price: '#20B149',
  red: '#FF4B4B',
  alertRed: '#F33737',
  subFont: '#171C26',
  modelBg: 'rgba(0, 0, 0, 0.5)',
  railFillBackgroundColor: 'rgba(248, 111, 0, 0.12)',
  bordercolor: '#E9E9E9',
  alertBg: '#F6E4E4',
  alertIconBg: '#F7D5D5',
  alertBorder: '#F8C5C5',
  invoiceBtn: '#E0E0E0',
  darkThemeSub: '#343434',
  categoryTitle: '#F7B278',
  activeColor: '#3F8FDA',
  completeColor: '#FFB400',
  scheduleColor: '#7F00FF',
  darkborder: '#474747',
  closeBg: '#CFCDC6',
  darkPurpal: '#C084FC',
  lightPurpal: '#F9F3FF',
  lightRed: '#FFEDED',
  primaryBg: '#FCEADC',
  subCategorytag: '#F0EAF6',
  darkBorderBlack: '#797D83',
  bgDark: '#272727',
  planNote: '#F5F6F7',
  dropDownColor: '#fafafa',
  planDot: '#F08A3C',
  planLine: '#F7C9A3',
  round: brandColors.primaryPressed,
  grayRound: '#D0D3D8',
  tagColor: brandColors.primarySoft,
  loader: '#EEEEEE',
  lightOrange: '#FEEBEB',
  iconColor: '#777777',
  line: '#C7CACF',
  darkLine: brandColors.primaryPressed,
  dotDark: "#4A3524",
  border1: "#E9E9E9",
  yellow: '#ECB238',
  bgColor: '#FDF7EB',
  value: '#F7CFAC',
  value1: '#FFF1E6',
  bgColor1: '#F8F8F8',
  bgColor2: '#FFF4F1',
  blueShade: '#47A1E5',
  toup: '#D9C6B6',
  whiteopicity: '#F1F7FE',
  gray: '#FCF9EA',
  orange: '#FF8367',
  setp: '#86909C',
  lightGray: "#F4F4F4",
  cream: '#FCF9EA',
  mintCream: '#FFF6EF',
  steelGray: '#86909C',
  brightRed: '#F14848',
  vividRed: '#FF4B4B',
  darkCrimson: '#B42D30',
  roseTint: '#F5D5D6',
  darkPrimary: '#7A3600',
  lightGreen1:"#F5D6BC",
  rgb:"rgba(211, 211, 211, 0.2)"
}
export default appColors
