import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Swiper from 'react-native-swiper'
import appColors from '../../../theme/appColors'
import { styles, BRAND } from './styles'
import {
  useNavigation,
  useTheme,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/main/types'
import { useValues } from '../../../utils/context'
import Icons from '../../../utils/icons/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  languageDataGet,
  settingDataGet,
  taxidosettingDataGet,
  translateDataGet,
} from '../../../api/store/action'
import { setValue } from '../../../utils/localstorage'
import { AppDispatch } from '../../../api/store'
import AsyncStorage from '@react-native-async-storage/async-storage'

type OnboardingProps = NativeStackNavigationProp<RootStackParamList>

export function OnBoarding() {
  const { navigate } = useNavigation<OnboardingProps>()
  const { colors } = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const swiperRef = useRef<Swiper | null>(null)

  const { settingData, languageData, translateData, taxidoSettingData } =
    useSelector((state: any) => state.setting)

  const { isDark, viewRtlStyle, textRtlStyle, setRtl } = useValues()

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (languageData?.data?.length) {
      const formattedItems = languageData?.data.map((lang: any) => ({
        label: lang.name,
        value: lang.locale,
      }))

      if (!selectedLanguage) {
        const firstLang =
          settingData?.values?.general?.default_language?.locale ||
          formattedItems[0]?.value

        setSelectedLanguage(firstLang)
        handleLanguageChange(firstLang)
      }
    }
  }, [languageData])

  const handleLanguageChange = async (value: string | null) => {
    if (!value) return

    if (value === 'ar') {
      setRtl(true)
      await AsyncStorage.setItem('rtl', JSON.stringify(true))
    } else {
      setRtl(false)
      await AsyncStorage.setItem('rtl', JSON.stringify(false))
    }

    setSelectedLanguage(value)
    await setValue('selectedLanguage', value)

    dispatch(settingDataGet())
    dispatch(translateDataGet())
    dispatch(taxidosettingDataGet())
  }

  const onboardingData = taxidoSettingData?.cabbooking_values?.onboarding || []

  const handleNavigation = () => {
    navigate('Login')
  }

  // Slide changes only move the pager. Navigation happens on an explicit tap —
  // previously this auto-jumped to Login the moment you swiped onto index 2,
  // which made the last slide unreadable and broke if the admin panel ever
  // served a number of slides other than three.
  const handleIndexChanged = (index: number) => {
    setActiveIndex(index)
  }

  const handleNext = (index: number) => {
    if (index < onboardingData.length - 1) {
      swiperRef.current?.scrollBy(1)
    } else {
      handleNavigation()
    }
  }

  if (!onboardingData.length) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />
  }

  return (
    <SafeAreaView style={[styles.slide, { backgroundColor: colors.background }]}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={handleIndexChanged}
      >
        {onboardingData.map((slide: any, index: number) => {
          const isLast = index === onboardingData.length - 1

          return (
            <View key={slide.key || index} style={styles.slide}>
              <View style={styles.skipWrap}>
                <TouchableOpacity activeOpacity={0.7} onPress={handleNavigation}>
                  <Text
                    style={[
                      styles.skipText,
                      {
                        backgroundColor: isDark
                          ? appColors.darkThemeSub
                          : appColors.graybackground,
                      },
                    ]}
                  >
                    {translateData?.skip || 'Skip'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/*
                Language picker intentionally disabled for now — restore this
                block (plus the DropDownPicker import, `items`/`open`/`loading`
                state and handleOpenDropdown) to bring it back. Note languageDataGet
                is only dispatched from here and from Settings, so with this off the
                language defaults to whatever the server sends and is changed in
                Settings instead.

                <View style={[styles.languageContainer, { flexDirection: viewRtlStyle }]}>
                  <DropDownPicker ... />
                </View>
              */}

              <View
                style={[
                  styles.heroArea,
                  {
                    backgroundColor: isDark
                      ? BRAND.heroBgDark
                      : BRAND.heroBgLight,
                  },
                ]}
              >
                <Image
                  style={styles.heroImage}
                  source={{ uri: slide?.onboarding_image_url || '' }}
                  resizeMode="contain"
                />
              </View>

              <View style={[styles.card, { backgroundColor: BRAND.primary }]}>
                <View style={[styles.dotsRow, { flexDirection: viewRtlStyle }]}>
                  {onboardingData.map((_: any, dotIndex: number) => (
                    <View
                      key={dotIndex}
                      style={[
                        styles.dot,
                        dotIndex === activeIndex
                          ? styles.dotActive
                          : styles.dotIdle,
                      ]}
                    />
                  ))}
                </View>

                <Text
                  style={[
                    styles.title,
                    {
                      color: BRAND.onPrimary,
                      textAlign: textRtlStyle,
                    },
                  ]}
                >
                  {slide?.title || ''}
                </Text>

                <Text style={[styles.description, { textAlign: textRtlStyle }]}>
                  {slide?.description || ''}
                </Text>

                <TouchableOpacity
                  style={styles.cta}
                  activeOpacity={0.85}
                  onPress={() => handleNext(index)}
                >
                  <Text style={styles.ctaText}>
                    {isLast
                      ? translateData?.get_started || 'Get Started'
                      : translateData?.next || 'Next'}
                  </Text>
                  <View style={styles.ctaArrow}>
                    <Icons.Back color={BRAND.primary} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </Swiper>
    </SafeAreaView>
  )
}
