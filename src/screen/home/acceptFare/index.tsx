import { StatusBar } from 'react-native'
import { View, Text, Image, TouchableOpacity, BackHandler, Platform } from 'react-native'
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { useTheme, useRoute, useFocusEffect } from '@react-navigation/native'
import styles from './styles'
import { BackButton, notificationHelper } from '../../../commonComponents'
import { TotalFair } from './component'
import appColors from '../../../theme/appColors'
import { DriverProfile } from '../../../commonComponents'
import { Button } from '../../../commonComponents'
import { useDispatch, useSelector } from 'react-redux'
import GetLocation from 'react-native-get-location'
import Geolocation from '@react-native-community/geolocation'
import { distanceInMeters } from '../../../utils/functions'
import appTypography from '../../../theme/appTypography'
import { ArrivedMap } from '../../../commonComponents/maps/arrivedMap'
import { useAppNavigation } from '../../../utils/navigation'
import { cancelationDataGet, rideDataPut, rideDataGet } from '../../../api/store/action'
import getEchoInstance from '../../../utils/echo'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView, BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { fontSizes, windowHeight, windowWidth } from '../../../theme/appConstant'
import appFonts from '../../../theme/appFonts'
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import { useValues } from '../../../utils/context'
import { AppDispatch } from '../../../api/store'
import { FAB } from 'react-native-paper'
import Icons from '../../../utils/icons/icons'
import ContentLoader, { Rect } from 'react-content-loader/native'
import NativeAdComponent from '../../../commonComponents/ads/google/NativeAdCard'


const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolate.CLAMP,
    ),
  }))

  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  )

  return <Animated.View style={containerStyle} pointerEvents="box-none" />
}

export function AcceptFare() {
  const navigation = useAppNavigation()
  const { colors } = useTheme()
  const route = useRoute()
  const { ride_Id }: any = route.params
  const { selfDriver } = useSelector((state: any) => state.account)
  const { canceldata } = useSelector((state: any) => state.cancelationReason)
  const [arrivedLoading, setArrivedLoading] = useState<boolean>(false)
  const [cancelLoading, setCancelloading] = useState<boolean>(false)
  const Driver_Id = selfDriver?.id
  const [rideData, setRideData] = useState<null | any>(null)
  const dispatch = useDispatch<AppDispatch>()
  const ambulanceRef = useRef<BottomSheetModal>(null)
  const cancelReasonRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [Platform.OS === 'ios' ? '43%' : '47.5%'], [])
  const snapCancelReason = useMemo(() => ['40%'], [])
  const { isDark } = useValues()
  const { translateData, taxidoSettingData } = useSelector((state: any) => state.setting)
  const [cancelationreason, setCancelationReason] = useState<any>(null)
  const [selectedId, setSelectedId] = useState<null>(null)
  const [showActions, setShowActions] = useState<boolean>(false)
  const [distanceToPickup, setDistanceToPickup] = useState<number | null>(null)

  /*
    Arrival radius, configured in admin under Settings:
      activation.arrival_radius_enable  — master switch
      ride.arrival_radius_meters        — how close the driver must be

    The server enforces the same two values and answers 422 when the driver is
    too far, so this is the local half of one rule, not a second rule. Gating
    the button here means the driver is told *before* pressing it; the 422
    remains the backstop for a stale or spoofed position.
  */
  const arrivalRadiusEnabled =
    String(
      taxidoSettingData?.cabbooking_values?.activation?.arrival_radius_enable ??
      '0',
    ) === '1'

  const arrivalRadiusMeters = Number(
    taxidoSettingData?.cabbooking_values?.ride?.arrival_radius_meters ?? 0,
  )

  const pickupPoint = rideData?.location_coordinates?.[0]

  /*
    activation.ride_otp — whether the rider must read an OTP to the driver.

    With it OFF the server starts the ride at ACCEPTANCE (RideTrait sets
    is_otp_verified and moves the status to STARTED), so by the time the driver
    marks Arrived the ride is already running. Sending them to the OTP screen
    would ask for a code that nothing will ever check, on a ride that has
    already begun.
  */
  const rideOtpEnabled =
    String(
      taxidoSettingData?.cabbooking_values?.activation?.ride_otp ?? '1',
    ) === '1'

  // Only gate when the rule is on, a usable radius is configured, and we have
  // both coordinates. If any of that is missing the button stays enabled and
  // the server decides — never lock a driver out because a setting is absent.
  const radiusGateActive =
    arrivalRadiusEnabled &&
    arrivalRadiusMeters > 0 &&
    distanceToPickup !== null

  const withinArrivalRadius =
    !radiusGateActive || (distanceToPickup as number) <= arrivalRadiusMeters


  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigation.navigate('Home')
        return true
      }
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      )
      return () => backHandler.remove()
    }, [navigation]),
  )

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <CustomBackdrop {...props} />,
    [],
  )

  /*
    Track the distance to the pickup while this screen is open.

    watchPosition rather than a polled getCurrentPosition: the driver is moving
    toward the pickup, and the button needs to unlock as soon as they are in
    range rather than up to one poll interval later. distanceFilter keeps it to
    roughly one update per 10 m of movement instead of a fix per second.
  */
  useEffect(() => {
    if (!arrivalRadiusEnabled || arrivalRadiusMeters <= 0) return
    if (!pickupPoint?.lat || !pickupPoint?.lng) return

    const pickupLat = parseFloat(pickupPoint.lat)
    const pickupLng = parseFloat(pickupPoint.lng)
    if (Number.isNaN(pickupLat) || Number.isNaN(pickupLng)) return

    const watchId = Geolocation.watchPosition(
      position => {
        setDistanceToPickup(
          distanceInMeters(
            position.coords.latitude,
            position.coords.longitude,
            pickupLat,
            pickupLng,
          ),
        )
      },
      () => {
        // No fix available. Leave the distance unknown, which disables the
        // gate and lets the server rule — better than blocking a driver who
        // is standing at the pickup with poor GPS.
        setDistanceToPickup(null)
      },
      { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 },
    )

    return () => Geolocation.clearWatch(watchId)
  }, [arrivalRadiusEnabled, arrivalRadiusMeters, pickupPoint?.lat, pickupPoint?.lng])

  useEffect(() => {
    const ride_start = 'after'
    dispatch(cancelationDataGet({ ride_start }))
  }, [cancelReasonRef])

  useEffect(() => {
    if (!ride_Id) return

    let echoInstance: any = null

    const setupStatusListener = async () => {
      try {
        echoInstance = await getEchoInstance()
        const statusChannel = `ride-status.${ride_Id}`

        // 1. Fetch the current ride state on mount
        dispatch(rideDataGet(ride_Id))
          .unwrap()
          .then((res: any) => {
            const fetchedRide = res?.data || res
            setRideData(fetchedRide)

            if (fetchedRide?.ride_status?.slug === 'cancelled') {
              navigation.goBack()
            }
          })
          .catch((err: any) => {
            console.error('[AcceptFare] Failed to fetch initial ride state:', err)
          })

        // 2. Listen for real-time status updates
        echoInstance
          .private(statusChannel)
          .listen('.ride.status', (e: any) => {
            const data = e?.data || e

            if (data) {
              setRideData(data)
              if (data?.ride_status?.slug === 'cancelled') {
                navigation.goBack()
              }
            }
          })
      } catch (error) {
        console.error('Error setting up Echo listener in AcceptFare:', error)
      }
    }

    setupStatusListener()

    return () => {
      if (echoInstance && ride_Id) {
        echoInstance.leave(`ride-status.${ride_Id}`)
      }
    }
  }, [ride_Id, dispatch])

  const gotoPickup = async () => {
    setArrivedLoading(true)
    try {
      // The server verifies the driver is within the configured radius of the
      // pickup point, but only when coordinates are present — without them the
      // check is silently skipped. Take a fresh high-accuracy fix rather than
      // reusing a cached one, since a stale position can be off by enough to
      // pass or fail the check wrongly.
      const loc = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })

      await dispatch(
        rideDataPut({
          data: {
            status: 'arrived',
            lat: loc.latitude,
            lng: loc.longitude,
          },
          ride_id: ride_Id,
        }),
      ).unwrap()

      if (rideOtpEnabled) {
        navigation.navigate('OtpRide', { rideData: rideData, ride_Id: ride_Id })
      } else {
        // Already started server-side, so go straight to the in-ride screen —
        // the same destination the app's own resume logic uses for a ride in
        // the started state.
        navigation.navigate('ActiveRide', {
          rideData: rideData,
          ride_Id: ride_Id,
        })
      }
    } catch (error: any) {
      // An API rejection carries a status; anything else came from GetLocation.
      if (error?.status) {
        notificationHelper(
          '',
          error?.message || translateData.somethingWentWrong,
          'error',
        )
      } else {
        notificationHelper(
          '',
          error?.message || translateData.locationError,
          'error',
        )
      }
    } finally {
      setArrivedLoading(false)
    }
  }

  const cancelOpen = () => {
    ambulanceRef.current?.close()
    cancelReasonRef.current?.present()
  }

  const cancelRide = async (item: any) => {

    console.log('fsfsdfsdfs', item);


    const payload = {
      data: {
        status: 'cancelled',
        cancellation_reason: cancelationreason?.title || item?.title,
      },
      ride_id: ride_Id,
    };


    console.log('dispatch payload', payload);

    try {
      setCancelloading(true);

      const res = await dispatch(rideDataPut(payload)).unwrap();

      console.log('cancel reason api', res);

      navigation.navigate('TabNav');
    } catch (error) {
      console.log('Cancel ride error:', error);
    } finally {
      setCancelloading(false);
      setCancelloading(false);
    }
  };
  useEffect(() => {
    ambulanceRef.current?.present()
  }, [])

  const handleSelect = (item: any) => {
    if (selectedId === item?.id) {
      setCancelationReason(item)
      setSelectedId(null)
    } else {
      setCancelationReason(item)
      setSelectedId(item?.id)
    }
  }

  const gotoOtherMap = (maptype: any) => {
    navigation.navigate('MapWebView', {
      lat: rideData?.location_coordinates?.[
        rideData?.location_coordinates?.length - 1
      ]?.lat,
      lng: rideData?.location_coordinates?.[
        rideData?.location_coordinates?.length - 1
      ]?.lng,
      type: maptype,
    })
  }

  // Shimmer effect component for loading state
  const ShimmerLoader = useMemo(() => (
    <ContentLoader
      speed={1.5}
      width={'100%'}
      height={windowHeight(40)}
      backgroundColor={isDark ? appColors.darkborder : appColors.border}
      foregroundColor={isDark ? appColors.bgDark : appColors.graybackground}
    >
      <Rect x="10" y="0" rx="4" ry="4" width="60" height="60" />
      <Rect x="90" y="0" rx="4" ry="4" width="190" height="20" />
      <Rect x="90" y="30" rx="4" ry="4" width="130" height="15" />
      <Rect x="10" y="70" rx="4" ry="4" width="332" height="15" />
      <Rect x="10" y="100" rx="4" ry="4" width="210" height="15" />
      <Rect x="10" y="140" rx="4" ry="4" width="332" height="40" />
      <Rect x="10" y="190" rx="4" ry="4" width="332" height="40" />
      <Rect x="10" y="255" rx="4" ry="4" width="332" height="50" />

    </ContentLoader>
  ), [isDark]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={isDark ? appColors.darkThemeSub : appColors.primary}
        />
        <View style={styles.mapSection}>
          <ArrivedMap
            Pickuplocation={rideData?.location_coordinates?.[0]}
            driverId={Driver_Id}
          />
        </View>
        <View style={styles.backButton}>
          <BackButton />
        </View>
        <FAB
          icon={Icons.Map}
          style={[
            styles.fab,
            {
              backgroundColor: isDark
                ? appColors.darkThemeSub
                : appColors.white,
            },
          ]}
          onPress={() => setShowActions(!showActions)}
        />
        {showActions && (
          <>
            <FAB
              icon={Icons.GoogleMap}
              style={[
                styles.fabMini,
                {
                  backgroundColor: isDark
                    ? appColors.darkThemeSub
                    : appColors.white,
                },
                { bottom: '55.5%' },
              ]}
              onPress={() => gotoOtherMap('google')}
            />
            <FAB
              icon={Icons.Wazemap}
              style={[
                styles.fabMini,
                {
                  backgroundColor: isDark
                    ? appColors.darkThemeSub
                    : appColors.white,
                },
                { bottom: '47%' },
              ]}
              onPress={() => gotoOtherMap('waze')}
            />
            <FAB
              icon={Icons.BingMap}
              style={[
                styles.fabMini,
                {
                  backgroundColor: isDark
                    ? appColors.darkThemeSub
                    : appColors.white,
                },
                { bottom: '38.5%' },
              ]}
              onPress={() => gotoOtherMap('bing')}
            />
          </>
        )}

        <BottomSheetModal
          ref={ambulanceRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          handleIndicatorStyle={{
            width: '13%',
            backgroundColor: appColors.primary,
          }}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            backgroundColor: isDark ? appColors.bgDark : appColors.white,
          }}
        >
          <BottomSheetView>
            {rideData ? (
              <>
                <View
                  style={[
                    styles.additionalSection,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                >
                  <DriverProfile
                    iconColor={appColors.primary}
                    backgroundColor={appColors.graybackground}
                    borderRadius={windowHeight(25)}
                    showInfoIcon={true}
                    userDetails={rideData?.rider}
                    rideDetails={rideData}
                  />
                </View>
                <TotalFair
                  onPress={gotoPickup}
                  totalAmount={rideData?.total}
                  paymentMethod={rideData?.payment_method}
                />
                <View style={{ marginBottom: windowHeight(2) }}>
                  <Button
                    // Out of range, show how much closer they need to get —
                    // a greyed button with no explanation reads as broken.
                    title={
                      withinArrivalRadius
                        ? translateData.arrived
                        : `${translateData.arrived} (${Math.round(
                          distanceToPickup as number,
                        )}m away)`
                    }
                    backgroundColor={
                      withinArrivalRadius
                        ? appColors.primary
                        : isDark
                          ? appColors.darkThemeSub
                          : appColors.lightGray
                    }
                    color={
                      withinArrivalRadius
                        ? appColors.white
                        : appColors.iconColor
                    }
                    onPress={gotoPickup}
                    loading={arrivedLoading}
                    disabled={!withinArrivalRadius}
                  />
                </View>
                {taxidoSettingData?.cabbooking_values?.ads?.native_enable == 1 && (
                  <NativeAdComponent adsHeight={windowHeight(20)} />
                )}
                <View style={{ marginBottom: windowHeight(2) }}>
                  <Button
                    title={translateData.cancelTextT}
                    backgroundColor={isDark ? appColors.darkThemeSub : appColors.lightGray}
                    color={isDark ? appColors.white : appColors.iconColor}
                    onPress={cancelOpen}
                  />
                </View>
              </>
            ) : (
              <View style={{ padding: windowWidth(4) }}>
                {ShimmerLoader}
              </View>
            )}
          </BottomSheetView>
        </BottomSheetModal>

        <BottomSheetModal
          ref={cancelReasonRef}
          index={1}
          snapPoints={snapCancelReason}
          enablePanDownToClose={true}
          onDismiss={() => {
            ambulanceRef.current?.present()
          }}
          handleIndicatorStyle={{
            width: '13%',
            backgroundColor: appColors.primary,
          }}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            backgroundColor: isDark ? appColors.bgDark : appColors.white,
          }}
        >
          <BottomSheetView>
            <Text
              style={{
                ...appTypography.h3,
                textAlign: 'center',
                marginVertical: windowHeight(2),
                color: isDark ? appColors.darkText : appColors.black,
              }}
            >
              {translateData.whyyouWanttoCancel}
            </Text>

            {canceldata?.data
              ?.filter((item: any) => item?.status == 1)
              .map((item: any, index: number) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  key={index}
                  style={[
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: windowHeight(1),
                      backgroundColor:
                        selectedId === item?.id
                          ? appColors.primaryBg
                          : isDark
                            ? appColors.darkThemeSub
                            : appColors.graybackground,
                      marginHorizontal: windowWidth(3.5),
                      padding: windowHeight(1.5),
                      borderRadius: windowHeight(0.8),
                    },
                    selectedId === item?.id && {
                      borderColor: appColors.primary,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: item?.icon_image_url }}
                    style={{
                      height: windowHeight(3.5),
                      width: windowHeight(3.5),
                    }}
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderLeftColor: appColors.border,
                      marginHorizontal: windowWidth(2),
                      height: '100%',
                    }}
                  />
                  <Text
                    style={{
                      ...appTypography.bodyLarge,
                      color: isDark ? appColors.darkText : appColors.black,
                    }}
                  >
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              ))}
            <View style={{ marginTop: windowHeight(3) }}>
              <Button
                title={translateData.confirm}
                backgroundColor={appColors.primary}
                color={appColors.white}
                onPress={() => cancelRide(cancelationreason)}
                loading={cancelLoading}
              />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}
