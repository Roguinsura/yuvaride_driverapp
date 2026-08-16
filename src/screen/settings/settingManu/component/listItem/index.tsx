import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

import Icons from '../../../../../utils/icons/icons'
import styles from './styles'
import ListItemProps from './type'
import { useValues } from '../../../../../utils/context'
import appColors from '../../../../../theme/appColors'

export function ListItem({
  icon,
  text,
  onPress,
  backgroundColor,
  color,
  showNextIcon,
  dot,
}: ListItemProps) {
  const { colors } = useTheme()
  const { viewRtlStyle, textRtlStyle } = useValues()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.main, { flexDirection: viewRtlStyle }]}
    >
      <View style={[styles.alignment, { flexDirection: viewRtlStyle }]}>
        <View
          style={[
            styles.iconContain,
            { backgroundColor: backgroundColor || colors.background },
          ]}
        >
          {/* Anchored to the chip's corner instead of the old fixed
              bottom: 20 / right: 10, which drifted with the chip size. */}
          {dot ? <View style={styles.dot} /> : null}
          {icon}
        </View>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            { color: color || colors.text, textAlign: textRtlStyle },
          ]}
        >
          {text}
        </Text>
      </View>
      {showNextIcon ? <Icons.NextLarge color={appColors.iconColor} /> : null}
    </TouchableOpacity>
  )
}
