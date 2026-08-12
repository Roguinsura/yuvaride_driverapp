import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking,
  RefreshControl,
} from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Images from '../../../utils/images/images'
import { styles } from './style'
import { useValues } from '../../../utils/context'
import Icons from '../../../utils/icons/icons'
import appColors from '../../../theme/appColors'
import brandColors from '../../../theme/brandColors'
import { LoaderRide } from './loaderRide'
import { windowHeight } from '../../../theme/appConstant'
import { apiformatDates } from '../../../utils/functions'
import { useAppNavigation } from '../../../utils/navigation'

const FALLBACK = {
  pickup: 'Pickup',
  drop: 'Drop',
  sendMessage: 'Send a message',
  noRidesTitle: 'No rides yet',
  noRidesDesc: 'Your rides will appear here once you start driving.',
}

// Each ride status gets a label, a foreground and a soft background so the pill
// reads at a glance. `statusMapping` already existed but was only used to build
// a navigation param — the card never actually showed the status.
const STATUS_MAPPING: Record<
  string,
  { text: string; color: string; soft: string }
> = {
  accepted: { text: 'Pending', color: '#FFB400', soft: '#FFF4DC' },
  arrived: { text: 'Pending', color: '#FFB400', soft: '#FFF4DC' },
  started: { text: 'Active', color: '#3F8FDA', soft: '#EAF2FB' },
  schedule: { text: 'Scheduled', color: '#7F00FF', soft: '#F2E7FF' },
  cancelled: { text: 'Cancelled', color: brandColors.danger, soft: '#FDECEC' },
  completed: { text: 'Completed', color: '#20B149', soft: '#E8F7EE' },
}

export default function RideContainer({
  status,
  scrollEnabled = true,
  refreshing,
  onRefresh,
}: {
  status: any
  scrollEnabled?: boolean
  refreshing?: boolean
  onRefresh?: () => void
}) {
  const { navigate } = useAppNavigation()
  const { viewRtlStyle, textRtlStyle, isDark } = useValues()
  const { rideGets } = useSelector((state: any) => state.ride)
  const { allVehicle } = useSelector((state: any) => state.vehicleType)
  const { translateData } = useSelector((state: any) => state.setting)
  const { zoneValue } = useSelector((state: any) => state.zoneUpdate)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(true)

  const cardBg = isDark ? appColors.darkThemeSub : appColors.white
  const borderColor = isDark ? appColors.darkborder : appColors.border
  const titleColor = isDark ? appColors.white : brandColors.titleLight
  const bodyColor = isDark ? appColors.darkText : brandColors.bodyLight

  // Defaults to an empty array so the "no rides" branch below is reached while
  // the request is still in flight, instead of falling through to a FlatList
  // with nothing in it.
  const acceptedRides =
    rideGets?.data?.filter((ride: any) => {
      const rideStatus = ride?.ride_status?.slug?.toLowerCase()
      const categorySlug = ride?.service_category?.name?.toLowerCase()
      const currentStatus = status?.toLowerCase()?.trim()
      if (!rideStatus) return false
      if (currentStatus === 'schedule') {
        return categorySlug === 'schedule' && rideStatus !== 'cancelled'
      }
      if (currentStatus === 'accepted') {
        return (
          categorySlug !== 'schedule' &&
          rideStatus !== 'completed' &&
          rideStatus !== 'cancelled'
        )
      }
      if (currentStatus === 'past') {
        return rideStatus === 'completed' || rideStatus === 'cancelled'
      }
      return rideStatus === currentStatus
    }) || []

  const paginatedData = acceptedRides.slice(0, page * 5)

  const gotoMessage = (item: any) => {
    navigate('Chat', {
      driverId: item?.driver?.id,
      riderId: item?.rider?.id,
      rideId: item?.id,
      riderName: item?.rider?.name,
      riderImage: item?.rider?.profile_image?.original_url,
    })
  }

  const gotoCall = (item: any) => {
    const phoneNumber = item?.driver?.phone
    if (phoneNumber) Linking.openURL(`tel:${phoneNumber}`)
  }

  const loadMoreData = () => {
    if (!loading && hasMoreData) {
      setLoading(true)
      if (paginatedData.length < acceptedRides.length) {
        setPage(prevPage => prevPage + 1)
      } else {
        setHasMoreData(false)
      }
      setLoading(false)
    }
  }

  const handlePress = (selectedItem: any, vehicleData: any) => {
    const rideStatus = STATUS_MAPPING[selectedItem?.ride_status?.slug]?.text

    navigate('PendingDetails', {
      item: selectedItem,
      vehicleDetail: vehicleData,
      rideStatus: rideStatus,
    })
  }

  const renderItem = ({ item }: { item: any }) => {
    const { vehicle_type_id } = item?.vehicle_type_id || {}
    const vehicleData = Array.isArray(allVehicle)
      ? allVehicle.find((vehicle: any) => vehicle?.id == vehicle_type_id)
      : undefined

    const formattedDate = apiformatDates(item?.created_at)
    const profileImage = item?.rider?.driver_profile_image_url
    const slug = item?.ride_status?.slug
    const statusInfo = STATUS_MAPPING[slug]
    const isFinished = slug === 'completed' || slug === 'cancelled'

    // Both the full and the half star used to read from different objects —
    // `driver` for one, `rider` for the other — so a half star could light up
    // from a rating the full star never saw. One source now.
    const rating = Number(item?.driver?.rating_count)
    const safeRating = isFinite(rating) ? rating : 0

    const locations = Array.isArray(item?.locations) ? item.locations : []
    const pickup = locations[0]
    const drop = locations.length > 1 ? locations[locations.length - 1] : null

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handlePress(item, vehicleData)}
        style={[styles.card, { backgroundColor: cardBg, borderColor }]}
      >
        {/* ---------- rider + status ---------- */}
        <View style={[styles.topRow, { flexDirection: viewRtlStyle }]}>
          {profileImage ? (
            <Image style={styles.avatar} source={{ uri: profileImage }} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarLetter}>
                {item?.rider?.name?.charAt(0)?.toUpperCase() || 'D'}
              </Text>
            </View>
          )}

          <View style={styles.nameWrap}>
            <Text
              numberOfLines={1}
              style={[styles.name, { color: titleColor, textAlign: textRtlStyle }]}
            >
              {item?.rider?.name}
            </Text>
            <View style={[styles.ratingRow, { flexDirection: viewRtlStyle }]}>
              <View style={{ flexDirection: 'row' }}>
                {Array.from({ length: 5 }).map((_, index) => {
                  if (safeRating >= index + 1) {
                    return <Icons.RatingStar key={index} />
                  }
                  if (safeRating >= index + 0.5) {
                    return <Icons.RatingHalfStar key={index} />
                  }
                  return <Icons.RatingEmptyStar key={index} />
                })}
              </View>
              <Text style={[styles.ratingText, { color: titleColor }]}>
                {safeRating.toFixed(1)}
              </Text>
              <Text style={styles.reviewText}>
                ({item?.driver?.review_count ?? 0})
              </Text>
            </View>
          </View>

          {statusInfo && (
            <View
              style={[styles.statusPill, { backgroundColor: statusInfo.soft }]}
            >
              <Text style={[styles.statusText, { color: statusInfo.color }]}>
                {statusInfo.text}
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.divider, { backgroundColor: borderColor }]} />

        {/* ---------- route ---------- */}
        {pickup ? (
          <View style={styles.routeRow}>
            <View style={styles.rail}>
              <View
                style={[
                  styles.dot,
                  { borderColor: appColors.primary, backgroundColor: cardBg },
                ]}
              />
              {drop ? (
                <>
                  <View
                    style={[styles.railLine, { backgroundColor: borderColor }]}
                  />
                  <View
                    style={[
                      styles.dot,
                      {
                        borderColor: brandColors.danger,
                        backgroundColor: cardBg,
                      },
                    ]}
                  />
                </>
              ) : null}
            </View>

            <View style={styles.routeTexts}>
              <Text style={[styles.routeLabel, { textAlign: textRtlStyle }]}>
                {translateData?.pickup || FALLBACK.pickup}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.routeAddress,
                  { color: titleColor, textAlign: textRtlStyle },
                ]}
              >
                {pickup}
              </Text>

              {drop ? (
                <>
                  <View style={styles.routeGap} />
                  <Text style={[styles.routeLabel, { textAlign: textRtlStyle }]}>
                    {translateData?.drop || FALLBACK.drop}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.routeAddress,
                      { color: titleColor, textAlign: textRtlStyle },
                    ]}
                  >
                    {drop}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
        ) : null}

        <View style={[styles.divider, { backgroundColor: borderColor }]} />

        {/* ---------- date, time, fare ---------- */}
        <View style={[styles.footerRow, { flexDirection: viewRtlStyle }]}>
          <View style={[styles.metaRow, { flexDirection: viewRtlStyle }]}>
            <Icons.CalanderBig />
            <Text style={styles.metaText}>{formattedDate.date}</Text>
            <View
              style={[styles.metaSeparator, { backgroundColor: borderColor }]}
            />
            <Icons.Clock color={appColors.secondaryFont} />
            <Text style={styles.metaText}>{formattedDate.time}</Text>
          </View>
          <Text style={styles.fare}>
            {zoneValue?.currency_symbol}
            {item?.total}
          </Text>
        </View>

        {/* ---------- actions, live rides only ---------- */}
        {!isFinished && (
          <View style={[styles.actionRow, { flexDirection: viewRtlStyle }]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.messageButton}
              onPress={() => gotoMessage(item)}
            >
              <Text style={styles.messageText}>
                {translateData?.sendaMsg || FALLBACK.sendMessage}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.callButton}
              onPress={() => gotoCall(item)}
            >
              <Icons.Call color={appColors.white} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  const renderEmpty = () => (
    <View style={styles.noDataContainer}>
      <Image source={Images.noRides} style={styles.noDataImage} />
      <Text style={[styles.noDataText, { color: titleColor }]}>
        {translateData?.norideTitle || FALLBACK.noRidesTitle}
      </Text>
      <Text style={[styles.noDataDesc, { color: bodyColor }]}>
        {translateData?.norideDescription || FALLBACK.noRidesDesc}
      </Text>
    </View>
  )

  if (loading && acceptedRides.length > 0) {
    return (
      <View style={styles.listContainer}>
        <LoaderRide />
      </View>
    )
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={paginatedData}
        scrollEnabled={scrollEnabled}
        keyExtractor={item => item?.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.9}
        // The empty state is a list component rather than an early return, so
        // pull-to-refresh still works when there is nothing to show.
        ListEmptyComponent={renderEmpty}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={!!refreshing}
              onRefresh={onRefresh}
              colors={[appColors.primary]}
              tintColor={appColors.primary}
            />
          ) : undefined
        }
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={appColors.primary}
              style={{ marginTop: windowHeight(1.2) }}
            />
          ) : null
        }
      />
    </View>
  )
}
