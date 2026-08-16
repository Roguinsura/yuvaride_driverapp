import React from 'react'
import styles from './styles'
import { Text, View, Image } from 'react-native'
import { useValues } from '../../utils/context'
import brandColors from '../../theme/brandColors'
import Images from '../../utils/images/images'
import { useSelector } from 'react-redux'

// Hardcoded English fallbacks are deliberate. `translateData` is only populated
// by a successful /api/translate call, so on a cold start with no connection it
// is undefined — which is precisely when this screen renders. Reading straight
// through it used to throw and blank the whole app instead of showing the
// message.
const FALLBACK_TITLE = 'No Internet Connection'
const FALLBACK_DETAILS = 'Please check your connection and try again.'

export function NoInternet() {
  const { isDark } = useValues()
  const { translateData } = useSelector((state: any) => state.setting)

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: isDark ? brandColors.pageDark : brandColors.pageLight,
        },
      ]}
    >
      <Image source={Images.noInternet} style={styles.image} />

      <Text
        style={[
          styles.title,
          { color: isDark ? brandColors.titleDark : brandColors.titleLight },
        ]}
      >
        {translateData?.noInternetConnectionText || FALLBACK_TITLE}
      </Text>

      <View style={styles.accent} />

      <Text
        style={[
          styles.details,
          { color: isDark ? brandColors.bodyDark : brandColors.bodyLight },
        ]}
      >
        {translateData?.plzzConnectionCheck || FALLBACK_DETAILS}
      </Text>
    </View>
  )
}
