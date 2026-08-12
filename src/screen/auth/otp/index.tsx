import React, { useEffect } from 'react'
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import styles from './styles'
import OtpView from './component/otpView'
import brandColors from '../../../theme/brandColors'
import { useValues } from '../../../utils/context'
import { useNavigation } from '@react-navigation/native'

export function Otp() {
  const navigation = useNavigation<any>()
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const { isDark } = useValues()

  // Header (Taxido logo) and Background (city artwork) are both gone. They are
  // still used by loginMail and the registration screens, so only the usage was
  // removed here — the shared components are untouched.
  return (
    <SafeAreaView
      style={[
        styles.main,
        {
          backgroundColor: isDark
            ? brandColors.pageDark
            : brandColors.cardLight,
        },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <OtpView />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
