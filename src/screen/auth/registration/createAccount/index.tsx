import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  BackHandler,
  Keyboard,
  ActivityIndicator,
  Image,
} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import appColors from '../../../../theme/appColors'
import brandColors from '../../../../theme/brandColors'
import { ProgressBar } from '../component'
import { Input, Button } from '../../../../commonComponents'
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native'
import { Header } from '../../component'
import styles from './styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../navigation/main/types'
import Icons from '../../../../utils/icons/icons'
import { useValues } from '../../../../utils/context'
import { useDispatch, useSelector } from 'react-redux'
import { useAppRoute } from '../../../../utils/navigation'
import {
  ValidatePhoneNumber,
  validatePassword,
  PASSWORD_MIN_LENGTH,
} from '../../../../utils/validation'
import { windowHeight } from '../../../../theme/appConstant'
import { AppDispatch } from '../../../../api/store'
import { countryData, preferenceData } from '../../../../api/store/action'
import DropDownPicker from 'react-native-dropdown-picker'
import CountrySelect from 'react-native-country-select'
import { countrySelectProps } from '../../../../utils/countrySelect'

type navigation = NativeStackNavigationProp<RootStackParamList>

export function CreateAccount() {
  const navigation = useNavigation<navigation>()
  const [showWarning, setShowWarning] = useState<boolean>(false)
  /*
    Driver photo, collected here in step 1 but NOT sent with registration:
    driver/register only creates attachments for documents[] and ignores a
    profile_image entirely. It is carried in accountDetail and uploaded to
    driver/updateProfile straight after the account exists — see bankDetails,
    which is where registration actually fires.
  */
  const [driverImage, setDriverImage] = useState<any>(null)
  const [emailFormatWarning, setEmailFormatWarning] = useState<string>('')
  const { colors } = useTheme()
  const { textRtlStyle, viewRtlStyle, isDark, setAccountDetail, rtl } =
    useValues()
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false)
  const { translateData, taxidoSettingData } = useSelector(
    (state: any) => state.setting,
  )
  const route = useAppRoute()
  const usercredential = route.params?.phoneNumber ?? '1234567890'
  const rawCode = route.params?.countryCode ?? '91'
  const userType = route.params?.userType ?? ''
  const cleanCode = rawCode.replace('+', '')
  const [countryCode, setCountryCode] = useState({
    callingCode: [cleanCode],
    cca2: route?.params?.cca2 ?? 'US',
  })
  const [email, setEmail] = useState('')
  const [referral, setReferral] = useState<string>('')
  const [isEmailUser, setIsEmailUser] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { countryList, selfDriver } = useSelector((state: any) => state.account)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string | null>(null)
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(
    null,
  )
  const [items, setItems] = useState<any[]>([])
  const [countryError, setCountryError] = useState<string>('')
  const [pickerVisible, setPickerVisible] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode: countryCode,
    referral: '',
    countryName: '',
  })

  useEffect(() => {
    dispatch(countryData())
    dispatch(preferenceData())
  }, [])

  useFocusEffect(
    useCallback(() => {
      setShowWarning(false)
      setEmailFormatWarning('')
      setError({
        username: '',
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        countryCode: countryCode,
      })
    }, []),
  )

  useEffect(() => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    const isEmail = emailRegex.test(usercredential.trim())
    setIsEmailUser(isEmail)

    if (isEmail) {
      setEmail(usercredential.trim())
    } else {
      setPhoneNumber(usercredential.trim())
    }
  }, [usercredential])

  const [error, setError] = useState<any>({
    username: '',
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode: countryCode,
  })

  useEffect(() => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    const isEmail = emailRegex.test(usercredential.trim())
    if (isEmail) {
      const cleanEmail = usercredential.trim()
      setEmail(cleanEmail)
      setFormData(prev => ({ ...prev, email: cleanEmail }))
    } else {
      const cleanPhone = usercredential.trim()
      setPhoneNumber(cleanPhone)
      setFormData(prev => ({ ...prev, phoneNumber: cleanPhone }))
    }
  }, [usercredential])

  useEffect(() => {
    if (selectedCountryName) {
      setFormData(prev => ({
        ...prev,
        countryName: selectedCountryName,
      }))
    }
  }, [selectedCountryName])

  useEffect(() => { }, [formData.countryName])

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }))

    if (key === 'email') {
      setEmail(value)
      setEmailFormatWarning('')
    }
  }

  const gotoDocument = () => {
    const name = formData.name.trim()
    const phone = formData.phoneNumber.trim()
    const emailValue = formData.email.trim()
    const newErrors: any = {
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
    let hasError = false

    // Check if country is selected
    if (!value || !selectedCountryName) {
      setCountryError(translateData?.countrycodewarn) // or use translateData
      hasError = true
    } else {
      setCountryError('')
    }

    // Make sure countryName is in formData before submitting
    if (selectedCountryName && !formData.countryName) {
      setFormData(prev => ({
        ...prev,
        countryName: selectedCountryName,
      }))
    }

    const phoneError = ValidatePhoneNumber(phone)
    if (isEmailUser && phoneError) {
      newErrors.phoneNumber = phoneError
      hasError = true
    }

    if (name === '') {
      newErrors.name = translateData.pleaseEnterYourName
      hasError = true
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!isEmailUser && emailValue === '') {
      newErrors.email = translateData.emailVerifyyyyy
      hasError = true
    } else if (!isEmailUser && !emailRegex.test(emailValue)) {
      newErrors.email = translateData.emailformateteee
      hasError = true
    }

    /*
      Length is checked here, not just rendered as a hint. The field already
      showed a "minimum 8" warning, but this gate only tested for empty, so a
      short password advanced to step 2 and was not rejected until the final
      submit -- after documents, vehicle and bank details had been entered.
    */
    const passwordError = validatePassword(formData.password)
    if (passwordError) {
      newErrors.password =
        formData.password.trim() === ''
          ? translateData.password
          : translateData.passwordMinLength || passwordError
      hasError = true
    }
    if (formData.confirmPassword.trim() === '') {
      newErrors.confirmPassword = translateData.confirmPassword
      hasError = true
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = translateData.doNotMatch
      hasError = true
    }

    if (hasError) {
      setError(newErrors)
      setShowWarning(true)
      return
    }

    // Ensure countryName is set in formData before submitting
    if (selectedCountryName && !formData.countryName) {
      setFormData(prev => ({
        ...prev,
        countryName: selectedCountryName,
      }))
    }

    setError({ phoneNumber: '', email: '', password: '', confirmPassword: '' })
    setShowWarning(false)
    setAccountDetail({ ...formData, driverImage })
    Keyboard.dismiss()
    navigation.navigate('UploadedDocument', { type: userType })
  }

  const pickDriverImage = async () => {
    try {
      const res: any = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      })
      const file = res?.assets?.[0]
      if (!file?.uri) return
      setDriverImage({
        uri: file.uri,
        type: file.type ?? 'image/jpeg',
        name: file.fileName ?? `driver_${Date.now()}.jpg`,
      })
    } catch {
      // Cancelled or unavailable — leave the photo unset; it is optional.
    }
  }

  const onSelectCountry = (country: any) => {
    const callingCode = country.idd.root + (country.idd.suffixes[0] || '')
    setCountryCode({
      callingCode: [callingCode.replace('+', '')],
      cca2: country.cca2,
    })
    setPickerVisible(false)
    setIsFocused(false)
  }

  useEffect(() => {
    const backAction = () => {
      Keyboard.dismiss()
      navigation.navigate('Login')
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [])

  useEffect(() => {
    const formatted =
      countryList?.data?.map((item: any) => ({
        label: `${item.name}`,
        value: item.calling_code,
      })) || []

    // Add a default option if no countries are available
    if (formatted.length === 0) {
      formatted.push({ label: translateData?.selectCountry, value: '' })
    }

    setItems(formatted)

    // Automatically set the country name if countryCode is pre-filled from route params
    if (countryCode?.callingCode?.[0] && formatted.length > 0) {
      const matchingCountry = formatted.find(
        (item: any) => item.value === countryCode.callingCode[0],
      )
      if (matchingCountry) {
        // Set the dropdown value and country name
        setValue(countryCode.callingCode[0])
        setSelectedCountryName(matchingCountry.label)

        // Update formData with the country name
        setFormData(prev => ({
          ...prev,
          countryName: matchingCountry.label,
        }))
      }
    }
  }, [countryList, countryCode])
  const [isFocused, setIsFocused] = useState(false)

  const pageBg = isDark ? appColors.bgDark : appColors.graybackground
  const cardBg = isDark ? appColors.darkThemeSub : appColors.white
  const borderColor = isDark ? appColors.darkborder : appColors.border
  const titleColor = isDark ? appColors.white : brandColors.titleLight
  const bodyColor = isDark ? appColors.darkText : brandColors.bodyLight
  const fieldBg = isDark ? appColors.bgDark : brandColors.fieldLight
  // The list arrives from the countryData thunk. Until it does the picker
  // shows a spinner instead of an empty dropdown. Derived, not state, so the
  // hook order is untouched.
  const isCountryLoading = !countryList?.data?.length

  return (
    <View style={[styles.screen, { backgroundColor: pageBg }]}>
      <Header backgroundColor={isDark ? colors.card : appColors.white} />
      <ProgressBar fill={1} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.stepPill}>
          <Text style={styles.stepPillText}>STEP 1 OF 3</Text>
        </View>
        <Text
          style={[styles.title, { color: titleColor, textAlign: textRtlStyle }]}
        >
          {translateData.createAccount}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: bodyColor, textAlign: textRtlStyle },
          ]}
        >
          {translateData.registerContent}
        </Text>

        {/*
          Driver photo. Optional at this stage: registration itself does not
          require one, and blocking sign-up on a photo would strand a driver
          who has no camera permission yet.
        */}
        <View style={{ alignItems: 'center', marginBottom: windowHeight(2) }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={pickDriverImage}
            style={{
              width: windowHeight(11),
              height: windowHeight(11),
              borderRadius: windowHeight(11),
              backgroundColor: isDark
                ? appColors.darkThemeSub
                : appColors.graybackground,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {driverImage?.uri ? (
              <Image
                source={{ uri: driverImage.uri }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            ) : (
              <Icons.Camera />
            )}
          </TouchableOpacity>
          <Text
            style={[
              styles.subtitle,
              { color: bodyColor, marginTop: windowHeight(0.8) },
            ]}
          >
            {driverImage?.uri
              ? translateData.changePhoto ?? 'Change photo'
              : translateData.addPhoto ?? 'Add your photo'}
          </Text>
        </View>

        {/* ---------------- personal details ---------------- */}
        <Text
          style={[
            styles.sectionTitle,
            { color: bodyColor, textAlign: textRtlStyle },
          ]}
        >
          {translateData?.personalDetails || 'YOUR DETAILS'}
        </Text>
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.field}>
            <Input
              title={translateData.name}
              titleShow={true}
              placeholder={translateData.enterYourName}
              value={formData.name}
              onChangeText={text => handleChange('name', text)}
              showWarning={showWarning && formData.name === ''}
              warning={translateData.pleaseEnterYourName}
              backgroundColor={fieldBg}
              borderColor={borderColor}
            />
          </View>

          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                { color: titleColor, textAlign: textRtlStyle },
              ]}
            >
              {translateData.mobileNumber}
            </Text>
            <View style={[styles.phoneRow, { flexDirection: viewRtlStyle }]}>
              <TouchableOpacity
                style={[
                  styles.codeChip,
                  {
                    backgroundColor: fieldBg,
                    borderColor: isFocused ? appColors.primary : borderColor,
                  },
                ]}
                activeOpacity={0.7}
                disabled={!isEmailUser}
                onPress={() => {
                  setIsFocused(true)
                  setPickerVisible(true)
                }}
              >
                <View style={styles.pickerButton}>
                  <Text style={[styles.codeText, { color: titleColor }]}>
                    +{countryCode.callingCode[0]}
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={[
                  styles.phoneField,
                  { backgroundColor: fieldBg, borderColor },
                ]}
              >
                <TextInput
                  editable={isEmailUser}
                  placeholder={translateData.enterPhone}
                  placeholderTextColor={
                    isDark ? appColors.darkText : appColors.secondaryFont
                  }
                  value={phoneNumber}
                  onChangeText={text => {
                    setPhoneNumber(text)
                    setFormData(prev => ({
                      ...prev,
                      phoneNumber: text,
                    }))
                  }}
                  keyboardType="phone-pad"
                  style={[
                    styles.number,
                    { color: titleColor, textAlign: rtl ? 'right' : 'left' },
                  ]}
                />
              </View>
            </View>
            {isEmailUser && error.phoneNumber ? (
              <Text style={[styles.errorText, { textAlign: textRtlStyle }]}>
                {error.phoneNumber}
              </Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <Text
              style={[
                styles.label,
                { color: titleColor, textAlign: textRtlStyle },
              ]}
            >
              {translateData?.country}
            </Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={callback => {
                const newValue =
                  typeof callback === 'function' ? callback(value) : callback
                setValue(newValue)

                if (newValue) {
                  const selectedItem = items.find(
                    (item: any) => item.value === newValue,
                  )
                  setSelectedCountryName(selectedItem?.label ?? null)
                } else {
                  setSelectedCountryName(null)
                }
              }}
              setItems={setItems}
              searchable={true}
              searchPlaceholder={translateData?.searchCounty}
              searchTextInputStyle={[
                styles.modalSearch,
                {
                  color: titleColor,
                  borderColor: borderColor,
                  backgroundColor: fieldBg,
                },
              ]}
              searchPlaceholderTextColor={appColors.secondaryFont}
              placeholder={
                isCountryLoading
                  ? translateData?.loading || 'Loading countries...'
                  : translateData?.selectCountry
              }
              containerStyle={styles.container}
              placeholderStyle={[
                styles.placeholderStyles,
                {
                  color: isDark ? appColors.darkText : appColors.secondaryFont,
                },
              ]}
              style={[
                styles.dropdown,
                {
                  backgroundColor: fieldBg,
                  borderColor: open ? appColors.primary : borderColor,
                  flexDirection: viewRtlStyle,
                },
              ]}
              dropDownContainerStyle={{
                backgroundColor: isDark ? colors.card : appColors.white,
                borderColor: borderColor,
                marginTop: windowHeight(0.5),
              }}
              textStyle={[styles.text, { color: titleColor }]}
              labelStyle={[styles.text, { color: titleColor }]}
              listItemLabelStyle={{ color: titleColor }}
              scrollViewProps={{ showsVerticalScrollIndicator: false }}
              /*
                MODAL rather than SCROLLVIEW: the list opens as a full sheet
                with a full-width search field, instead of expanding inline
                under the field where the search box was cramped. It also
                removes the need for the tail spacer the inline list required.
              */
              listMode="MODAL"
              modalAnimationType="slide"
              modalTitle={translateData?.selectCountry || 'Select country'}
              modalTitleStyle={[styles.modalTitle, { color: titleColor }]}
              modalContentContainerStyle={[
                styles.modalContent,
                { backgroundColor: pageBg },
              ]}
              loading={isCountryLoading}
              ActivityIndicatorComponent={() => (
                <ActivityIndicator size="small" color={appColors.primary} />
              )}
              searchContainerStyle={{
                borderBottomColor: borderColor,
                paddingHorizontal: 0,
                paddingBottom: 12,
              }}
              CloseIconComponent={() => (
                <Text style={[styles.modalClose, { color: appColors.primary }]}>
                  {translateData?.cancel || 'Close'}
                </Text>
              )}
              ListEmptyComponent={() => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: windowHeight(1.3),
                  }}
                >
                  <Text style={{ color: titleColor }}>
                    {translateData?.noCountryAvilbel}
                  </Text>
                </View>
              )}
              ArrowDownIconComponent={() => (
                <View style={{ transform: [{ rotate: '-90deg' }] }}>
                  <Icons.Back color={titleColor} />
                </View>
              )}
              ArrowUpIconComponent={() => (
                <View style={{ transform: [{ rotate: '90deg' }] }}>
                  <Icons.Back color={titleColor} />
                </View>
              )}
            />
            {countryError !== '' && (
              <Text style={[styles.errorText, { textAlign: textRtlStyle }]}>
                {countryError}
              </Text>
            )}
          </View>
        </View>

        {/* ---------------- sign-in details ---------------- */}
        <Text
          style={[
            styles.sectionTitle,
            { color: bodyColor, textAlign: textRtlStyle },
          ]}
        >
          {translateData?.loginDetails || 'SIGN-IN DETAILS'}
        </Text>
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.field}>
            <Input
              editable={!isEmailUser}
              title={translateData.email}
              titleShow={true}
              placeholder={translateData.enterEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={text => {
                setEmail(text)
                handleChange('email', text)
              }}
              backgroundColor={fieldBg}
              showWarning={!!error.email}
              warning={error.email}
              borderColor={borderColor}
            />
            {!isEmailUser && emailFormatWarning !== '' && (
              <Text style={[styles.errorText, { textAlign: textRtlStyle }]}>
                {emailFormatWarning}
              </Text>
            )}
          </View>

          <View style={styles.field}>
            <Input
              title={translateData.createaccount}
              titleShow={true}
              placeholder={translateData.password}
              value={formData.password}
              warning={
                showWarning && formData.password === ''
                  ? translateData.password
                  : formData.password.length > 0 &&
                    formData.password.length < PASSWORD_MIN_LENGTH
                    ? translateData.passwordMinLength ||
                    `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
                    : ''
              }
              onChangeText={text => handleChange('password', text)}
              // Surface the length rule while typing, not only after a failed
              // submit — the point is to correct it before moving on. The
              // empty-field warning still waits for a submit attempt, so the
              // form does not scold someone who has not started typing.
              showWarning={
                (formData.password.length > 0 &&
                  formData.password.length < PASSWORD_MIN_LENGTH) ||
                (showWarning && formData.password === '')
              }
              backgroundColor={fieldBg}
              borderColor={borderColor}
              rightIcon={
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <Icons.EyeOpen />
                  ) : (
                    <Icons.EyeClose
                      color={isDark ? appColors.white : appColors.secondaryFont}
                    />
                  )}
                </TouchableOpacity>
              }
              secureText={!isPasswordVisible}
              style={rtl ? styles.view : null}
            />
          </View>

          <View style={styles.field}>
            <Input
              title={translateData.cPw}
              titleShow={true}
              placeholder={translateData.confirmPassword}
              value={formData.confirmPassword}
              onChangeText={text => handleChange('confirmPassword', text)}
              showWarning={!!error.confirmPassword}
              warning={error.confirmPassword}
              backgroundColor={fieldBg}
              borderColor={borderColor}
              rightIcon={
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  {isConfirmPasswordVisible ? (
                    <Icons.EyeOpen />
                  ) : (
                    <Icons.EyeClose
                      color={isDark ? appColors.white : appColors.secondaryFont}
                    />
                  )}
                </TouchableOpacity>
              }
              secureText={!isConfirmPasswordVisible}
              style={rtl ? styles.view : null}
            />
          </View>
        </View>

        {/* ---------------- referral ---------------- */}
        {taxidoSettingData?.cabbooking_values?.activation?.referral_enable ==
          1 &&
          userType == 'driver' && (
            <>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: bodyColor, textAlign: textRtlStyle },
                ]}
              >
                {translateData?.referaalId || 'REFERRAL'}
              </Text>
              <View
                style={[styles.card, { backgroundColor: cardBg, borderColor }]}
              >
                <View style={styles.field}>
                  <Input
                    title={translateData?.referaalId}
                    placeholder={translateData?.enterreferaalId}
                    titleShow={true}
                    Optional={true}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={referral}
                    onChangeText={text => {
                      setReferral(text)
                      handleChange('referral', text)
                    }}
                    backgroundColor={fieldBg}
                    borderColor={borderColor}
                  />
                </View>
              </View>
            </>
          )}

        <View style={styles.footer}>
          <Button
            onPress={gotoDocument}
            title={translateData.next}
            backgroundColor={appColors.primary}
            color={appColors.white}
          />
        </View>
      </ScrollView>

      {pickerVisible && (
        <CountrySelect
          {...countrySelectProps(isDark)}
          visible={pickerVisible}
          onSelect={onSelectCountry}
          onClose={() => {
            setPickerVisible(false)
            setIsFocused(false)
          }}
        />
      )}
    </View>
  )
}
