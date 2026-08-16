import { TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from '../../utils/icons/icons'
import { useNavigation, useTheme } from '@react-navigation/native'
import commanStyles from '../../style/commanStyles'
import { useValues } from '../../utils/context'
import appColors from '../../theme/appColors'

interface BackButtonProps {
  /* Arrow colour. Defaults to the theme text colour. */
  color?: string
  /* Chip fill. Defaults to the theme card colour. */
  backgroundColor?: string
  borderColor?: string
}

export function BackButton({
  color,
  backgroundColor,
  borderColor,
}: BackButtonProps): React.ReactElement {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { isDark } = useValues()
  const gotoBack = () => {
    navigation.goBack()
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={gotoBack}
      style={[
        commanStyles.backButtonMain,
        {
          backgroundColor: backgroundColor ?? colors.card,
          borderColor:
            borderColor ?? (isDark ? appColors.darkborder : appColors.border),
        },
      ]}
    >
      <Icons.Back color={color ?? colors.text} />
    </TouchableOpacity>
  )
}
