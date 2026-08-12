import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

import styles from './styles'
import { useValues } from '../../../../../utils/context'
import appColors from '../../../../../theme/appColors'
import brandColors from '../../../../../theme/brandColors'

const FALLBACK = {
  light: 'Light',
  dark: 'Dark',
}

// A pair of tappable previews rather than a single switch row: the choice is
// visible before you make it, and the row reads as a setting rather than a
// toggle buried in a list.
export function DarkTheme() {
  const { isDark, setIsDark, viewRtlStyle } = useValues()
  const { translateData } = useSelector((state: any) => state.setting)

  const applyTheme = (dark: boolean) => {
    if (dark === isDark) return
    setIsDark(dark)
    AsyncStorage.setItem('darkTheme', JSON.stringify(dark))
  }

  const options = [
    {
      key: 'light',
      dark: false,
      label: translateData?.light || FALLBACK.light,
      page: '#FFFFFF',
      surface: '#F1F2F4',
      line: '#DDE0E4',
      border: '#E4E7EB',
    },
    {
      key: 'dark',
      dark: true,
      label: translateData?.dark || FALLBACK.dark,
      page: brandColors.pageDark,
      surface: '#2A2A2E',
      line: '#3A3A40',
      border: '#3A3A40',
    },
  ]

  return (
    <View style={[styles.optionsRow, { flexDirection: viewRtlStyle }]}>
      {options.map(option => {
        const active = isDark === option.dark
        return (
          <TouchableOpacity
            key={option.key}
            activeOpacity={0.85}
            onPress={() => applyTheme(option.dark)}
            style={[
              styles.option,
              {
                borderColor: active
                  ? appColors.primary
                  : isDark
                    ? appColors.darkborder
                    : appColors.border,
                backgroundColor: active
                  ? isDark
                    ? 'rgba(248,111,0,0.10)'
                    : brandColors.primarySoft
                  : 'transparent',
              },
            ]}
          >
            <View
              style={[
                styles.preview,
                { backgroundColor: option.page, borderColor: option.border },
              ]}
            >
              <View style={styles.previewBar} />
              <View
                style={[
                  styles.previewLine,
                  { backgroundColor: option.line, width: '80%' },
                ]}
              />
              <View
                style={[
                  styles.previewLine,
                  { backgroundColor: option.line, width: '60%' },
                ]}
              />
              <View
                style={[
                  styles.previewCard,
                  {
                    backgroundColor: option.surface,
                    borderColor: option.border,
                  },
                ]}
              />
            </View>

            <View
              style={[styles.optionFooter, { flexDirection: viewRtlStyle }]}
            >
              <Text
                style={[
                  styles.optionLabel,
                  active && styles.optionLabelActive,
                  {
                    color: active
                      ? appColors.primary
                      : isDark
                        ? appColors.darkText
                        : brandColors.bodyLight,
                  },
                ]}
              >
                {option.label}
              </Text>
              <View
                style={[
                  styles.radioOuter,
                  {
                    borderColor: active
                      ? appColors.primary
                      : isDark
                        ? appColors.darkborder
                        : appColors.border,
                  },
                ]}
              >
                {active ? <View style={styles.radioInner} /> : null}
              </View>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
