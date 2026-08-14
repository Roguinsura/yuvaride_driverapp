import React, { useState, useRef, useEffect } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  BackHandler,
} from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import appColors from '../../../theme/appColors'
import brandColors from '../../../theme/brandColors'
import { Header } from '../../../commonComponents'
import Icons from '../../../utils/icons/icons'
import { useValues } from '../../../utils/context'
import localStyles, {
  CHART_HEIGHT,
  BAR_SLOT,
  GRID_ROWS,
} from './styles'

const FALLBACK = {
  totalEarning: 'Total Earnings',
  day: 'Day',
  week: 'Week',
  month: 'Month',
  income: 'Income',
  averageEarnings: 'Average earnings',
  averageRides: 'Average rides',
  highestRecord: 'Highest record',
  noDataAvailable: 'No data available',
  date: 'Date',
  periodTotal: 'Total for this period',
}

// The period a tab represents is kept separate from the text on it. They used
// to be the same value — the tab label came from `translateData`, but the
// switch that picked the data compared against the literals 'Day'/'Week'/
// 'Month', so any translation other than exactly those English words silently
// fell through to the default branch and every tab showed day data.
type PeriodKey = 'Day' | 'Week' | 'Month'
const PERIOD_KEYS: PeriodKey[] = ['Day', 'Week', 'Month']

export function TotalEarnings() {
  const { dashBoardList } = useSelector((state: any) => state.dashboard)
  const { translateData } = useSelector((state: any) => state.setting)
  const { isDark, viewRtlStyle, textRtlStyle } = useValues()
  const navigation = useNavigation<any>()

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('Day')
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null)
  const chartScrollViewRef = useRef<ScrollView>(null)

  const pageBg = isDark ? appColors.bgDark : appColors.graybackground
  const cardBg = isDark ? appColors.darkThemeSub : appColors.white
  const borderColor = isDark ? appColors.darkborder : appColors.border
  const titleColor = isDark ? appColors.white : brandColors.titleLight
  const bodyColor = isDark ? appColors.darkText : brandColors.bodyLight

  const currency = dashBoardList?.ride?.currency_symbol || ''

  const periodLabels: Record<PeriodKey, string> = {
    Day: translateData?.day || FALLBACK.day,
    Week: translateData?.week || FALLBACK.week,
    Month: translateData?.month || FALLBACK.month,
  }

  /* -------------------- data for the active period -------------------- */
  // Every one of these can be missing while the dashboard call is in flight,
  // so they are normalised to arrays before any math touches them.
  const sourceByPeriod: Record<PeriodKey, { values: any; labels: any; averages: any; record: any }> = {
    Day: {
      values: dashBoardList?.day?.dayRevenues?.revenues,
      labels: dashBoardList?.day?.dayRevenues?.days,
      averages: null,
      record: dashBoardList?.day?.highest_records?.daily,
    },
    Week: {
      values: dashBoardList?.week?.weekRevenues?.revenues,
      labels: dashBoardList?.week?.weekRevenues?.days,
      averages: dashBoardList?.week?.averages,
      record: dashBoardList?.week?.highest_records?.weekly,
    },
    Month: {
      values: dashBoardList?.month?.monthRevenues?.revenues,
      labels: dashBoardList?.month?.monthRevenues?.months,
      averages: dashBoardList?.month?.averages,
      record: dashBoardList?.month?.highest_records?.monthly,
    },
  }

  const active = sourceByPeriod[selectedPeriod]
  const chartData: number[] = Array.isArray(active.values)
    ? active.values.map((v: any) => Number(v) || 0)
    : []
  const rawLabels: any[] = Array.isArray(active.labels) ? active.labels : []
  const labels = rawLabels.slice(0, chartData.length)

  const maxValue = chartData.length > 0 ? Math.max(...chartData) : 0
  const yAxisMax = Math.max(30, Math.ceil(maxValue / 5) * 5)
  const gridValues = Array.from({ length: GRID_ROWS }, (_, i) =>
    Math.round((yAxisMax * (GRID_ROWS - 1 - i)) / (GRID_ROWS - 1)),
  )

  const periodTotal = chartData.reduce((sum, v) => sum + v, 0)

  const formatAmount = (value: any) => {
    const num = Number(value)
    if (!isFinite(num)) return '0'
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  /* -------------------- interaction -------------------- */
  const changePeriod = (period: PeriodKey) => {
    setSelectedPeriod(period)
    setSelectedBarIndex(null)
  }

  useEffect(() => {
    chartScrollViewRef.current?.scrollTo({ x: 0, animated: true })
  }, [selectedPeriod])

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

  // The floating tooltip that used to hover over the tapped bar needed the
  // scroll offset and a fudged width to place itself, and clipped at the edges
  // of the chart. This readout sits above the chart instead: always visible,
  // and it just reflects whatever is selected.
  const hasSelection =
    selectedBarIndex !== null && chartData[selectedBarIndex] !== undefined
  const readoutLabel = hasSelection
    ? `${translateData?.income || FALLBACK.income} · ${labels[selectedBarIndex as number] ?? ''}`
    : FALLBACK.periodTotal
  const readoutValue = hasSelection
    ? chartData[selectedBarIndex as number]
    : periodTotal

  const averages = active.averages
  const record = active.record

  return (
    <View style={localStyles.screen}>
      <Header variant="brand" title={translateData?.totalEarning || FALLBACK.totalEarning} />

      <ScrollView
        style={[localStyles.body, { backgroundColor: pageBg }]}
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- period switcher ---------- */}
        <View
          style={[
            localStyles.segment,
            { backgroundColor: cardBg, borderColor, flexDirection: viewRtlStyle },
          ]}
        >
          {PERIOD_KEYS.map(key => {
            const isActive = selectedPeriod === key
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.8}
                onPress={() => changePeriod(key)}
                style={[
                  localStyles.segmentItem,
                  isActive && localStyles.segmentItemActive,
                ]}
              >
                <Text
                  style={[
                    localStyles.segmentText,
                    { color: bodyColor },
                    isActive && localStyles.segmentTextActive,
                  ]}
                >
                  {periodLabels[key]}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* ---------- chart ---------- */}
        <View
          style={[
            localStyles.card,
            localStyles.chartCard,
            { backgroundColor: cardBg, borderColor },
          ]}
        >
          <View style={localStyles.readout}>
            <Text
              style={[localStyles.readoutLabel, { color: bodyColor, textAlign: textRtlStyle }]}
            >
              {readoutLabel}
            </Text>
            <Text
              style={[localStyles.readoutValue, { color: titleColor, textAlign: textRtlStyle }]}
            >
              {currency}
              {formatAmount(readoutValue)}
            </Text>
          </View>

          {chartData.length === 0 ? (
            <View style={localStyles.emptyChart}>
              <Text style={[localStyles.emptyText, { color: bodyColor }]}>
                {translateData?.noDataAvailable || FALLBACK.noDataAvailable}
              </Text>
            </View>
          ) : (
            <View style={localStyles.chartRow}>
              <View style={localStyles.yAxis}>
                {gridValues.map((value, i) => (
                  <Text key={`y-${i}`} style={localStyles.yAxisLabel}>
                    {value}
                  </Text>
                ))}
              </View>

              <View style={localStyles.plot}>
                {/* Grid lines are static: they span the full width and never
                    scroll, so they live behind the scroller rather than in it. */}
                <View style={localStyles.gridLayer} pointerEvents="none">
                  {gridValues.map((_, i) => (
                    <View
                      key={`grid-${i}`}
                      style={[localStyles.gridLine, { borderTopColor: borderColor }]}
                    />
                  ))}
                </View>

                <ScrollView
                  ref={chartScrollViewRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={localStyles.barsRow}>
                    {chartData.map((value, index) => {
                      const isActive = selectedBarIndex === index
                      const barHeight = Math.max(
                        (value / yAxisMax) * CHART_HEIGHT,
                        value > 0 ? 3 : 0,
                      )
                      return (
                        <Pressable
                          key={`bar-${index}`}
                          style={localStyles.barSlot}
                          onPress={() =>
                            setSelectedBarIndex(isActive ? null : index)
                          }
                        >
                          <View style={localStyles.barTrack}>
                            <View
                              style={[
                                localStyles.bar,
                                {
                                  height: barHeight,
                                  backgroundColor:
                                    selectedBarIndex === null || isActive
                                      ? appColors.primary
                                      : brandColors.primaryBorder,
                                },
                              ]}
                            />
                          </View>
                          <Text
                            numberOfLines={1}
                            style={[
                              localStyles.barLabel,
                              { width: BAR_SLOT, textAlign: 'center' },
                              isActive && localStyles.barLabelActive,
                            ]}
                          >
                            {labels[index] ?? ''}
                          </Text>
                        </Pressable>
                      )
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          )}
        </View>

        {/* ---------- averages (week + month only) ---------- */}
        {averages && (
          <View style={[localStyles.avgRow, { flexDirection: viewRtlStyle }]}>
            <View
              style={[localStyles.avgTile, { backgroundColor: cardBg, borderColor }]}
            >
              <View
                style={[
                  localStyles.avgIcon,
                  { backgroundColor: isDark ? 'rgba(248,111,0,0.18)' : brandColors.primarySoft },
                ]}
              >
                {/* Draws itself in appColors.primary, so it follows the brand. */}
                <Icons.Doller />
              </View>
              <Text
                style={[localStyles.avgValue, { color: titleColor, textAlign: textRtlStyle }]}
                numberOfLines={1}
              >
                {currency}
                {formatAmount(averages?.average_earnings)}
              </Text>
              <Text
                style={[localStyles.avgLabel, { color: bodyColor, textAlign: textRtlStyle }]}
              >
                {translateData?.averageEarnings || FALLBACK.averageEarnings}
              </Text>
            </View>

            <View
              style={[localStyles.avgTile, { backgroundColor: cardBg, borderColor }]}
            >
              <View
                style={[
                  localStyles.avgIcon,
                  { backgroundColor: isDark ? 'rgba(63,143,218,0.16)' : '#EAF2FB' },
                ]}
              >
                <Icons.Car color="#3F8FDA" />
              </View>
              {/*
                This used to render `{rides} {driver_performance.unit}`, which
                stuck the distance unit onto a ride count — an average of 12
                rides displayed as "12 km".
              */}
              <Text
                style={[localStyles.avgValue, { color: titleColor, textAlign: textRtlStyle }]}
                numberOfLines={1}
              >
                {formatAmount(averages?.average_rides)}
              </Text>
              <Text
                style={[localStyles.avgLabel, { color: bodyColor, textAlign: textRtlStyle }]}
              >
                {translateData?.averageRides || FALLBACK.averageRides}
              </Text>
            </View>
          </View>
        )}

        {/* ---------- highest record ---------- */}
        <Text
          style={[localStyles.sectionTitle, { color: titleColor, textAlign: textRtlStyle }]}
        >
          {translateData?.highestRecord || FALLBACK.highestRecord}
        </Text>

        <View
          style={[
            localStyles.card,
            localStyles.recordCard,
            { backgroundColor: cardBg, borderColor, flexDirection: viewRtlStyle },
          ]}
        >
          <View style={localStyles.recordIcon}>
            <Icons.Calander />
          </View>
          <View style={localStyles.recordTextWrap}>
            <Text
              style={[localStyles.recordLabel, { color: bodyColor, textAlign: textRtlStyle }]}
            >
              {translateData?.date || FALLBACK.date}
            </Text>
            <Text
              style={[localStyles.recordDate, { color: titleColor, textAlign: textRtlStyle }]}
            >
              {record?.date || (translateData?.noDataAvailable || FALLBACK.noDataAvailable)}
            </Text>
          </View>
          {record?.date ? (
            <Text style={localStyles.recordAmount}>
              {currency}
              {formatAmount(record?.amount)}
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  )
}
