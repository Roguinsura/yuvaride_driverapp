import appColors from '../../theme/appColors'
import appFonts from '../../theme/appFonts'
import { fontSizes, windowHeight, windowWidth } from '../../theme/appConstant'

/*
  Shared configuration for react-native-country-select, which is opened from
  four places (login, create account, edit details, add driver). Each call site
  had configured it differently; this keeps them identical.

  Two problems it addresses:

  1. The search field was hard to read while typing. The package's own default
     is a 44pt row at fontSize 16, but the sheet opens at 50% of the screen and
     jumps to its max only once the keyboard appears — with adjustResize
     shrinking the window at the same time, the field ends up cramped. Opening
     taller and styling the field explicitly keeps it legible.

  2. India is the operating market, so it is pinned to the top as a popular
     country. Most users then never have to search or wait for the full list.
*/
export const countrySelectProps = (isDark: boolean) => ({
  theme: (isDark ? 'dark' : 'light') as 'dark' | 'light',
  modalType: 'bottomSheet' as const,
  showSearchInput: true,
  showAlphabetFilter: true,
  showCloseButton: true,
  popularCountries: ['IN'],
  searchPlaceholder: 'Search country or code',
  searchPlaceholderTextColor: isDark
    ? appColors.darkText
    : appColors.secondaryFont,
  searchSelectionColor: appColors.primary,
  // Open tall enough that the list and the search field are both usable
  // straight away, instead of the package default of half the screen.
  initialBottomsheetHeight: '75%',
  minBottomsheetHeight: '55%',
  maxBottomsheetHeight: '92%',
  countrySelectStyle: {
    /*
      The package renders the close button before the search input inside a
      plain `row`, which puts it on the left. Reversing the row moves it to
      the right where a dismiss belongs, and the default `marginRight: 10`
      that separated it from the search field has to swap sides with it.
    */
    searchContainer: {
      flexDirection: 'row-reverse' as const,
      paddingHorizontal: windowWidth(4),
      paddingTop: windowHeight(1),
      paddingBottom: windowHeight(1.4),
    },
    closeButton: {
      marginRight: 0,
      marginLeft: windowWidth(2.5),
    },
    searchInput: {
      minHeight: windowHeight(6),
      fontSize: fontSizes.FONT4,
      fontFamily: appFonts.regular,
      borderRadius: windowWidth(3),
      borderWidth: 1.4,
      paddingHorizontal: windowWidth(4),
      borderColor: isDark ? appColors.darkborder : appColors.border,
      backgroundColor: isDark ? appColors.darkThemeSub : appColors.white,
      color: isDark ? appColors.white : appColors.primaryFont,
    },
    sectionTitle: {
      fontFamily: appFonts.bold,
      fontSize: fontSizes.FONT3HALF,
      color: appColors.primary,
    },
    countryName: {
      fontFamily: appFonts.regular,
      fontSize: fontSizes.FONT3HALF,
    },
    callingCode: {
      fontFamily: appFonts.medium,
      fontSize: fontSizes.FONT3HALF,
    },
    dragHandleIndicator: {
      backgroundColor: appColors.primary,
    },
    alphabetLetterTextActive: {
      color: appColors.primary,
    },
  },
})
