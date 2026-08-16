import appColors from '../../theme/appColors'
import appFonts from '../../theme/appFonts'
// The app-wide scale, not the chat screen's private one. That module also
// exports a `fontSizes`, but on a different scale — its FONT18 is
// windowWidth(18), roughly 70dp, which overflowed this toast and made the
// message unreadable.
import { fontSizes } from '../../theme/appConstant'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Notifier } from 'react-native-notifier'

export function CustomNotification({ title, description, alertType }: any) {
  const backgroundColor =
    alertType === 'error'
      ? '#FFF1F0'
      : alertType === 'success'
        ? '#F6FFED'
        : alertType === 'warn'
          ? '#FFF7E6'
          : '#E6F4FF'

  const borderColor =
    alertType === 'error'
      ? '#FF4D4F'
      : alertType === 'success'
        ? '#52C41A'
        : alertType === 'warn'
          ? '#FAAD14'
          : '#1890FF'

  const displayDescription =
    typeof description === 'string'
      ? description
      : description?.message || JSON.stringify(description)

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderLeftColor: borderColor },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.description}>{displayDescription}</Text>
      </View>
    </View>
  )
}

export function notificationHelper(title: any, message: any, type = 'info') {
  const safeMessage =
    typeof message === 'string'
      ? message
      : message?.message || JSON.stringify(message)

  const safeTitle =
    typeof title === 'string' ? title : title?.message || JSON.stringify(title)

  Notifier.showNotification({
    title: safeTitle,
    description: safeMessage,
    duration: 3000,
    showAnimationDuration: 400,
    hideAnimationDuration: 400,
    Component: CustomNotification,
    componentProps: {
      alertType: type,
      title: safeTitle,
      description: safeMessage,
    },
  })
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 7,
    alignSelf: 'center',
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 50,
  },
  description: {
    fontSize: fontSizes.FONT3HALF,
    color: appColors.primaryFont,
    fontFamily: appFonts.medium,
    lineHeight: fontSizes.FONT3HALF * 1.4,
  },
})
