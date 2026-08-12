import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import Icons from '../../../../utils/icons/icons'
import appColors from '../../../../theme/appColors'
import styles from './styles'
import { useValues } from '../../../../utils/context'
import { RootStackParamList } from '../../../../navigation/main/types'

type navigation = NativeStackNavigationProp<RootStackParamList>

const FALLBACK = {
  title: 'My Rides',
  subtitle: 'Everything you have driven',
}

export function Header() {
  const { viewRtlStyle, textRtlStyle } = useValues()
  const navigation = useNavigation<navigation>()
  const { translateData } = useSelector((state: any) => state.setting)

  return (
    <View style={[styles.main, { backgroundColor: appColors.primary }]}>
      <View style={[styles.row, { flexDirection: viewRtlStyle }]}>
        <View>
          <Text
            style={[
              styles.title,
              { color: appColors.white, textAlign: textRtlStyle },
            ]}
          >
            {translateData?.titleMyRide || FALLBACK.title}
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
        <TouchableOpacity
          style={[styles.bellButton, { borderColor: appColors.greenborder }]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Notification')}
        >
          <Icons.Notification color={appColors.white} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
