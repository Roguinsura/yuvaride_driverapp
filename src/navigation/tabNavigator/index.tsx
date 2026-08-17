import React, { useMemo, useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '../../screen/home'
import { MyRide, Settings } from '../../screen'
import { Text, TouchableOpacity, Vibration, View } from 'react-native'
import appColors from '../../theme/appColors'
import Icons from '../../utils/icons/icons'
import styles, { TAB_BAR_CONTENT_HEIGHT } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import spacing from '../../theme/spacing'
import { useSelector } from 'react-redux'
import { useValues } from '../../utils/context'
import { DashBoard } from '../../screen/dashBoard'
import { FleetDashBoard, FleetHome } from '../../screen/fleet'
import { useTabGuard } from '../../utils/hooks'

const Tab = createBottomTabNavigator()

/*
  Tab bar palette. Light mode keeps the brand orange bar, so the active pill is
  a translucent white lozenge. Dark mode takes the same surface as the headers,
  where a solid orange pill is what carries the brand instead.
*/
const tabPalette = (isDark: boolean) => ({
  bar: isDark ? appColors.darkThemeSub : appColors.primary,
  border: isDark ? appColors.darkborder : 'transparent',
  activePill: isDark ? appColors.primary : appColors.white,
  // The icon has to invert against its own pill: orange on the white pill,
  // white on the orange one. Using white for both would make the light-mode
  // icon vanish into the pill.
  activeIcon: isDark ? appColors.white : appColors.primary,
  // The label sits below the pill, directly on the bar, so it stays white in
  // both modes.
  activeLabel: appColors.white,
  inactive: isDark ? appColors.categoryTitle : 'rgba(255,255,255,0.72)',
})

type Palette = ReturnType<typeof tabPalette>

const TabLabel = React.memo(
  ({
    focused,
    label,
    rtl,
    palette,
  }: {
    focused: boolean
    label: string
    rtl: boolean
    palette: Palette
  }) => (
    <Text
      style={[
        styles.tabBarLabelStyle,
        {
          color: focused ? palette.activeLabel : palette.inactive,
          textAlign: rtl ? 'right' : 'left',
          writingDirection: rtl ? 'rtl' : 'ltr',
        },
      ]}
    >
      {label}
    </Text>
  ),
)

const TabIcon = React.memo(
  ({
    Icon,
    focused,
    palette,
  }: {
    Icon: any
    focused: boolean
    palette: Palette
  }) => (
    <View
      style={[
        styles.iconWrap,
        focused && { backgroundColor: palette.activePill },
      ]}
    >
      <Icon color={focused ? palette.activeIcon : palette.inactive} />
    </View>
  ),
)

export default function App() {
  const { translateData } = useSelector((state: any) => state.setting)
  const { rtl, isDark } = useValues()
  const insets = useSafeAreaInsets()
  const { selfDriver } = useSelector((state: any) => state.account)
  const palette = useMemo(() => tabPalette(isDark), [isDark])

  const defaultTranslations = useMemo(() => ({
    home: 'Home',
    activeRide: 'DashBoard',
    myRide: 'My Ride',
    settings: 'Settings',
  }), [])

  const t = translateData || defaultTranslations
  const type = selfDriver?.role

  const screens = useMemo(() => {
    return type === 'driver'
      ? [
        {
          name: 'Home',
          component: Home,
          icon: Icons.Home,
          label: t.home,
        },
        {
          name: 'DashBoard',
          component: DashBoard,
          icon: Icons.DashBoard,
          label: translateData?.dashboard,
        },
        {
          name: 'My Ride',
          component: MyRide,
          icon: Icons.Car,
          label: t.myRide,
        },
        {
          name: 'Settings',
          component: Settings,
          icon: Icons.Setting,
          label: t.settings,
        },
      ]
      : [
        {
          name: 'Home',
          component: FleetHome,
          icon: Icons.Home,
          label: t.home,
        },
        {
          name: 'DashBoard',
          component: DashBoard,
          icon: Icons.DashBoard,
          label: translateData?.dashboard,
        },
        {
          name: 'FleetDashBoard',
          component: FleetDashBoard,
          icon: Icons.DriverTab,
          label: translateData?.drivers,
        },
        {
          name: 'Settings',
          component: Settings,
          icon: Icons.Setting,
          label: t.settings,
        },
      ]
  }, [type, t.home, t.myRide, t.settings, translateData?.dashboard])

  // Memoize ordered screens to prevent unnecessary array operations
  const orderedScreens = useMemo(() => {
    return rtl ? [...screens].reverse() : screens
  }, [rtl, screens])

  const { guardedPress } = useTabGuard(400); // 400ms guard specifically for SAME TAB re-clicking

  // Vibration and Navigation handler
  const handleTabPress = useCallback((name: string, onPress: () => void, isSelected: boolean) => {
    // If user is already on the tab, block spamming/refreshing too fast
    if (isSelected) {
      guardedPress(`${name}_selected`, () => {
        Vibration.vibrate(20);
        onPress(); // This triggers "scroll to top" or "refresh" logic
      });
      return;
    }

    // ALWAYS allow switching to a DIFFERENT tab instantly for zero lag
    Vibration.vibrate(42);
    onPress();
  }, [guardedPress]);


  /*
    Height and bottom padding include the safe-area inset, so the labels clear
    Android's gesture bar (and the home indicator on iOS). The bar is absolutely
    positioned and the root SafeAreaView excludes the bottom edge, so nothing
    else applies that inset for us.

    On a device with no bottom inset this is simply the 68 the spec asks for.
  */
  const screenOptions = useMemo(() => ({
    tabBarStyle: [
      styles.tabBarContainer,
      {
        height: TAB_BAR_CONTENT_HEIGHT + insets.bottom,
        paddingBottom: insets.bottom + spacing.xxs,
        backgroundColor: palette.bar,
        borderTopWidth: isDark ? 1 : 0,
        borderTopColor: palette.border,
      },
    ],
    headerShown: false,
  }), [palette, isDark, insets.bottom])

  return (
    <Tab.Navigator
      initialRouteName='Home'
      detachInactiveScreens={false}
      screenOptions={screenOptions}
    >
      {orderedScreens.map(({ name, component, icon: Icon, label }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            unmountOnBlur: false,
            lazy: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon Icon={Icon} focused={focused} palette={palette} />
            ),
            tabBarButton: (props: any) => (
              <TouchableOpacity
                {...props}
                onPress={() => handleTabPress(name, props.onPress, props.accessibilityState?.selected)}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <TabLabel
                focused={focused}
                label={label}
                rtl={rtl}
                palette={palette}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

