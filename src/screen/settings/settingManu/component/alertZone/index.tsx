import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

import styles from './styles'

const FALLBACK = {
  logout: 'Log out',
}

// Delete Account used to live here under an "Alert zone" heading. It now sits
// on the Profile Settings screen, next to the account it deletes, which leaves
// this as just the log-out action.
export function AlertZone({ openLogoutSheet }: any) {
  const { translateData } = useSelector((state: any) => state.setting)

  return (
    <TouchableOpacity
      onPress={openLogoutSheet}
      activeOpacity={0.8}
      style={styles.logoutButton}
    >
      <Text style={styles.logoutText}>
        {translateData?.logout || FALLBACK.logout}
      </Text>
    </TouchableOpacity>
  )
}
