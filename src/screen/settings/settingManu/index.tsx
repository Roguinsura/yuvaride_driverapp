import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles'
import {
  General,
  RegistrationDetails,
  Profile,
  SettingHeader,
  AlertZone,
} from './component/'
import { useTheme } from '@react-navigation/native'
import {
  currentZone,
  fleetVehicleList,
  fleetWalletData,
  incentivesValue,
  planDataGet,
  rentalVehicleData,
  serviceDataGet,
  settingDataGet,
  ticketDataGet,
  walletData,
} from '../../../api/store/action'
import { useDispatch, useSelector } from 'react-redux'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import appColors from '../../../theme/appColors'
import Images from '../../../utils/images/images'
import appFonts from '../../../theme/appFonts'
import { notificationHelper } from '../../../commonComponents'
import { clearValue } from '../../../utils/localstorage'
import useSmartLocation from '../../../commonComponents/helper/locationHelper'
import { useValues } from '../../../utils/context'
import { windowHeight, fontSizes } from '../../../theme/appConstant'
import { resetState } from '../../../api/store/reducers'
import { AppDispatch } from '../../../api/store'
import { useAppNavigation } from '../../../utils/navigation'


export function Settings() {
  const dispatch = useDispatch<AppDispatch>()
  const { translateData } = useSelector((state: any) => state.setting)
  const { colors } = useTheme()
  const { viewRtlStyle } = useValues()
  const { isDark } = useValues()
  const { selfDriver } = useSelector((state: any) => state.account)
  const [isLoggingOut, setIsLoggingOut] = useState(false)


  useEffect(() => {
    if (selfDriver?.role == 'fleet_manager') {
      dispatch(fleetWalletData())
      dispatch(fleetVehicleList())
    } else {
      dispatch(walletData())
    }

    dispatch(planDataGet())
    dispatch(ticketDataGet())
    if (selfDriver?.role == 'driver') {
      dispatch(rentalVehicleData())
    }

    const today = new Date()
    const formattedToday = `${today.getFullYear()}-${today.getMonth() + 1
      }-${today.getDate()}`

    dispatch(incentivesValue({ incentivedate: formattedToday }))
    dispatch(serviceDataGet())
  }, [])


  const navigation = useAppNavigation()
  const { currentLatitude, currentLongitude } = useSmartLocation()

  const closeLogoutSheet = () => {
    logoutSheetRef.current?.close()
  }

  const renderLogoutBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  )

  const gotoLogout = async () => {
    setIsLoggingOut(true)
    try {

      notificationHelper('', 'Logged Out Successfully', 'error')
      closeLogoutSheet()
      clearValue()
      dispatch(resetState())
      dispatch(settingDataGet())
      dispatch(currentZone({ lat: currentLatitude, lng: currentLongitude }))
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const logoutSheetRef = useRef<any>(null)
  const logoutSnapPoints = useMemo(() => ['43%'], [])

  const openLogoutSheet = () => {
    logoutSheetRef.current?.present()
  }

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1 }}>
        {/* The system bar has to track the header — without this the screen
            inherits whatever the last screen left behind. Orange in light
            mode, dark surface in dark mode, same as the header. */}
        <StatusBar
          barStyle="light-content"
          backgroundColor={isDark ? appColors.darkThemeSub : appColors.primary}
        />
        <ScrollView
          style={[styles.main, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <SettingHeader />
          <View style={styles.container}>
            <Profile />
            <General />
            <RegistrationDetails />
            <AlertZone openLogoutSheet={openLogoutSheet} />
          </View>
        </ScrollView>
      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={logoutSheetRef}
          index={1}
          snapPoints={logoutSnapPoints}
          backdropComponent={renderLogoutBackdrop}
          enablePanDownToClose={true}
          handleIndicatorStyle={{
            backgroundColor: appColors.primary,
            width: '13%',
          }}
          backgroundStyle={{
            backgroundColor: isDark ? appColors.bgDark : appColors.white,
          }}
        >
          <BottomSheetView style={{ alignItems: 'center' }}>
            <Image
              source={Images.logoutImage}
              style={{
                height: windowHeight(9),
                width: windowHeight(8),
                top: windowHeight(2),
              }}
              resizeMode="cover"
            />
            <Text
              style={{
                color: isDark ? appColors.white : appColors.black,
                fontFamily: appFonts.medium,
                fontSize: fontSizes.FONT4HALF,
                top: windowHeight(5),
                width: '80%',
                textAlign: 'center',
              }}
            >
              {translateData.logoutConfirm}
            </Text>
            <View
              style={{
                flexDirection: viewRtlStyle,
                justifyContent: 'space-between',
                marginTop: windowHeight(8),
                gap: 15,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  {
                    backgroundColor: isDark
                      ? appColors.darkText
                      : appColors.graybackground,
                    width: '43%',
                  },
                ]}
                onPress={closeLogoutSheet}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    color: isDark ? appColors.bgDark : appColors.iconColor,
                    textAlign: 'center',
                    fontFamily: appFonts.medium,
                    fontSize: fontSizes.FONT4,
                    paddingVertical: windowHeight(1.5),
                  }}
                >
                  {translateData?.cancel}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  { backgroundColor: appColors.red, width: '43%' },
                ]}
                onPress={gotoLogout}
                disabled={isLoggingOut}
                activeOpacity={0.7}
              >
                {isLoggingOut ? (
                  <ActivityIndicator
                    color={appColors.white}
                    style={{ paddingVertical: windowHeight(1.5) }}
                    size={'small'}
                  />
                ) : (
                  <Text
                    style={{
                      color: appColors.white,
                      textAlign: 'center',
                      fontFamily: appFonts.medium,
                      fontSize: fontSizes.FONT4,
                      paddingVertical: windowHeight(1.5),
                    }}
                  >
                    {translateData?.logout}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
