import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import Icons from '../../../../../utils/icons/icons'
import styles from './styles'
import appColors from '../../../../../theme/appColors'
import { useValues } from '../../../../../utils/context'
import { RootStackParamList } from '../../../../../navigation/main/types'

type navigation = NativeStackNavigationProp<RootStackParamList>

const FALLBACK = {
  settings: 'Settings',
  subtitle: 'Account, documents and preferences',
}

export function SettingHeader() {
  const { viewRtlStyle, textRtlStyle, isDark } = useValues()
  const { navigate } = useNavigation<navigation>()
  const { translateData } = useSelector((state: any) => state.setting)

  // Brand orange in light mode only. In dark mode the bar takes the same dark
  // surface the inner pages use, matching the shared Header's rule.
  const headerBg = isDark ? appColors.darkThemeSub : appColors.primary
  const chipBorder = isDark ? appColors.darkborder : appColors.greenborder

  const gotoNotification = () => navigate('Notification')
  const myWallet = () => navigate('MyWallet')

  return (
    <View style={[styles.main, { backgroundColor: headerBg }]}>
      <View style={[styles.row, { flexDirection: viewRtlStyle }]}>
        <View>
          <Text
            style={[
              styles.title,
              { color: appColors.white, textAlign: textRtlStyle },
            ]}
          >
            {translateData?.settings || FALLBACK.settings}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: 'rgba(255,255,255,0.82)', textAlign: textRtlStyle },
            ]}
          >
            {FALLBACK.subtitle}
          </Text>
        </View>

        <View style={[styles.actions, { flexDirection: viewRtlStyle }]}>
          <TouchableOpacity
            onPress={gotoNotification}
            style={[styles.iconView, { borderColor: chipBorder }]}
            activeOpacity={0.7}
          >
            <Icons.Notification color={appColors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={myWallet}
            style={[styles.iconView, { borderColor: chipBorder }]}
            activeOpacity={0.7}
          >
            <Icons.WalletSetting color={appColors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
