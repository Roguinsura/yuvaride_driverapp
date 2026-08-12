import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import styles from './styles'
import { useValues } from '../../../../../utils/context'
import { RootStackParamList } from '../../../../../navigation/main/types'
import appColors from '../../../../../theme/appColors'
import brandColors from '../../../../../theme/brandColors'
import { UserContainerLoader } from './userLoader'
import { getValue } from '../../../../../utils/localstorage'
import { selfDriverData } from '../../../../../api/store/action'
import { AppDispatch } from '../../../../../api/store'
import Icons from '../../../../../utils/icons/icons'

type NavigationType = NativeStackNavigationProp<RootStackParamList>

const FALLBACK = {
  guest: 'Guest',
  walletBalance: 'Wallet balance',
}

export function Profile() {
  const { viewRtlStyle, textRtlStyle, isDark } = useValues()
  const { colors } = useTheme()
  const { navigate } = useNavigation<NavigationType>()
  const dispatch = useDispatch<AppDispatch>()
  const { translateData } = useSelector((state: any) => state.setting)
  const { selfDriver } = useSelector((state: any) => state.account)
  const { walletTypedata } = useSelector((state: any) => state.wallet)
  const { zoneValue } = useSelector((state: any) => state.zoneUpdate)
  const [walletLoading, setWalletLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  const char = selfDriver?.name ? selfDriver.name.charAt(0).toUpperCase() : ''

  const titleColor = isDark ? appColors.white : brandColors.titleLight
  const borderColor = isDark ? appColors.darkborder : appColors.border

  useEffect(() => {
    const fetchData = async () => {
      setWalletLoading(true)
      const value = await getValue('token')
      setToken(value)
      setWalletLoading(false)
    }

    fetchData()
  }, [dispatch])

  useEffect(() => {
    dispatch(selfDriverData())
  }, [dispatch])

  const navigationProfile = () => navigate('ProfileSetting')

  // Guarded so a missing rating renders "0.0" rather than an empty chip.
  const rating = Number(selfDriver?.rating_count)
  const safeRating = isFinite(rating) ? rating.toFixed(1) : '0.0'

  // The exchange rate falls back to 1 instead of poisoning the product. It used
  // to be `isNaN(rate * balance) ? 0 : ...`, so an absent rate showed a 0.00
  // balance even when the driver had money in the wallet.
  const exchangeRate = Number(zoneValue?.exchange_rate) || 1
  const walletBalance = Number(walletTypedata?.balance) || 0
  const walletAmount = (exchangeRate * walletBalance).toFixed(2)

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      {walletLoading ? (
        <UserContainerLoader />
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={navigationProfile}
            style={[styles.detainContain, { flexDirection: viewRtlStyle }]}
          >
            <View style={styles.avatarWrap}>
              {selfDriver?.profile_image_url ? (
                <Image
                  source={{ uri: selfDriver?.profile_image_url }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.nameTag}>
                  <Text style={[styles.char, { color: appColors.white }]}>
                    {char}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.details}>
              <Text
                numberOfLines={1}
                style={[
                  styles.name,
                  { color: titleColor, textAlign: textRtlStyle },
                ]}
              >
                {selfDriver?.name || translateData?.guest || FALLBACK.guest}
              </Text>
              {selfDriver?.email ? (
                <Text
                  numberOfLines={1}
                  style={[styles.mail, { textAlign: textRtlStyle }]}
                >
                  {selfDriver?.email}
                </Text>
              ) : null}
            </View>

            {selfDriver?.role !== 'fleet_manager' && (
              <View
                style={[
                  styles.ratingBox,
                  {
                    backgroundColor: isDark
                      ? 'rgba(255,180,0,0.16)'
                      : '#FFF4DC',
                    flexDirection: viewRtlStyle,
                  },
                ]}
              >
                <Icons.Star />
                <Text
                  style={[
                    styles.ratingText,
                    { color: '#B47A00', marginHorizontal: 4 },
                  ]}
                >
                  {safeRating}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: borderColor }]} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.walletContain, { flexDirection: viewRtlStyle }]}
            onPress={() => navigate('MyWallet')}
          >
            <View style={styles.walletIcon}>
              <Icons.WalletSetting color={appColors.primary} />
            </View>
            <View style={styles.walletTextWrap}>
              <Text style={[styles.walletTitle, { textAlign: textRtlStyle }]}>
                {translateData?.walletBalance || FALLBACK.walletBalance}
              </Text>
              <Text style={[styles.walletAmount, { textAlign: textRtlStyle }]}>
                {zoneValue?.currency_symbol} {walletAmount}
              </Text>
            </View>
            <Icons.NextLarge color={appColors.primary} />
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}
