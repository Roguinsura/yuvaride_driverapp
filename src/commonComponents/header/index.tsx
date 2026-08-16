import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { BackButton } from '../backButtonHeader'
import { useValues } from '../../utils/context'
import appColors from '../../theme/appColors'
import styles from './styles'

interface HeaderProps {
  title?: string
  backgroundColor?: string
  /*
    'brand' paints the bar in the YuvaRide orange so the settings sub-screens
    carry the same header as the Settings, Dashboard and My Rides tabs.
    Orange applies in light mode only — in dark mode a bright band on a dark
    page reads as an error, so the themed surface is kept and `backgroundColor`
    (where a screen passes one) still wins there.
  */
  variant?: 'default' | 'brand'
}

export function Header({
  title,
  backgroundColor,
  variant = 'default',
}: HeaderProps): React.ReactElement {
  const { colors } = useTheme()
  const { viewRtlStyle, isDark } = useValues()

  const isBrand = variant === 'brand' && !isDark
  const barColor = isBrand ? appColors.primary : backgroundColor ?? colors.card
  const titleColor = isBrand ? appColors.white : colors.text

  return (
    <>
      {/*
        The bar is dark in dark mode and orange in light mode, so the system
        icons are white either way. Only declared for the brand variant — the
        default headers keep whatever the screen sets for itself.
      */}
      {variant === 'brand' && (
        <StatusBar barStyle="light-content" backgroundColor={barColor} />
      )}
      <View
        style={[
          styles.header,
          {
            backgroundColor: barColor,
            flexDirection: viewRtlStyle,
          },
        ]}
      >
        <BackButton
          color={isBrand ? appColors.white : undefined}
          backgroundColor={isBrand ? 'rgba(255,255,255,0.18)' : undefined}
          borderColor={isBrand ? 'rgba(255,255,255,0.35)' : undefined}
        />
        <View style={styles.headerTitle}>
          <Text style={[styles.activeRide, { color: titleColor }]}>
            {title}
          </Text>
        </View>
      </View>
    </>
  )
}
