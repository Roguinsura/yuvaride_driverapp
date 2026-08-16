import React, { useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  StatusBar,
} from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import appColors from '../../theme/appColors'
import brandColors from '../../theme/brandColors'
import Icons from '../../utils/icons/icons'
import { useValues } from '../../utils/context'
import { notificationHelper } from '../../commonComponents'
import { useAppNavigation } from '../../utils/navigation'
import styles, { CHART_SIZE, CHART_STROKE } from './styles'

// Every label on this screen comes from `translateData`, which is empty until
// the settings call lands. Without these the screen renders blank strings on a
// cold start.
const FALLBACK = {
  dashboard: 'Dashboard',
  subtitle: 'Your driving at a glance',
  totalBooking: 'Total bookings',
  completed: 'Completed',
  pending: 'Pending',
  cancelled: 'Cancelled',
  totalEarning: 'Total earnings',
  earningNotYet: 'No earnings yet',
  drivePerformance: 'Drive performance',
  averageDrivePerformance: 'Average performance',
  totalDistances: 'Total distance',
  totalHours: 'Total hours',
  averageDistances: 'Average distance',
  averageHours: 'Average hours',
  noRidesYet: 'No rides recorded yet',
}

// Segment colours. Completed carries the brand, pending is amber and cancelled
// stays a neutral slate so the ring never reads as an error state.
const COMPLETED_COLOR = brandColors.primary
const PENDING_COLOR = '#FFB400'
const CANCELLED_COLOR = '#C3C8D1'

export function DashBoard() {
  const { dashBoardList } = useSelector((state: any) => state.dashboard)
  const { translateData } = useSelector((state: any) => state.setting)
  const { isDark, viewRtlStyle, textRtlStyle } = useValues()
  const { navigate } = useAppNavigation()
  const navigation = useNavigation<any>()

  const pageBg = isDark ? appColors.bgDark : appColors.graybackground
  // The header is brand orange in light mode only. In dark mode it takes the
  // same dark surface the inner pages use, so the bar doesn't stay orange.
  const headerBg = isDark ? appColors.darkThemeSub : appColors.primary
  const headerChipBorder = isDark
    ? appColors.darkborder
    : appColors.greenborder
  const cardBg = isDark ? appColors.darkThemeSub : appColors.white
  const borderColor = isDark ? appColors.darkborder : appColors.border
  const titleColor = isDark ? appColors.white : brandColors.titleLight
  const bodyColor = isDark ? appColors.darkText : brandColors.bodyLight

  const ride = dashBoardList?.ride
  const performance = dashBoardList?.driver_performance

  const completed = Number(ride?.completed_rides) || 0
  const pending = Number(ride?.pending_rides) || 0
  const cancelled = Number(ride?.cancelled_rides) || 0
  const total = completed + pending + cancelled

  const legend = [
    { value: completed, color: COMPLETED_COLOR, label: translateData?.completed || FALLBACK.completed },
    { value: pending, color: PENDING_COLOR, label: translateData?.pendingRide || FALLBACK.pending },
    { value: cancelled, color: CANCELLED_COLOR, label: translateData?.cancelled || FALLBACK.cancelled },
  ]

  /* -------------------- donut geometry -------------------- */
  const radius = (CHART_SIZE - CHART_STROKE) / 2
  const cx = CHART_SIZE / 2
  const cy = CHART_SIZE / 2
  const circumference = 2 * Math.PI * radius
  // A visual breather between slices, in path units rather than degrees so it
  // stays constant whatever the slice sizes are.
  const GAP = circumference * 0.012

  let angleCursor = -90
  const arcs = legend
    .filter(item => item.value > 0)
    .map((item, index) => {
      const sweep = (item.value / total) * circumference
      // Only one slice? Draw it whole, otherwise the gap leaves a nick in a
      // ring that should be closed.
      const drawn = legend.filter(l => l.value > 0).length === 1
        ? sweep
        : Math.max(sweep - GAP, circumference * 0.004)
      const rotation = angleCursor
      angleCursor += (item.value / total) * 360
      return { key: index, color: item.color, drawn, rotation }
    })

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  /* -------------------- performance tiles -------------------- */
  const distanceUnit = performance?.unit || ''
  const tiles = [
    {
      key: 'totalDistance',
      Icon: Icons.Speed,
      tint: '#3F8FDA',
      soft: isDark ? 'rgba(63,143,218,0.16)' : '#EAF2FB',
      value: performance?.total_distance ?? 0,
      unit: distanceUnit,
      label: translateData?.totalDistances || FALLBACK.totalDistances,
    },
    {
      key: 'totalHours',
      Icon: Icons.Clock,
      tint: brandColors.primary,
      soft: isDark ? 'rgba(248,111,0,0.18)' : brandColors.primarySoft,
      value: performance?.total_hours ?? 0,
      unit: '',
      label: translateData?.totalHours || FALLBACK.totalHours,
    },
    {
      key: 'averageDistance',
      Icon: Icons.Target,
      tint: '#20B149',
      soft: isDark ? 'rgba(32,177,73,0.16)' : '#E8F7EE',
      value: performance?.average_distance ?? 0,
      unit: distanceUnit,
      label: translateData?.averageDistances || FALLBACK.averageDistances,
    },
    {
      key: 'averageHours',
      Icon: Icons.Clock,
      tint: '#FFB400',
      soft: isDark ? 'rgba(255,180,0,0.18)' : '#FFF4DC',
      value: performance?.average_hours ?? 0,
      unit: '',
      label: translateData?.averageHours || FALLBACK.averageHours,
    },
  ]

  const gotoDetails = () => {
    if (ride?.total_earnings > 0) {
      navigate('TotalEarnings')
    } else {
      notificationHelper(
        '',
        translateData?.earningNotYet || FALLBACK.earningNotYet,
        'success',
      )
    }
  }

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
  }, [])

  return (
    <View style={[styles.screen, { backgroundColor: pageBg }]}>
      <StatusBar barStyle="light-content" backgroundColor={headerBg} />

      {/*
        A fixed header, outside the ScrollView. It stays put while the content
        scrolls under it and it never overlaps the cards below.
      */}
      <View style={[styles.header, { backgroundColor: headerBg }]}>
        <View style={[styles.headerRow, { flexDirection: viewRtlStyle }]}>
          <View>
            <Text style={[styles.headerTitle, { textAlign: textRtlStyle }]}>
              {translateData?.dashboard || FALLBACK.dashboard}
            </Text>
            <Text style={[styles.headerSubtitle, { textAlign: textRtlStyle }]}>
              {FALLBACK.subtitle}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.bellButton, { borderColor: headerChipBorder }]}
            activeOpacity={0.7}
            onPress={() => navigate('Notification')}
          >
            <Icons.Notification color={appColors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- earnings hero ---------- */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={gotoDetails}
          style={[
            styles.card,
            styles.earningCard,
            { backgroundColor: cardBg, borderColor, flexDirection: viewRtlStyle },
          ]}
        >
          <View style={styles.earningIcon}>
            <Icons.DollorLarge />
          </View>
          <View style={styles.earningTextWrap}>
            <Text
              style={[styles.earningLabel, { color: bodyColor, textAlign: textRtlStyle }]}
            >
              {translateData?.totalEarning || FALLBACK.totalEarning}
            </Text>
            <Text
              style={[styles.earningValue, { color: titleColor, textAlign: textRtlStyle }]}
            >
              {ride?.currency_symbol || ''}
              {ride?.total_earnings ?? 0}
            </Text>
          </View>
          <Icons.LeftArrow color={bodyColor} />
        </TouchableOpacity>

        {/* ---------- bookings donut ---------- */}
        <Text style={[styles.sectionTitle, { color: titleColor, textAlign: textRtlStyle }]}>
          {translateData?.totalBooking || FALLBACK.totalBooking}
        </Text>

        <View
          style={[styles.card, styles.ridesCard, { backgroundColor: cardBg, borderColor }]}
        >
          <View style={styles.chartWrap}>
            <Svg width={CHART_SIZE} height={CHART_SIZE}>
              <G origin={`${cx}, ${cy}`}>
                {/* Track — keeps the ring readable when a slice is missing. */}
                <Circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  stroke={isDark ? appColors.darkborder : appColors.graybackground}
                  strokeWidth={CHART_STROKE}
                  fill="none"
                />
                {arcs.map(arc => (
                  <Circle
                    key={arc.key}
                    cx={cx}
                    cy={cy}
                    r={radius}
                    stroke={arc.color}
                    strokeWidth={CHART_STROKE}
                    fill="none"
                    strokeDasharray={`${arc.drawn} ${circumference}`}
                    strokeLinecap="round"
                    rotation={arc.rotation}
                    origin={`${cx}, ${cy}`}
                  />
                ))}
              </G>
            </Svg>

            <View style={styles.chartCenter} pointerEvents="none">
              <Text style={[styles.chartCount, { color: titleColor }]}>{total}</Text>
              <Text style={[styles.chartCaption, { color: bodyColor }]}>
                {total > 0
                  ? `${completionRate}% ${translateData?.completed || FALLBACK.completed}`
                  : FALLBACK.noRidesYet}
              </Text>
            </View>
          </View>

          <View style={styles.legend}>
            {legend.map((item, index) => (
              <View key={item.label}>
                <View style={[styles.legendRow, { flexDirection: viewRtlStyle }]}>
                  <View style={[styles.legendLeft, { flexDirection: viewRtlStyle }]}>
                    <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                    <Text style={[styles.legendLabel, { color: bodyColor }]}>
                      {item.label}
                    </Text>
                  </View>
                  <Text style={[styles.legendValue, { color: titleColor }]}>
                    {item.value}
                  </Text>
                </View>
                {index < legend.length - 1 && (
                  <View style={[styles.legendDivider, { backgroundColor: borderColor }]} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* ---------- performance tiles ---------- */}
        <Text style={[styles.sectionTitle, { color: titleColor, textAlign: textRtlStyle }]}>
          {translateData?.drivePerformance || FALLBACK.drivePerformance}
        </Text>

        <View style={styles.tileGrid}>
          {tiles.map(tile => (
            <View
              key={tile.key}
              style={[styles.tile, { backgroundColor: cardBg, borderColor }]}
            >
              <View style={[styles.tileIcon, { backgroundColor: tile.soft }]}>
                <tile.Icon color={tile.tint} />
              </View>
              <Text
                style={[styles.tileValue, { color: titleColor, textAlign: textRtlStyle }]}
                numberOfLines={1}
              >
                {tile.value}
                {tile.unit ? (
                  <Text style={[styles.tileUnit, { color: bodyColor }]}> {tile.unit}</Text>
                ) : null}
              </Text>
              <Text
                style={[styles.tileLabel, { color: bodyColor, textAlign: textRtlStyle }]}
              >
                {tile.label}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
