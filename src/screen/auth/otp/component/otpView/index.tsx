import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles'
import { notificationHelper } from '../../../../../commonComponents'
import brandColors from '../../../../../theme/brandColors'
import images from '../../../../../utils/images/images'
import OTPTextView from 'react-native-otp-textinput'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../../navigation/main/types'
import { useValues } from '../../../../../utils/context'
import { DriverLoginInterface, FleetVerifyOtpInterface, VerifyOtpInterface } from '../../../../../api/interface/authInterface'
import { selfDriverData, settingDataGet, userVerifyOtp, userLogin, fleetsVerifyOtp } from '../../../../../api/store/action/index'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../../api/store/index'
import { getValue, setValue } from '../../../../../utils/localstorage/index'

import messaging from '@react-native-firebase/messaging';

type navigation = NativeStackNavigationProp<RootStackParamList>

// Resend stays locked for this long after landing on the screen and after every
// resend. Was 15s, and only applied after the first resend — the link was live
// immediately on arrival, so a slow SMS invited an instant second request.
const RESEND_DELAY_SECONDS = 30

// Last-resort copy for a failed verification. The server usually supplies its
// own message ("Invalid token"), but if both that and the translation key are
// missing the user must still be told the attempt failed rather than seeing
// the screen sit there unchanged.
const FALLBACK_VERIFY_ERROR = 'Invalid OTP. Please try again.'

const OtpView: React.FC = () => {
  const route = useRoute()
  const demouser = route.params || {}
  const { confirmation }: any = route.params
  const { translateData, settingData } = useSelector((state: any) => state.setting)
  const demoMode = settingData?.values?.activation?.demo_mode == 1
  const [warning, setWarning] = useState('')
  const [enteredOtp, setEnteredOtp] = useState(demoMode == true ? '123456' : '')
  const { viewRtlStyle } = useValues()
  const { textRtlStyle, isDark, setToken, token } = useValues()
  const countryCode = route.params?.countryCode ?? '91'
  const phoneNumber = route.params?.phoneNumber ?? '1234567890'
  const cca2 = route?.params?.cca2 ?? 'US'
  const userType = route?.params?.userType ?? ''

  const [message, setMessage] = useState<string>('')
  const [fcmToken, setFcmToken] = useState('')
  const [success, setSuccess] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const { navigate } = useNavigation<navigation>()
  const [loading, setLoading] = useState(false)
  const emailOrPhone = demouser?.email_or_phone ?? phoneNumber
  const isEmail = emailOrPhone.includes('@')
  const input = useRef<OTPTextView>(null)
  const isFocused = useIsFocused()
  const [resendTimer, setResendTimer] = useState(RESEND_DELAY_SECONDS);
  const formattedCountryCode = useMemo(() => {
    if (!countryCode) return '';
    return countryCode.startsWith('+') ? countryCode : `+${countryCode}`;
  }, [countryCode]);

  const titleColor = isDark ? brandColors.titleDark : brandColors.titleLight
  const bodyColor = isDark ? brandColors.bodyDark : brandColors.bodyLight
  const idleBorder = isDark ? brandColors.borderDark : brandColors.borderLight

  const handleChange = (otp: string) => {
    setEnteredOtp(otp)
    // A rejection from the previous attempt is not about the code being typed
    // now, so clear it as soon as the user edits.
    setMessage('')
    if (otp.length === 6) {
      Keyboard.dismiss()
      setWarning('')
    }
    else {
      setWarning(translateData?.validOtpEnter)
    }
  }

  useEffect(() => {
    if (enteredOtp.length === 6) {
      Keyboard.dismiss()
      setWarning('')

      if (userType == 'fleet') {
        handleVerifyFleet(enteredOtp);
      } else if (userType == 'driver') {
        handleVerify(enteredOtp);
      }
    }
    else {
    }
  }, [enteredOtp, fcmToken])

  useEffect(() => {
    const fetchToken = async () => {
      let fcmToken = await getValue('fcmToken')
      if (fcmToken) {
        setFcmToken(fcmToken)
      }
    }
    fetchToken()
  }, [isFocused])

  const handleVerify = async () => {
    setLoading(true)
    const formatCountryCode = (code: string): string => {
      if (code.startsWith('+')) {
        return code.substring(1)
      }
      return code
    }
    let payload: VerifyOtpInterface = {
      email_or_phone: phoneNumber,
      country_code: formatCountryCode(countryCode),
      token: enteredOtp,
      email: null,
      fcm_token: fcmToken,
    }

    dispatch(userVerifyOtp(payload))
      .unwrap()
      .then((res: any) => {
        setLoading(false)
        if (res?.success && res?.is_registered) {
          messaging()
            .subscribeToTopic(`user_${res?.id}`)
            .then(() => {

            });

          setValue('token', res.access_token)
          setToken(res.access_token)
          if (res?.is_verified == '0') {
            navigate('Verification')
          } else {
            navigate('TabNav')
          }
          dispatch(selfDriverData())
        } else if (res.success && !res.is_registered) {
          messaging()
            .subscribeToTopic(`user_${res?.id}`)
            .then(() => {

            });

          navigate('CreateAccount', {
            countryCode,
            phoneNumber,
            cca2,
            userType
          })
          dispatch(settingDataGet())
          setSuccess(false)
          setMessage(translateData?.noLinkAccount)
        } else if (!res.success) {
          setSuccess(false)
          // Falls back twice: the server's own message ("Invalid token") is
          // preferred, then the translated string, then a literal — otherwise a
          // missing translation key leaves the user with a silent failure.
          setMessage(
            res?.message || translateData?.verifyWarn || FALLBACK_VERIFY_ERROR,
          )
        }
      })
      .catch((error: any) => {
        setLoading(false)
        setSuccess(false)
        setMessage(translateData?.verifyWarn || FALLBACK_VERIFY_ERROR)
      })
  }


  const handleVerifyFleet = async () => {
    if (!enteredOtp || enteredOtp.length < 6) {
      setWarning(translateData?.validOtpEnter)
      return
    }

    // The fleet path never touched `loading`, so its Verify button stayed idle
    // through the whole request while the driver path spun.
    setLoading(true)

    const formatCountryCode = (code: string): string => {
      if (code.startsWith('+')) {
        return code.substring(1)
      }
      return code
    }
    let payload: FleetVerifyOtpInterface = {
      email_or_phone: phoneNumber,
      country_code: formatCountryCode(countryCode),
      token: enteredOtp,
      email: null,
      fcm_token: fcmToken,
    }

    dispatch(fleetsVerifyOtp(payload))
      .unwrap()
      .then((res: any) => {
        setLoading(false)

        if (res.success && res.is_registered) {
          messaging()
            .subscribeToTopic(`user_${res?.id}`)  // or 'users', 'offers', etc.
            .then(() => {
            });

          setValue('token', res.access_token)
          setToken(res.access_token)
          if (res?.is_verified == '0') {
            navigate('Verification')
          } else {
            navigate('TabNav')
          }
          dispatch(selfDriverData()).then((res) => {
          })
        } else if (res.success && !res.is_registered) {
          messaging()
            .subscribeToTopic(`user_${res?.id}`)
            .then(() => {

            });

          navigate('CreateAccount', {
            countryCode,
            phoneNumber,
            cca2,
            userType
          })
          dispatch(settingDataGet())
          setSuccess(false)
          setMessage(translateData?.noLinkAccount)
        } else if (!res.success) {
          setSuccess(false)
          setMessage(
            res?.message || translateData?.verifyWarn || FALLBACK_VERIFY_ERROR,
          )
        }
      })
      .catch((error: any) => {
        setLoading(false)
        setSuccess(false)
        setMessage(translateData?.verifyWarn || FALLBACK_VERIFY_ERROR)
      })
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [resendTimer])

  const handelGetOtp = async () => {
    setResendTimer(RESEND_DELAY_SECONDS)
    const payload: DriverLoginInterface = {
      email_or_phone: phoneNumber,
      country_code: formattedCountryCode,
      fcm_token: fcmToken
    };

    try {
      const res = await dispatch(userLogin(payload)).unwrap();
      if (res?.success) {
        await setValue('userType', userType);
        notificationHelper('', translateData?.otpSent, 'success');
      } else {
        notificationHelper('', res.message, 'error');
      }
    } catch (error) {
      notificationHelper('', translateData?.loginFailed, 'error');
    }
  }

  const canResend = resendTimer === 0

  return (
    <View style={styles.main}>
      <View style={styles.logoWrap}>
        <Image
          source={images.brandLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.artWrap}>
        <Image
          source={images.otpIllustration}
          style={styles.art}
          resizeMode="contain"
        />
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark
              ? brandColors.cardDark
              : brandColors.cardLight,
            borderColor: idleBorder,
          },
        ]}
      >
        <Text
          style={[
            styles.screenTitle,
            { color: titleColor, textAlign: textRtlStyle },
          ]}
        >
          {translateData?.otpVerification || 'OTP Verification'}
        </Text>

        <Text
          style={[
            styles.screenSubtitle,
            { color: bodyColor, textAlign: textRtlStyle },
          ]}
        >
          {isEmail
            ? `${translateData?.enterOtp} ${emailOrPhone}`
            : `${translateData?.enterOtp} ${formattedCountryCode} ${emailOrPhone}`}
        </Text>

        <View style={styles.inputContainer}>
          <OTPTextView
            autoFocus
            containerStyle={[
              styles.otpContainer,
              { flexDirection: viewRtlStyle },
            ]}
            textInputStyle={[
              styles.otpInput,
              {
                color: titleColor,
                backgroundColor: isDark
                  ? brandColors.fieldDark
                  : brandColors.fieldLight,
              },
            ]}
            handleTextChange={handleChange}
            inputCount={6}
            keyboardType="numeric"
            tintColor={brandColors.primary}
            offTintColor={idleBorder}
            defaultValue={enteredOtp}
          />
        </View>

        {/*
          `message` holds the server's rejection ("Invalid token"), `warning`
          the local "enter 6 digits" hint. Neither was rendered before, so a
          wrong OTP produced no visible response at all.
        */}
        {(warning || message) !== '' && (
          <Text style={[styles.warningText, { textAlign: textRtlStyle }]}>
            {warning || message}
          </Text>
        )}

        <TouchableOpacity
          style={[styles.cta, loading && styles.ctaDisabled]}
          activeOpacity={0.85}
          disabled={loading}
          onPress={() => {
            if (userType == 'fleet') {
              handleVerifyFleet();
            } else if (userType == 'driver') {
              handleVerify();
            }
          }}
        >
          {loading ? (
            <ActivityIndicator color={brandColors.onPrimary} />
          ) : (
            <Text style={styles.ctaText}>
              {translateData?.verify || 'Verify'}
            </Text>
          )}
        </TouchableOpacity>

        <View style={[styles.retry, { flexDirection: viewRtlStyle }]}>
          <Text style={[styles.notReceive, { color: bodyColor }]}>
            {translateData?.notReceived || "Didn't receive the code?"}
          </Text>
          <TouchableOpacity
            onPress={handelGetOtp}
            activeOpacity={0.7}
            disabled={!canResend}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {/*
              While the timer runs this shows the remaining seconds in muted
              body colour, so the countdown does not read as a tappable link.
            */}
            <Text
              style={[
                styles.resend,
                { color: canResend ? brandColors.primary : bodyColor },
              ]}
            >
              {/*
                The old label used translateData.resendIt, which the server
                returns as the unspaced "ResendIt". Neither `resend` nor
                `resendOtp` exists in the driver-app translation set today, so
                both of these render their literal fallback — the lookup is kept
                so adding those keys server-side starts translating this without
                a code change.
              */}
              {canResend
                ? translateData?.resend || 'Resend'
                : `${translateData?.resendOtp || 'Resend in'} ${resendTimer}s`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default OtpView
