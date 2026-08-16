import { View } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { ListItem } from '../listItem'
import Icons from '../../../../../utils/icons/icons'
import styles from './styles'
import appColors from '../../../../../theme/appColors'
import brandColors from '../../../../../theme/brandColors'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useValues } from '../../../../../utils/context'
import { useLoadingContext } from '../../../../../utils/loadingContext'
import { SkeletonAppPage } from '../../../appSettings/component'
import { useSelector } from 'react-redux'
import { settingDataGet } from '../../../../../api/store/action'


export function RegistrationDetails() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  const { isDark } = useValues()
  const { addressLoaded, setAddressLoaded }: any = useLoadingContext()
  const { translateData } = useSelector((state: any) => state.setting)
  const [loading, setLoading] = useState(!addressLoaded)
  const { selfDriver } = useSelector((state: any) => state.account)


  const type = selfDriver?.role
  useEffect(() => {
    const fetchAddressData = async () => {
      if (!addressLoaded) {
        setLoading(true)
        await settingDataGet()
        setLoading(false)
        setAddressLoaded(true)
      }
    }

    fetchAddressData()
  }, [addressLoaded, setAddressLoaded])

  let menuItems;

  if (type === 'driver') {
    menuItems = useMemo(
      () => [
        {
          icon: Icons.DocumentSetting,
          text: translateData.documentRegistration,
          route: 'DocumentDetail',
        },
        {
          icon: Icons.vehicleSetting,
          text:
            selfDriver?.service_id === 5
              ? translateData.driverDetails || 'Driver Details'
              : translateData.vehicleDetails || 'Vehicle Details',
          route:
            selfDriver?.service_id === 5
              ? 'VehicleDetail'
              : 'VehicleDetail',
        },
        {
          icon: Icons.Bank,
          text: translateData.bankDetails,
          route: 'BankDetails',
        },
      ],
      [translateData],
    );
  } else {
    menuItems = useMemo(
      () => [
        {
          icon: Icons.DocumentSetting,
          text: translateData.documentRegistration,
          route: 'DocumentDetail',
        },
        {
          icon: Icons.vehicleSetting,
          text: translateData.companyDetails || "Company Details",
          route: 'CompanyDetails',
        },
        {
          icon: Icons.Bank,
          text: translateData.bankDetails,
          route: 'BankDetails',
        },
      ],
      [translateData],
    );
  }

  return (
    <View style={styles.section}>
      <View
        style={[
          styles.listView,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
            <View key={index}>
              <SkeletonAppPage />
              {index !== 2 && (
                <View
                  style={[
                    styles.border,
                    {
                      borderColor: isDark
                        ? appColors.darkborder
                        : appColors.border,
                    },
                  ]}
                />
              )}
            </View>
          ))
          : menuItems.map(({ icon: Icon, text, route }, index) => (
            <React.Fragment key={route}>
              <ListItem
                icon={<Icon color={appColors.primary} />}
                text={text}
                backgroundColor={
                  isDark ? 'rgba(248,111,0,0.16)' : brandColors.primarySoft
                }
                color={isDark ? appColors.white : appColors.primaryFont}
                showNextIcon
                onPress={() => navigation.navigate(route)}
              />
              {index !== menuItems?.length - 1 && (
                <View
                  style={[styles.border, { borderColor: colors.border }]}
                />
              )}
            </React.Fragment>
          ))}
      </View>
    </View>
  )
}
