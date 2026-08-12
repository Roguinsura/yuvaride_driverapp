import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import Animated from 'react-native-reanimated'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { Header } from '../../../commonComponents'
import appColors from '../../../theme/appColors'
import brandColors from '../../../theme/brandColors'
import Icons from '../../../utils/icons/icons'
import styles, { CARD_HEIGHT } from './styles'
import { useValues } from '../../../utils/context'
import { windowHeight, windowWidth } from '../../../theme/appConstant'

const FALLBACK = {
  planDetails: 'Subscription',
  month: 'month',
  selectPlan: 'Choose plan',
  currentPlan: 'Current plan',
  noFeatures: 'No features listed for this plan.',
}

export function Subscription() {
  const width = Dimensions.get('window').width
  const { colors } = useTheme()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const { viewRtlStyle, textRtlStyle, rtl, isDark } = useValues()
  const { planData, translateData } = useSelector((state: any) => state.setting)
  const { zoneValue } = useSelector((state: any) => state.zoneUpdate)
  const { selfDriver } = useSelector((state: any) => state.account)
  const navigation = useNavigation<any>()

  const pageBg = isDark ? appColors.bgDark : appColors.graybackground
  const cardBg = isDark ? appColors.darkThemeSub : appColors.white
  const borderColor = isDark ? appColors.darkborder : appColors.border
  const titleColor = isDark ? appColors.white : brandColors.titleLight
  const bodyColor = isDark ? appColors.darkText : brandColors.bodyLight

  // `zoneValue` is an empty array until the zone lookup resolves, so
  // `exchange_rate` is undefined and `undefined * price` produced NaN — which
  // is what rendered on the card. Both halves now have a defined fallback.
  const currency = zoneValue?.currency_symbol ?? ''
  const exchangeRate = Number(zoneValue?.exchange_rate) || 1

  const sortedPlanData = React.useMemo(() => {
    if (!Array.isArray(planData?.data)) return []
    return [...planData.data].sort(
      (a: any, b: any) => Number(a.price) - Number(b.price),
    )
  }, [planData])

  const gotopayment = (planId: number) => {
    navigation.navigate('PaymentSelect', { planId })
  }

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack()
        return true
      }
      return false
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [navigation])

  const renderItem = ({ item }: any) => {
    // Emphasis follows meaning, not position. The card used to be gray or
    // solid orange depending on `index % 2` after sorting, so adding a cheaper
    // plan flipped the colour of every card in the list.
    const isCurrentPlan =
      selfDriver?.subscription?.is_active === 1 &&
      selfDriver?.subscription?.plan_id === item.id

    const price = (exchangeRate * (Number(item?.price) || 0)).toFixed(0)

    // Defensive: a plan whose description comes back as a string rather than
    // an array would otherwise take the whole screen down on .map().
    const features = Array.isArray(item?.description)
      ? item.description
      : item?.description
        ? [item.description]
        : []

    return (
      <Animated.View
        style={[
          styles.item,
          {
            backgroundColor: isCurrentPlan
              ? isDark
                ? 'rgba(248,111,0,0.10)'
                : brandColors.primarySoft
              : cardBg,
            borderColor: isCurrentPlan ? appColors.primary : borderColor,
          },
        ]}
      >
        <View
          style={[
            styles.planHead,
            {
              backgroundColor: isCurrentPlan
                ? isDark
                  ? 'rgba(248,111,0,0.16)'
                  : '#FFEFE1'
                : isDark
                  ? 'rgba(255,255,255,0.04)'
                  : '#FFF8F2',
              borderBottomColor: isCurrentPlan
                ? brandColors.primaryBorder
                : borderColor,
            },
          ]}
        >
          <View style={[styles.headRow, { flexDirection: viewRtlStyle }]}>
            <Text
              numberOfLines={1}
              style={[styles.itemText, { color: titleColor }]}
            >
              {item?.name?.toUpperCase()}
            </Text>
            {isCurrentPlan && (
              <View style={styles.currentPill}>
                <Text style={styles.currentPillText}>
                  {translateData?.currentPlan || FALLBACK.currentPlan}
                </Text>
              </View>
            )}
          </View>

          {/* Short brand rule under the name. */}
          <View
            style={[
              styles.nameAccent,
              { alignSelf: rtl ? 'flex-end' : 'flex-start' },
            ]}
          />

          <View style={[styles.priceRow, { flexDirection: viewRtlStyle }]}>
            <Text style={[styles.price, { color: appColors.primary }]}>
              {currency}
              {price}
            </Text>
            <Text style={styles.type}>
              /{translateData?.month || FALLBACK.month}
            </Text>
          </View>
        </View>

        <View style={{ height: windowHeight(2.2) }} />

        <ScrollView
          style={styles.featureList}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {features.length === 0 ? (
            <Text style={[styles.emptyFeature, { textAlign: textRtlStyle }]}>
              {FALLBACK.noFeatures}
            </Text>
          ) : (
            features.map((feature: any, idx: number) => (
              <View
                key={idx}
                style={[styles.featureRow, { flexDirection: viewRtlStyle }]}
              >
                {/*
                  Both props used to receive the same colour, so the tick was
                  drawn in the shield's own colour and was invisible. Orange
                  shield, white tick.
                */}
                <Icons.ShildTik
                  background={appColors.primary}
                  tik={appColors.white}
                />
                <Text
                  style={[
                    styles.features,
                    { color: bodyColor, textAlign: textRtlStyle },
                  ]}
                >
                  {feature}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => (isCurrentPlan ? null : gotopayment(item.id))}
          disabled={isCurrentPlan}
          style={[
            styles.selectBtn,
            isCurrentPlan
              ? {
                  backgroundColor: 'transparent',
                  borderWidth: 1.5,
                  borderColor: appColors.primary,
                }
              : { backgroundColor: appColors.primary },
          ]}
        >
          <Text
            style={[
              styles.bottomNote,
              { color: isCurrentPlan ? appColors.primary : appColors.white },
            ]}
          >
            {isCurrentPlan
              ? translateData?.currentPlan || FALLBACK.currentPlan
              : translateData?.selectPlan || FALLBACK.selectPlan}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <View style={[styles.MainContainer, { backgroundColor: pageBg }]}>
      <Header
        title={translateData?.planDetails || FALLBACK.planDetails}
        backgroundColor={cardBg}
      />

      <View style={styles.planTitleContainer}>
        <Text style={[styles.planTitle, { color: titleColor }]}>
          {translateData?.subscriptionTitle}
        </Text>
        <Text style={styles.planHeading}>
          {translateData?.subscriptionMsg}
        </Text>
      </View>

      <View style={styles.container}>
        <Carousel
          width={width}
          height={CARD_HEIGHT}
          data={sortedPlanData}
          renderItem={renderItem}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.88,
            parallaxScrollingOffset: 60,
          }}
          loop={false}
          onSnapToItem={index => setCurrentIndex(index)}
        />

        {sortedPlanData.length > 1 && (
          <View style={styles.dots}>
            {sortedPlanData.map((_: any, index: number) => {
              const active = index === currentIndex
              return (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      width: active ? windowWidth(5) : windowWidth(2),
                      backgroundColor: active
                        ? appColors.primary
                        : isDark
                          ? appColors.darkborder
                          : brandColors.primaryBorder,
                    },
                  ]}
                />
              )
            })}
          </View>
        )}
      </View>

      <View
        style={[
          styles.noteContainer,
          {
            backgroundColor: cardBg,
            borderTopWidth: 1,
            borderTopColor: borderColor,
          },
        ]}
      >
        <Text style={[styles.note, { color: bodyColor }]}>
          {translateData?.subscriptionNote}
        </Text>
      </View>
    </View>
  )
}
