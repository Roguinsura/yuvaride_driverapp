import React, { useEffect } from 'react'
import Navigation from './src/navigation'
import { AppContextProvider, useValues } from './src/utils/context'
import { Provider } from 'react-redux'
import store from './src/api/store'
import { MenuProvider } from 'react-native-popup-menu'
import { NotificationServices, requestUserPermission } from './src/utils/pushNotificationHandler'
import { LoadingProvider } from './src/utils/loadingContext'
import { NotifierRoot } from 'react-native-notifier'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Platform, StatusBar, Alert, AppState, Linking } from 'react-native'
import NotificationHelper from './src/commonComponents/helper/localNotificationhelper'
import appColors from './src/theme/appColors'
import { PortalProvider } from '@gorhom/portal'
import { useBatteryLowLog } from './src/commonComponents'
import { TourGuideProvider } from 'rn-tourguide'
import messaging from '@react-native-firebase/messaging'
import GPSStatusMonitor from './src/commonComponents/GPSStatusMonitor'
import { getValue, setValue } from './src/utils/localstorage'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { requestAllPermissionsOnFirstLaunch, queuePermissionPrompt } from './src/utils/appPermissions'

type ChatHeadModule = {
  showChatHead: () => void
  hideChatHead: () => void
  checkOverlayPermission: () => Promise<boolean>
  // Spelling is the module's own, not a typo here.
  requrestPermission: () => Promise<boolean>
}

let showChatHead: (() => void) | undefined
let hideChatHead: (() => void) | undefined
let checkOverlayPermission: (() => Promise<boolean>) | undefined
let requestOverlayPermission: (() => Promise<boolean>) | undefined
const PERMISSION_EXPLANATION_SHOWN = 'PERMISSION_EXPLANATION_SHOWN'

if (Platform.OS == 'android') {
  const chatHead = require('react-native-chat-head') as ChatHeadModule
  showChatHead = chatHead.showChatHead
  hideChatHead = chatHead.hideChatHead
  checkOverlayPermission = chatHead.checkOverlayPermission
  requestOverlayPermission = chatHead.requrestPermission
}

const AppGuards = () => {
  // Verificationhelper()
  return null
}

const AppInner = () => {
  const { isDark } = useValues()
  const backgroundColor = isDark ? appColors.darkThemeSub : appColors.white
  const barStyle = isDark ? 'light-content' : 'dark-content'
  useBatteryLowLog()

  useEffect(() => {
    const initializePermissions = async () => {
      await requestAllPermissionsOnFirstLaunch()
      NotificationServices()
      requestUserPermission()
      NotificationHelper.configure()
    }
    initializePermissions()
  }, [])

  return (
    <>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={Platform.OS == 'android' ? backgroundColor : undefined}
      />
      <AppGuards />
      <Navigation />
    </>
  )
}

const AppContent = () => {
  const [granted, setGranted] = React.useState(false)
  const appState = React.useRef(AppState.currentState)
  const { isDark } = useValues()
  const backgroundColor = isDark ? appColors.darkThemeSub : appColors.white

  /*
    The chat-head module fires ACTION_MANAGE_OVERLAY_PERMISSION with a
    `package:` URI, which lands directly on this app's "Appear on top" toggle.

    This used to call Linking.openURL with the bare Intent action string
    'android.settings.action.MANAGE_OVERLAY_PERMISSION'. openURL expects a URL,
    so it could never resolve that, threw every time, and the catch dropped the
    user on the generic app settings page instead of the overlay screen.
  */
  const openOverlayPermissionScreen = async () => {
    try {
      await requestOverlayPermission?.()
    } catch (err) {
      try {
        await Linking.openSettings()
      } catch (fallbackErr) {
      }
    }
  }

  const showPermissionExplanation = async () => {
    try {
      const alreadyShown = await getValue(PERMISSION_EXPLANATION_SHOWN)
      if (alreadyShown) return

      /*
        The "already shown" flag is written when the user actually answers, not
        before the alert goes up. It used to be set first, so an alert the user
        never saw — dismissed by the system while a native permission dialog
        held focus, say — still burned the app's one and only chance to ask,
        and the overlay permission was then never requested again.
      */
      const remember = () => {
        setValue(PERMISSION_EXPLANATION_SHOWN, 'true').catch(() => { })
      }

      Alert.alert(
        'Permission Required',
        'To show the chat head bubble when the app is in the background, please grant the "Draw over other apps" permission in the next screen.',
        [
          {
            text: 'Go to Settings',
            onPress: () => {
              remember()
              openOverlayPermissionScreen()
            },
          },
          { text: 'Cancel', style: 'cancel', onPress: remember },
        ],
        { cancelable: false },
      )
    } catch (err) {
    }
  }

  useEffect(() => {
    if (Platform.OS !== 'android') return
    const checkAndRequestPermission = async () => {
      try {
        const hasPermission = await checkOverlayPermission?.()
        if (hasPermission) {
          setGranted(true)
          return
        }
        // Queued behind the location / notification dialogs. Opening this alert
        // while a native permission dialog holds focus is how it went unseen.
        queuePermissionPrompt(showPermissionExplanation)
      } catch (err) {
      }
    }
    checkAndRequestPermission()
  }, [])

  useEffect(() => {
    if (Platform.OS !== 'android') return
    const handleAppStateChange = async (nextAppState: any) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState == 'active'
      ) {
        const hasPermission = await checkOverlayPermission?.()
        setGranted(Boolean(hasPermission))
        hideChatHead?.()
      }

      if (
        appState.current == 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        if (granted) {
          showChatHead?.()
        }
      }

      appState.current = nextAppState
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)
    return () => subscription.remove()
  }, [granted])

  useEffect(() => {
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus == messaging.AuthorizationStatus.PROVISIONAL

      if (enabled) {
      }
    }
    requestPermission()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MenuProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor }} edges={['top', 'left', 'right']}>
            <Provider store={store}>
              <NotifierRoot />
              <TourGuideProvider borderRadius={16} backdropColor="rgba(0,0,0,0.4)" androidStatusBarVisible>
                <LoadingProvider>
                  <PortalProvider>
                    <AppInner />
                    <GPSStatusMonitor checkInterval={3000} />
                  </PortalProvider>
                </LoadingProvider>
              </TourGuideProvider>
            </Provider>
          </SafeAreaView>
        </SafeAreaProvider>
      </MenuProvider>
    </GestureHandlerRootView>
  )
}

const App = () => {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  )
}

export default App


