import React, { useCallback, useEffect, useRef } from 'react'
import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import LottieView from 'lottie-react-native'
import brandColors from '../../theme/brandColors'
import images from '../../utils/images/images'
import Icons from '../../utils/icons/icons'
import { useValues } from '../../utils/context'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { selfDriverData } from '../../api/store/action'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { AppDispatch } from '../../api/store'
import { useAppNavigation } from '../../utils/navigation'
import getEchoInstance from '../../utils/echo'

// How often to re-check verification status while this screen is open. Short
// enough that approval feels immediate, long enough not to hammer driver/self
// for a driver who leaves the screen sitting open for hours.
const VERIFICATION_POLL_MS = 30000

// This screen is reachable before the settings call has ever succeeded, so
// every translated string needs a literal to fall back to — the old code read
// straight through `translateData` and would throw on a cold start.
const FALLBACK = {
  verification: 'Verification',
  underReview: 'Under review',
  actionRequired: 'Action required',
  process: 'Your documents are being verified',
  note: 'We are reviewing the documents you submitted. You will be notified as soon as the review is complete.',
  chat: 'Chat with staff',
  updateDocument: 'Update documents',
  backToLogin: 'Back to Login',
  exitMsg: 'Are you sure you want to exit?',
  exit: 'Exit',
  cancel: 'Cancel',
}

export function Verification() {
  const { selfDriver } = useSelector((state: any) => state.account)
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useAppNavigation()
  const { translateData } = useSelector((state: any) => state.setting)
  const retryTimeoutRef = useRef<any>(null)
  const echoChannelRef = useRef<any>(null)
  const bottomSheetRef = useRef<any>(null)
  const { viewRtlStyle, isDark } = useValues()

  const isFocused = useIsFocused()

  useFocusEffect(
    useCallback(() => {
      dispatch(selfDriverData())
    }, [dispatch]),
  )

  useFocusEffect(
    useCallback(() => {
      const driverId = selfDriver?.id
      if (!driverId) {
        return
      }

      let echo: any = null
      const setupEcho = async () => {
        try {
          echo = await getEchoInstance()
          const channelName = `document-verification.${driverId}`

          echo
            .private(channelName)
            .subscribed(() => {
            })
            .listen('.document.verified.' + driverId, (e: any) => {
              const data = e.data || e
              if (data?.is_verified == 1) {
                navigation.reset({ index: 0, routes: [{ name: 'TabNav' }] })
              }
            })
            .error((err: any) => {
              console.error('[Verification] [SOCKET] Subscription Error:', err)
            })

          // Log the global connection state
          echo.connector.pusher.connection.bind('state_change', (states: any) => {
          })

        } catch (error) {
          console.error('[Verification] Echo setup error:', error)
        }
      }

      setupEcho()

      return () => {
        if (echo) {
          const channelName = `document-verification.${driverId}`
          echo.leave(channelName)
        }
      }
    }, [selfDriver?.id]),
  )

  /*
    Polling fallback for approval.

    The websocket path above is the fast one, but it only works when WS_KEY and
    WS_HOST are set in api/config — otherwise echo.ts falls back to Echo's
    `null` broadcaster and every listener becomes a silent no-op. Without this,
    a driver approved by admin sits on this screen indefinitely and has to kill
    and reopen the app to get past it.

    Re-fetching the driver is enough: the effect below already reacts to
    is_verified, so the socket and the poll converge on the same navigation
    rather than duplicating it. Polling only while this screen is focused, so
    it stops the moment the driver moves on.
  */
  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        dispatch(selfDriverData())
      }, VERIFICATION_POLL_MS)

      return () => clearInterval(interval)
    }, [dispatch]),
  )

  /*
    One place that acts on approval, fed by either the socket or the poll.
    The socket handler navigates directly too; whichever arrives first wins and
    the reset is idempotent.
  */
  useEffect(() => {
    if (!isFocused) return

    if (selfDriver?.is_verified == 1) {
      navigation.reset({ index: 0, routes: [{ name: 'TabNav' }] })
    }
  }, [selfDriver?.is_verified, isFocused, navigation])

  useEffect(() => {
    const backAction = () => {
      bottomSheetRef.current?.expand()
      return true
    }

    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      )
      return () => backHandler.remove()
    }
  }, [isFocused])

  const handleExit = () => {
    BackHandler.exitApp()
    bottomSheetRef.current?.close()
  }

  const handleCancel = () => {
    bottomSheetRef.current?.close()
  }

  const renderBackdrop = useCallback(
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

  const gotoDocUpdate = () => {
    navigation.navigate('DocumentDetail', { NavValue: 1 })
  }

  const hasRejectedDocument = Array.isArray(selfDriver?.documents)
    ? selfDriver?.documents.some((doc: any) => doc?.status === 'rejected')
    : false

  const pageBg = isDark ? brandColors.pageDark : brandColors.cardLight
  const cardBg = isDark ? brandColors.cardDark : brandColors.cardLight
  const borderColor = isDark ? brandColors.borderDark : brandColors.borderLight
  const titleColor = isDark ? brandColors.titleDark : brandColors.titleLight
  const bodyColor = isDark ? brandColors.bodyDark : brandColors.bodyLight

  // A rejected document is the one state the driver can act on, so it gets its
  // own colour and label rather than sitting under the same "under review" pill.
  const statusBg = hasRejectedDocument ? '#FDECEC' : brandColors.primarySoft
  const statusFg = hasRejectedDocument
    ? brandColors.danger
    : brandColors.primary
  const statusLabel = hasRejectedDocument
    ? FALLBACK.actionRequired
    : FALLBACK.underReview

  return (
    <SafeAreaView style={[styles.page, { backgroundColor: pageBg }]}>
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <Text style={[styles.headerTitle, { color: titleColor }]}>
          {translateData?.verification || FALLBACK.verification}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoWrap}>
          <Image
            source={images.brandLogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.animationWrap}>
          <LottieView
            source={require('../../assets/gif/review.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        <View
          style={[styles.card, { backgroundColor: cardBg, borderColor }]}
        >
          <View style={[styles.statusPill, { backgroundColor: statusBg }]}>
            <Text style={[styles.statusText, { color: statusFg }]}>
              {statusLabel}
            </Text>
          </View>

          <Text style={[styles.title, { color: titleColor }]}>
            {translateData?.verificationProcess || FALLBACK.process}
          </Text>

          <Text style={[styles.text, { color: bodyColor }]}>
            {translateData?.verificationNote || FALLBACK.note}
          </Text>

          <TouchableOpacity
            style={styles.cta}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('Chat', {
                driverId: selfDriver?.id,
                from: 'help',
                riderName: selfDriver?.name,
              })
            }
          >
            <Text style={styles.ctaText}>
              {translateData?.chatwithstaf || FALLBACK.chat}
            </Text>
          </TouchableOpacity>

          {hasRejectedDocument && (
            <TouchableOpacity
              style={styles.ctaSecondary}
              activeOpacity={0.85}
              onPress={gotoDocUpdate}
            >
              <Text style={styles.ctaSecondaryText}>
                {translateData?.updateDocument || FALLBACK.updateDocument}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.backToLogin,
            { borderColor, flexDirection: viewRtlStyle },
          ]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
        >
          <Icons.Back color={bodyColor} />
          <Text style={[styles.backToLoginText, { color: bodyColor }]}>
            {translateData?.backToLogin || FALLBACK.backToLogin}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['26%']}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: cardBg }}
        handleIndicatorStyle={{
          backgroundColor: brandColors.primary,
          width: '13%',
        }}
      >
        <BottomSheetView style={styles.sheetContent}>
          <Text style={[styles.modalTitle, { color: titleColor }]}>
            {translateData?.exitMsg || FALLBACK.exitMsg}
          </Text>
          <View
            style={[styles.buttonContainer, { flexDirection: viewRtlStyle }]}
          >
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isDark
                    ? brandColors.fieldDark
                    : brandColors.fieldLight,
                },
              ]}
              activeOpacity={0.8}
              onPress={handleExit}
            >
              <Text style={[styles.buttonText, { color: titleColor }]}>
                {translateData?.exit || FALLBACK.exit}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              activeOpacity={0.85}
              onPress={handleCancel}
            >
              <Text style={[styles.buttonText, styles.buttonPrimaryText]}>
                {translateData?.cancel || FALLBACK.cancel}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  )
}
