import { View, ScrollView, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../../auth/registration/bankDetails/styles'
import appColors from '../../../theme/appColors'
import {
  Header,
  Input,
  Button,
  notificationHelper,
} from '../../../commonComponents'
import { TitleView } from '../../auth/component'
import Icons from '../../../utils/icons/icons'
import { AppDispatch } from '../../../api/store'
import { BankDetailsinterface } from '../../../api/interface/accountInterface'
import { selfDriverData, updateBankDetails } from '../../../api/store/action'
import { useAppNavigation } from '../../../utils/navigation'
import { windowHeight, windowWidth } from '../../../theme/appConstant'

const FALLBACK = {
  ifsc: 'IFSC Code',
  enterIfsc: 'Enter IFSC code',
  ifscWarning: 'Enter your IFSC code',
  holderNameWarning:
    'Holder name cannot contain numbers or special characters',
}

type FormDataType = {
  holdername: string
  accountnumber: string
  routingNumber: string
  bank: string
}

export function BankDetails() {
  const navigation = useAppNavigation()
  const [showWarning, setShowWarning] = useState<boolean>(false)
  const { colors } = useTheme()
  const { selfDriver } = useSelector((state: any) => state.account)
  const { translateData } = useSelector((state: any) => state.setting)
  const dispatch = useDispatch<AppDispatch>()
  const [loader, setLoader] = useState<boolean>(false)
  const [initialFormData, setInitialFormData] = useState<any>(null)
  const [formData, setFormData] = useState<FormDataType>({
    holdername: '',
    accountnumber: '',
    routingNumber: '',
    bank: '',
  })

  // PayPal has been removed, so the bank account is the only payout method and
  // is always the primary one. The "Set as primary" control is hidden rather
  // than deleted from TitleView — that component is shared with registration.
  const isPrimary = 'bank'

  // SWIFT and PayPal are no longer part of the form, but whatever the backend
  // already holds is sent back untouched — removing a field from the UI should
  // not silently erase stored data.
  const storedSwift = selfDriver?.payment_account?.swift || ''
  const storedPaypal = selfDriver?.payment_account?.paypal_email || ''

  useEffect(() => {
    if (selfDriver) {
      const data = {
        holdername: selfDriver?.payment_account?.bank_holder_name || '',
        accountnumber: selfDriver?.payment_account?.bank_account_no || '',
        routingNumber: selfDriver?.payment_account?.routing_number || '',
        bank: selfDriver?.payment_account?.bank_name || '',
      }
      setFormData(data)
      setInitialFormData(data)
    }
  }, [selfDriver])

  const isChanged =
    JSON.stringify(formData) !== JSON.stringify(initialFormData)

  const handleChange = (key: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }))
  }

  const isValidHolderName = (name: string): boolean => {
    return /^[A-Za-z\s]+$/.test(name)
  }

  const isFormValid = () => {
    const { holdername, accountnumber, routingNumber, bank } = formData
    return (
      holdername.trim() !== '' &&
      accountnumber.trim() !== '' &&
      routingNumber.trim() !== '' &&
      bank.trim() !== ''
    )
  }

  const gotoDocument = () => {
    setShowWarning(true)

    if (!isChanged) {
      notificationHelper('', translateData?.nochangefound, 'info')
      return
    }

    if (!isValidHolderName(formData.holdername)) {
      return
    }

    if (!isFormValid()) {
      notificationHelper(
        '',
        translateData?.pleaseFillAllFieldsCorrectly,
        'error',
      )
      return
    }

    const payload: BankDetailsinterface = {
      bank_name: formData?.bank,
      bank_holder_name: formData?.holdername,
      bank_account_no: formData?.accountnumber,
      routing_number: formData?.routingNumber,
      swift: storedSwift,
      paypal_email: storedPaypal,
      default: isPrimary,
    }

    setLoader(true)
    dispatch(updateBankDetails(payload))
      .unwrap()
      .then((res: any) => {
        setLoader(false)
        if (!res?.success) {
          setShowWarning(false)
          navigation.goBack()
          notificationHelper(
            '',
            translateData?.detailsUpdateSuccessfully,
            'success',
          )
          dispatch(selfDriverData())
        } else {
          notificationHelper('', translateData?.somethingwentwrong, 'error')
        }
      })
      // Without this the loader spun forever on a network failure.
      .catch(() => {
        setLoader(false)
        notificationHelper('', translateData?.somethingwentwrong, 'error')
      })
  }

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack()
        return true
      }
      return false
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [navigation])

  return (
    <ScrollView
      style={[
        styles.main,
        { backgroundColor: colors.background, marginBottom: windowWidth(5) },
      ]}
    >
      <Header title={translateData?.bankDetails} />

      <View style={[styles.subView, { backgroundColor: colors.background }]}>
        <View style={styles.inputfildView}>
          <TitleView
            title={translateData?.bankDetails}
            subTitle={translateData?.bankDetailscontent}
            primary={false}
          />

          <Input
            titleShow
            title={translateData?.holderName}
            placeholder={translateData?.enterHolderName}
            value={formData.holdername}
            onChangeText={text => handleChange('holdername', text)}
            showWarning={
              showWarning &&
              (formData.holdername.trim() == '' ||
                !isValidHolderName(formData.holdername))
            }
            warning={
              formData.holdername.trim() == ''
                ? translateData?.enterYourholderName
                : FALLBACK.holderNameWarning
            }
            backgroundColor={colors.card}
            icon={<Icons.UserName />}
          />

          <Input
            titleShow
            title={translateData?.accountNumber}
            placeholder={translateData?.enterAccountNumber}
            keyboardType="default"
            value={formData.accountnumber}
            onChangeText={text => handleChange('accountnumber', text)}
            showWarning={showWarning && formData.accountnumber.trim() == ''}
            warning={translateData?.enterYouraccountNumber}
            backgroundColor={colors.card}
            icon={<Icons.AccountNo />}
          />

          {/*
            This maps to `routing_number` on the backend, which is what the
            script called the routing/IFSC field. Only the label has changed.
          */}
          <Input
            titleShow
            title={translateData?.ifscCode || FALLBACK.ifsc}
            placeholder={translateData?.enterIfscCode || FALLBACK.enterIfsc}
            value={formData.routingNumber}
            onChangeText={text => handleChange('routingNumber', text)}
            showWarning={showWarning && formData.routingNumber.trim() == ''}
            warning={translateData?.enterYourifscCode || FALLBACK.ifscWarning}
            backgroundColor={colors.card}
            icon={<Icons.AccountIFSC />}
            keyboardType="default"
            autoCapitalize="characters"
          />

          <Input
            titleShow
            title={translateData?.bankName}
            placeholder={translateData?.enterBankName}
            value={formData.bank}
            onChangeText={text => handleChange('bank', text)}
            showWarning={showWarning && formData.bank.trim() == ''}
            warning={translateData?.enterYorebankName}
            backgroundColor={colors.card}
            icon={<Icons.Bank color={appColors.secondaryFont} />}
          />
        </View>

        <View style={{ marginTop: windowHeight(1.5) }}>
          <Button
            onPress={gotoDocument}
            title={translateData?.update}
            backgroundColor={appColors.primary}
            color={appColors.white}
            loading={loader}
          />
        </View>
      </View>
    </ScrollView>
  )
}
