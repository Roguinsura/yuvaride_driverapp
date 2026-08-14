import { View, Text, TouchableOpacity, ScrollView, Share } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import React from 'react'
import { useSelector } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard'
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
  Circle,
} from 'react-native-svg'

import appColors from '../../../../theme/appColors'
import brandColors from '../../../../theme/brandColors'
import { useAppNavigation } from '../../../../utils/navigation'
import { useValues } from '../../../../utils/context'
import Icons from '../../../../utils/icons/icons'
import { Header, notificationHelper } from '../../../../commonComponents'
import styles, { HERO_WIDTH, HERO_HEIGHT } from './styles'

const FALLBACK = {
  header: 'Earn money',
  kicker: 'Invite a friend and earn',
  yourCode: 'Your referral code',
  copied: 'Referral code copied',
  howItWorks: 'How it works',
  terms: 'Terms & conditions',
  yourReferrals: 'Your referrals',
  viewAll: 'View all',
  share: 'Share your code',
  note: 'Note:',
}

export function ReferralHome() {
  const { viewRtlStyle, textRtlStyle, isDark } = useValues()
  const { selfDriver } = useSelector((state: any) => state.account)
  const { taxidoSettingData, translateData } = useSelector(
    (state: any) => state.setting,
  )
  const { zoneValue } = useSelector((state: any) => state.zoneUpdate)
  const { navigate }: any = useAppNavigation()

  const pageBg = isDark ? appColors.bgDark : appColors.graybackground
  const cardBg = isDark ? appColors.darkThemeSub : appColors.white
  const borderColor = isDark ? appColors.darkborder : appColors.border
  const titleColor = isDark ? appColors.white : brandColors.titleLight
  const bodyColor = isDark ? appColors.darkText : brandColors.bodyLight

  const referral = taxidoSettingData?.cabbooking_values?.referral
  const currency = zoneValue?.currency_symbol ?? ''
  const referralAmount = referral?.referral_amount ?? 0
  const referralCode = selfDriver?.referral_code || ''

  const steps = [
    translateData?.referralTerm1,
    `${translateData?.referralEarn ?? ''} ${
      referral?.referrer_bonus_percentage ?? 0
    }% ${translateData?.referralTerm2 ?? ''}`.trim(),
    translateData?.referralTerm3,
  ]

  const gotoList = () => navigate('ReferralList')

  const copyCode = () => {
    if (!referralCode) return
    Clipboard.setString(referralCode)
    // The old version copied silently, so there was no way to tell it worked.
    notificationHelper(
      '',
      translateData?.copied || FALLBACK.copied,
      'success',
    )
  }

  /*
    The link was hardcoded to com.taxidouserui — Taxido's own Play Store id, so
    every referral sent people to their app. It now uses this build's package
    id. Note the original pointed at Taxido's *rider* app: if referrals are
    meant to invite riders rather than drivers, this needs the YuvaRide rider
    app's package id instead.
  */
  const handleShareReferral = async () => {
    try {
      const message = `${translateData?.referralShare1 ?? ''} *${referralCode}* ${
        translateData?.referralShare2 ?? ''
      }\n\n ${
        translateData?.referralShare3 ?? ''
      }\n👉 https://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}&hl=en_IN`

      await Share.share({ message, title: 'Invite to YuvaRide' })
    } catch (error) {}
  }

  return (
    <View style={[styles.screen, { backgroundColor: pageBg }]}>
      <Header variant="brand" title={translateData?.referralHeader || FALLBACK.header} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- hero ---------- */}
        {/*
          Replaces the referral.png banner with its absolutely-positioned
          overlay text. Drawn, so it follows the brand and the copy can never
          drift out of the artwork.
        */}
        <View style={styles.hero}>
          <Svg
            style={{ position: 'absolute', top: 0, left: 0 }}
            width={HERO_WIDTH}
            height={HERO_HEIGHT}
          >
            <Defs>
              <SvgLinearGradient id="referralHero" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={brandColors.primary} />
                <Stop offset="1" stopColor={brandColors.primaryPressed} />
              </SvgLinearGradient>
            </Defs>
            <Rect
              x={0}
              y={0}
              width={HERO_WIDTH}
              height={HERO_HEIGHT}
              fill="url(#referralHero)"
            />
            <Circle
              cx={HERO_WIDTH * 0.9}
              cy={-HERO_HEIGHT * 0.08}
              r={HERO_HEIGHT * 0.42}
              fill="rgba(255,255,255,0.10)"
            />
            <Circle
              cx={HERO_WIDTH * 0.08}
              cy={HERO_HEIGHT * 1.02}
              r={HERO_HEIGHT * 0.45}
              fill="rgba(255,255,255,0.08)"
            />
          </Svg>

          <View>
            <Text style={[styles.heroKicker, { textAlign: textRtlStyle }]}>
              {translateData?.referralEarn || FALLBACK.kicker}
            </Text>
            <Text style={[styles.heroAmount, { textAlign: textRtlStyle }]}>
              {currency}
              {referralAmount}
            </Text>
            <Text style={[styles.heroSub, { textAlign: textRtlStyle }]}>
              {translateData?.referralFirst}
            </Text>
          </View>

          <View>
            <Text style={[styles.codeLabel, { textAlign: textRtlStyle }]}>
              {translateData?.yourCode || FALLBACK.yourCode}
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={copyCode}
              style={[styles.codePill, { flexDirection: viewRtlStyle }]}
            >
              <Text numberOfLines={1} style={styles.codeText}>
                {referralCode}
              </Text>
              <Icons.Copy color={appColors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ---------- how it works ---------- */}
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
          <View style={[styles.cardHead, { flexDirection: viewRtlStyle }]}>
            <Text style={[styles.que, { color: titleColor }]}>
              {translateData?.referralWork || FALLBACK.howItWorks}
            </Text>
            <Text style={styles.trems}>
              {translateData?.referralTC || FALLBACK.terms}
            </Text>
          </View>

          {steps.map((step, index) => (
            <View
              key={index}
              style={[styles.stepRow, { flexDirection: viewRtlStyle }]}
            >
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text
                style={[
                  styles.stepText,
                  { color: bodyColor, textAlign: textRtlStyle },
                ]}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* ---------- note ---------- */}
        <View style={styles.noteBox}>
          <Text style={[styles.note, { color: '#8A4B00', textAlign: textRtlStyle }]}>
            <Text style={{ fontWeight: '700' }}>
              {translateData?.referralNote || FALLBACK.note}{' '}
            </Text>
            {translateData?.referralNoteData}
          </Text>
        </View>

        {/* ---------- your referrals ---------- */}
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
          <View style={[styles.listRow, { flexDirection: viewRtlStyle }]}>
            <View
              style={[
                styles.listIcon,
                {
                  backgroundColor: isDark
                    ? 'rgba(248,111,0,0.18)'
                    : brandColors.primarySoft,
                },
              ]}
            >
              <Icons.Referral color={appColors.primary} />
            </View>
            <View style={styles.listTextWrap}>
              <Text
                style={[
                  styles.que,
                  { color: titleColor, textAlign: textRtlStyle },
                ]}
              >
                {translateData?.referralTitle || FALLBACK.yourReferrals}
              </Text>
              <Text
                style={[
                  styles.des1,
                  { color: bodyColor, textAlign: textRtlStyle },
                ]}
              >
                {translateData?.referralDescription}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.viewButton}
            onPress={gotoList}
          >
            <Text style={styles.text}>
              {translateData?.referralViewAll || FALLBACK.viewAll}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleShareReferral}
        style={styles.shareButton}
      >
        <Text style={styles.shareText}>
          {translateData?.referralShare || FALLBACK.share}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
