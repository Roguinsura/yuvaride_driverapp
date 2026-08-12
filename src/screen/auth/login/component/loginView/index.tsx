import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles'
import brandColors from '../../../../../theme/brandColors'
import images from '../../../../../utils/images/images'
import LoginViewProps from '../../types'
import { useFocusEffect } from '@react-navigation/native'
import { useValues } from '../../../../../utils/context'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../../api/store'
import {
  taxidosettingDataGet,
  translateDataGet,
} from '../../../../../api/store/action'
import {
  validateEmail,
  ValidatePhoneNumber,
} from '../../../../../utils/validation'
import CountrySelect from 'react-native-country-select'

export function LoginView({
  gotoOTP,
  phoneNumber,
  setPhoneNumber,
  setCountryCode,
  borderColor,
  setCca2,
  driverLoading,
  setDriverLoading,

  fleetLoading,
  setFleetLoading,
  gotoOTPFleet,
  countryCode,
}: LoginViewProps) {
  const [error, setError] = useState('')
  const [numberShow, setNumberShow] = useState(true)
  const [pickerVisible, setPickerVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  // Which account the entered phone/email belongs to. Replaces the old pair of
  // Driver / Fleet submit buttons — same field, one submit, tab picks the API.
  const [accountType, setAccountType] = useState<'driver' | 'fleet'>('driver')
  const { textRtlStyle, viewRtlStyle, isDark } = useValues()
  const dispatch = useDispatch<AppDispatch>()
  const { translateData, taxidoSettingData } = useSelector(
    (state: any) => state.setting,
  )

  useEffect(() => {
    const code = taxidoSettingData?.cabbooking_values?.ride?.country_code
    if (code && setCountryCode) {
      setCountryCode(`+${code}`)
    }
  }, [taxidoSettingData])

  useFocusEffect(
    useCallback(() => {
      dispatch(translateDataGet())
      dispatch(taxidosettingDataGet())
    }, [dispatch]),
  )

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value)
    setNumberShow(/^\d+$/.test(value))
  }

  // Driver and Fleet previously had their own near-identical copy of this. The
  // validation is the same for both — only the endpoint the tab points at
  // differs — so it lives in one place now.
  const handleSubmit = async () => {
    const isDriver = accountType === 'driver'
    const setLoading = isDriver ? setDriverLoading : setFleetLoading

    setLoading?.(true)

    const isNumeric = /^\d+$/.test(phoneNumber)
    let msg = ''

    if (isNumeric) {
      msg = ValidatePhoneNumber(phoneNumber)
    } else if (phoneNumber.includes('@')) {
      msg = validateEmail(phoneNumber)
    } else {
      msg = translateData?.validPhoneEmail
    }

    if (msg) {
      setError(msg)
      setLoading?.(false)
      return
    }

    setError('')

    if (isDriver) {
      await gotoOTP('driver')
    } else {
      await gotoOTPFleet('fleet')
    }
  }

  const selectTab = (type: 'driver' | 'fleet') => {
    setAccountType(type)
    // A "not a valid phone/email" message from the previous tab is not about
    // the tab the user just switched to.
    setError('')
  }

  const titleColor = isDark ? brandColors.titleDark : brandColors.titleLight
  const bodyColor = isDark ? brandColors.bodyDark : brandColors.bodyLight
  const idleBorder = isDark
    ? brandColors.borderDark
    : borderColor || brandColors.borderLight
  const anyLoading = driverLoading || fleetLoading

  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: isDark
            ? brandColors.cardDark
            : brandColors.cardLight,
        },
      ]}
    >
      <View style={styles.logoWrap}>
        <Image
          source={images.brandLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark
              ? brandColors.cardDark
              : brandColors.cardLight,
            borderColor: isDark
              ? brandColors.borderDark
              : brandColors.borderLight,
          },
        ]}
      >
        <View
          style={[
            styles.tabsTrack,
            {
              flexDirection: viewRtlStyle,
              backgroundColor: isDark
                ? brandColors.fieldDark
                : brandColors.fieldLight,
            },
          ]}
        >
          {(['driver', 'fleet'] as const).map(type => {
            const active = accountType === type
            return (
              <TouchableOpacity
                key={type}
                style={[
                  styles.tab,
                  active && { backgroundColor: brandColors.primary },
                ]}
                activeOpacity={0.8}
                disabled={anyLoading}
                onPress={() => selectTab(type)}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: active ? brandColors.onPrimary : bodyColor },
                  ]}
                >
                  {type === 'driver'
                    ? translateData?.driver
                    : translateData?.fleet}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <Text
          style={[
            styles.screenTitle,
            { color: titleColor, textAlign: textRtlStyle },
          ]}
        >
          {translateData?.authTitle}
        </Text>
        <Text
          style={[
            styles.screenSubtitle,
            { color: bodyColor, textAlign: textRtlStyle },
          ]}
        >
          {translateData?.subTitle}
        </Text>

        <Text
          style={[
            styles.fieldLabel,
            { color: titleColor, textAlign: textRtlStyle },
          ]}
        >
          {translateData?.enterPhoneandEmailBoth}
        </Text>

        <View
          style={[
            styles.fieldShell,
            {
              flexDirection: viewRtlStyle,
              backgroundColor: isDark
                ? brandColors.fieldDark
                : isFocused
                  ? brandColors.cardLight
                  : brandColors.fieldLight,
              borderColor: isFocused ? brandColors.primary : idleBorder,
            },
          ]}
        >
          {numberShow && (
            <>
              <TouchableOpacity
                style={styles.countryCode}
                onPress={() => setPickerVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={[styles.codeText, { color: titleColor }]}>
                  {`+${countryCode}`}
                </Text>
              </TouchableOpacity>
              <View
                style={[styles.fieldDivider, { backgroundColor: idleBorder }]}
              />
            </>
          )}

          <TextInput
            style={[
              styles.input,
              { color: titleColor, textAlign: textRtlStyle },
            ]}
            // Label above the field already carries this copy — repeating it as
            // a placeholder just prints the same sentence twice.
            placeholder=""
            placeholderTextColor={bodyColor}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {error ? (
          <Text style={[styles.errorText, { textAlign: textRtlStyle }]}>
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[styles.cta, anyLoading && styles.ctaDisabled]}
          activeOpacity={0.85}
          disabled={anyLoading}
          onPress={handleSubmit}
        >
          {anyLoading ? (
            <ActivityIndicator color={brandColors.onPrimary} />
          ) : (
            <Text style={styles.ctaText}>
              {translateData?.proceed || translateData?.submit || 'Continue'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {pickerVisible && (
        <CountrySelect
          visible={pickerVisible}
          onSelect={country => {
            const callingCode = country.idd.root + (country.idd.suffixes[0] || '')
            setCountryCode?.(callingCode.replace('+', ''))
            setCca2?.(country.cca2)
            setPickerVisible(false)
            setIsFocused(false)
          }}
          onClose={() => {
            setPickerVisible(false)
            setIsFocused(false)
          }}
          theme={isDark ? 'dark' : 'light'}
          modalType="bottomSheet"
        />
      )}
    </View>
  )
}
