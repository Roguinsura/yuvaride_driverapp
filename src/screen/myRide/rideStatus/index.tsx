import React, { useState, useMemo, memo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

import appColors from '../../../theme/appColors'
import brandColors from '../../../theme/brandColors'
import { styles } from './styles'
import RideContainer from '../rideContainer/index'
import { useValues } from '../../../utils/context'

const FALLBACK = {
  upcoming: 'Upcoming',
  active: 'Active',
  past: 'Past',
}

// The tab's identity is the `status` it filters by, kept separate from the text
// drawn on it so a translated label can never break the filtering.
const TABS = [
  { status: 'schedule', fallback: FALLBACK.upcoming, key: 'upcoming' },
  { status: 'accepted', fallback: FALLBACK.active, key: 'active' },
  { status: 'past', fallback: FALLBACK.past, key: 'past' },
]

type Props = {
  refreshing?: boolean
  onRefresh?: () => void
}

export function RideStatus({ refreshing, onRefresh }: Props) {
  const { isDark, viewRtlStyle } = useValues()
  const { translateData } = useSelector((state: any) => state.setting)
  const [selected, setSelected] = useState(0)

  const cardBg = isDark ? appColors.darkThemeSub : appColors.white
  const borderColor = isDark ? appColors.darkborder : appColors.border
  const bodyColor = isDark ? appColors.darkText : brandColors.bodyLight

  const activeStatus = useMemo(() => TABS[selected].status, [selected])

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.segment,
          { backgroundColor: cardBg, borderColor, flexDirection: viewRtlStyle },
        ]}
      >
        {TABS.map((tab, index) => {
          const isActive = selected === index
          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.8}
              onPress={() => setSelected(index)}
              style={[
                styles.segmentItem,
                isActive && styles.segmentItemActive,
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: bodyColor },
                  isActive && styles.segmentTextActive,
                ]}
              >
                {translateData?.[tab.key] || tab.fallback}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <View style={{ flex: 1 }}>
        <RideContainer
          status={activeStatus}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </View>
  )
}

export default memo(RideStatus)
