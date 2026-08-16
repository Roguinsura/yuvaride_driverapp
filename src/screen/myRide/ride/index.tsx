import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler, StatusBar, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { Header } from '../component'
import styles from './styles'
import { RideStatus } from '../rideStatus'
import appColors from '../../../theme/appColors'
import { rideDataGets } from '../../../api/store/action'
import { AppDispatch } from '../../../api/store'
import { useAppNavigation } from '../../../utils/navigation'
import { useValues } from '../../../utils/context'

export function MyRide() {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useAppNavigation()
  const { isDark } = useValues()
  const [refreshing, setRefreshing] = useState(false)

  // Only call once on mount
  useEffect(() => {
    dispatch(rideDataGets())
  }, [dispatch])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await dispatch(rideDataGets()).unwrap()
    } catch (error) {
    } finally {
      setRefreshing(false)
    }
  }, [dispatch])

  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [navigation])

  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: isDark
            ? appColors.bgDark
            : appColors.graybackground,
        },
      ]}
    >
      {/* Matches the header; without it the screen keeps whatever the
          previously focused tab set. Orange in light mode, dark surface in
          dark mode — same rule the header itself follows. */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={isDark ? appColors.darkThemeSub : appColors.primary}
      />
      <Header />
      {/*
        The list used to sit inside a ScrollView, which nests a VirtualizedList
        in a plain scroll container — it warns, and it defeats windowing because
        every row is mounted at once. Pull-to-refresh now rides on the FlatList
        itself, passed down through RideStatus.
      */}
      <RideStatus refreshing={refreshing} onRefresh={onRefresh} />
    </View>
  )
}

export default MyRide
