import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import Icons from '../../../../utils/icons/icons'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useValues } from '../../../../utils/context/index'

interface RegistrationHeaderProps {
  showBackButton?: boolean
  backgroundColor?: string
}

export function Header({
  showBackButton = true,
  backgroundColor,
}: RegistrationHeaderProps) {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { isDark, viewRtlStyle } = useValues()

  const gotoBack = () => {
    navigation.goBack()
  }

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: backgroundColor },
        { flexDirection: viewRtlStyle },
      ]}
    >
      {showBackButton && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.iconView, { borderColor: colors.border }]}
          onPress={gotoBack}
        >
          <Icons.Back color={colors.text} />
        </TouchableOpacity>
      )}
      <View style={[styles.header, { flexDirection: viewRtlStyle }]}>
        {/*
          Was the Taxido wordmark PNG. Drawn as a pill instead of swapping the
          asset, so the brand is right now rather than waiting on artwork. The
          pill is sized to the old logo's footprint so the header keeps its
          height and the back button keeps its position.
        */}
        <View style={styles.brandPill}>
          <Text style={styles.brandPillText}>YuvaRide</Text>
        </View>
      </View>
    </View>
  )
}
