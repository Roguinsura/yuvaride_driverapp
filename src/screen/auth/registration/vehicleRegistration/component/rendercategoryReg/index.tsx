import React, { useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import appColors from '../../../../../../theme/appColors'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import DropDownPicker from 'react-native-dropdown-picker'
import { useValues } from '../../../../../../utils/context'
import { fontSizes, windowHeight } from '../../../../../../theme/appConstant'
import styles from '../renderCategoryList/styles'

/*
  A controlled picker: the categories to offer and the one selected are both
  props, and picking one is reported straight back up.

  It used to hold its own selection and derive its own list from the store,
  resetting itself in an effect whenever the service changed. That reset landed
  a render later than the service change, so for one render the new service was
  paired with the old service's category — and the vehicle list fetched that
  invalid pair. Owning nothing removes the window entirely.
*/

interface RenderCategoryRegProps {
  /** Categories belonging to the selected service. */
  categories: any[]
  selectedCategoryID?: number
  onSelect: (category: any, index: number) => void
}

export function RenderCategoryReg({
  categories,
  selectedCategoryID,
  onSelect,
}: RenderCategoryRegProps | any) {
  const { colors } = useTheme()
  const { rtl, isDark, viewRtlStyle } = useValues()
  const { translateData } = useSelector((state: any) => state.setting)
  const [open, setOpen] = useState<boolean>(false)

  const rows: any[] = Array.isArray(categories) ? categories : []

  const items = useMemo(
    () =>
      rows.map((item: any) => ({
        label: item.name,
        value: item.id,
      })),
    [rows],
  )

  // DropDownPicker hands back either the new value or an updater.
  const handleSetValue = (valueOrUpdater: any) => {
    const next =
      typeof valueOrUpdater === 'function'
        ? valueOrUpdater(selectedCategoryID ?? null)
        : valueOrUpdater
    const index = rows.findIndex((item: any) => item.id === next)
    if (index !== -1) onSelect(rows[index], index)
  }

  return (
    <View>
      <DropDownPicker
        open={open}
        value={selectedCategoryID ?? null}
        items={items}
        setOpen={setOpen}
        setValue={handleSetValue}
        setItems={() => { }}
        placeholder={translateData.selectCategory}
        containerStyle={styles.container}
        placeholderStyle={[
          styles.placeholderStyles,
          {
            color: isDark ? appColors.darkText : appColors.secondaryFont,
          },
        ]}
        style={{
          backgroundColor: isDark ? appColors.darkThemeSub : appColors.white,
          borderColor: open ? appColors.primary : colors.border,
          flexDirection: viewRtlStyle,
          paddingHorizontal: windowHeight(1.9),
        }}
        dropDownContainerStyle={{
          backgroundColor: isDark ? colors.card : appColors.dropDownColor,
          borderColor: open ? appColors.border : colors.border,
          marginTop: 1,
        }}
        labelStyle={[
          styles.text,
          { color: isDark ? appColors.white : appColors.black },
        ]}
        listItemLabelStyle={{
          color: isDark ? appColors.white : appColors.black,
        }}
        tickIconStyle={{
          tintColor: isDark ? appColors.white : appColors.black,
        }}
        arrowIconStyle={{
          tintColor: isDark ? appColors.white : appColors.black,
        }}
        textStyle={{
          textAlign: rtl ? 'right' : 'left',
          fontSize: fontSizes.FONT4,
          color: colors.text,
        }}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          nestedScrollEnabled: true,
        }}
        zIndex={3}
        listMode="SCROLLVIEW"
        dropDownDirection="AUTO"
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: windowHeight(1.3),
              zIndex: 2,
            }}
          >
            <Text style={{ color: colors.text }}>
              {translateData?.selectServiceFirst}
            </Text>
          </View>
        )}
      />
    </View>
  )
}
