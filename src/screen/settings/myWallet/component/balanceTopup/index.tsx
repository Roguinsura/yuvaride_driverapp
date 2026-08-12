import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
  Circle,
} from 'react-native-svg'

import styles, { CARD_WIDTH, CARD_HEIGHT } from './styles'
import { RootStackParamList } from '../../../../../navigation/main/types'
import appColors from '../../../../../theme/appColors'
import brandColors from '../../../../../theme/brandColors'
import Icons from '../../../../../utils/icons/icons'
import { notificationHelper } from '../../../../../commonComponents'
import { useValues } from '../../../../../utils/context'

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

interface BalanceTopupProps {
  walletTypedata: number
  handleButtonPress?: any
  activeTab?: any
}

const FALLBACK = {
  availableBalance: 'Available balance',
  topUp: 'Top up',
  withdraw: 'Withdraw',
  balanceOf: 'Balance as of',
}

export function BalanceTopup({ walletTypedata }: BalanceTopupProps) {
  const navigation = useNavigation<NavigationProps>()
  const { taxidoSettingData, translateData } = useSelector(
    (state: any) => state.setting,
  )
  const { zoneValue } = useSelector((state: any) => state.zoneUpdate)
  const { selfDriver } = useSelector((state: any) => state.account)
  const { viewRtlStyle, textRtlStyle } = useValues()
  const [isVisible, setIsVisible] = useState(true)

  // `zoneValue` starts life as an empty array, so the symbol is undefined until
  // the zone lookup resolves — and a template literal prints that as the string
  // "undefined", which is where "undefined0.00" came from.
  const currency = zoneValue?.currency_symbol ?? ''
  const balance = Number(walletTypedata) || 0
  const rawAmount = `${currency}${balance.toFixed(2)}`

  const maskNumber = (amount: string): string => {
    const numericPart = amount.replace(/[^0-9.]/g, '')
    const masked = numericPart.replace(/[0-9]/g, '*')
    return `${currency} ${masked}`.trim()
  }
  const maskedAmount = maskNumber(rawAmount)

  const gotoTopWithDraw = () => {
    const minWithdraw =
      taxidoSettingData?.cabbooking_values?.driver_commission
        ?.min_withdraw_amount

    if (balance >= minWithdraw) {
      navigation.navigate('TopupWallet')
    } else {
      const rate = Number(zoneValue?.exchange_rate) || 1
      notificationHelper(
        '',
        `${translateData?.minimumAmount} ${currency}${(
          rate * (Number(minWithdraw) || 0)
        ).toFixed(2)}.`,
        'error',
      )
    }
  }

  const gotoTopUp = () => navigation.navigate('TopUp')

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const canWithdraw = balance > 0

  return (
    <View style={styles.mainBalance}>
      <View style={styles.card}>
        {/*
          The card used to be a stretched PNG (cardBackground) that was still
          in the old green palette. It is drawn now, so it follows the brand
          and stays sharp at any size.
        */}
        <Svg
          style={StyleSheet.absoluteFill}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
        >
          <Defs>
            <SvgLinearGradient id="walletCard" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={brandColors.primary} />
              <Stop offset="1" stopColor={brandColors.primaryPressed} />
            </SvgLinearGradient>
          </Defs>
          <Rect
            x={0}
            y={0}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            fill="url(#walletCard)"
          />
          <Circle
            cx={CARD_WIDTH * 0.88}
            cy={-CARD_HEIGHT * 0.1}
            r={CARD_HEIGHT * 0.45}
            fill="rgba(255,255,255,0.10)"
          />
          <Circle
            cx={CARD_WIDTH * 0.1}
            cy={CARD_HEIGHT * 1.05}
            r={CARD_HEIGHT * 0.5}
            fill="rgba(255,255,255,0.08)"
          />
        </Svg>

        <View>
          <View style={[styles.topRow, { flexDirection: viewRtlStyle }]}>
            <Text style={[styles.balanceTitle, { textAlign: textRtlStyle }]}>
              {translateData?.availableBalance || FALLBACK.availableBalance}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsVisible(prev => !prev)}
              style={styles.eyeButton}
            >
              {isVisible ? (
                <Icons.Eye />
              ) : (
                <Icons.EyeClose color={appColors.white} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            numberOfLines={1}
            style={[styles.totalBalance, { textAlign: textRtlStyle }]}
          >
            {isVisible ? rawAmount : maskedAmount}
          </Text>
        </View>

        <View style={[styles.actions, { flexDirection: viewRtlStyle }]}>
          {selfDriver?.role == 'driver' && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={gotoTopUp}
              style={[styles.actionButton, { flexDirection: viewRtlStyle }]}
            >
              <Icons.TopUp />
              <Text style={styles.actionText}>
                {translateData?.topUp || FALLBACK.topUp}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={gotoTopWithDraw}
            disabled={!canWithdraw}
            style={[
              styles.actionButton,
              { flexDirection: viewRtlStyle, opacity: canWithdraw ? 1 : 0.5 },
            ]}
          >
            <Icons.DollorLarge />
            <Text style={styles.actionText}>
              {translateData?.topupWallet || FALLBACK.withdraw}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footerDate}>
        {translateData?.balanceOf || FALLBACK.balanceOf} {formattedDate}
      </Text>
    </View>
  )
}
