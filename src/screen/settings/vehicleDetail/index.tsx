import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, ScrollView, BackHandler, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import styles from './styles'
import appColors from '../../../theme/appColors'
import brandColors from '../../../theme/brandColors'
import Icons from '../../../utils/icons/icons'
import { Header } from '../../../commonComponents'
import { useValues } from '../../../utils/context'
import { AppDispatch } from '../../../api/store'
import {
  categoryDataGet,
  serviceDataGet,
  vehicleTypeDataGet,
} from '../../../api/store/action'

const FALLBACK = {
  title: 'Vehicle Details',
  registration: 'REGISTRATION',
  vehicle: 'VEHICLE',
  driverProfile: 'DRIVER PROFILE',
  pricing: 'PRICING',
  ambulance: 'AMBULANCE',
  service: 'Service',
  category: 'Category',
  vehicleType: 'Vehicle type',
  vehicleName: 'Vehicle name',
  colour: 'Colour',
  seats: 'Maximum seats',
  experience: 'Experience',
  gearType: 'Gear type',
  description: 'Description',
  name: 'Name',
  years: 'years',
  perDay: 'Per day',
  perHour: 'Per hour',
  perKm: 'Per km',
  notSet: 'Not set',
  readOnly:
    'These details were submitted during registration. Contact support if anything needs to change.',
  rentalNotice:
    'Rental vehicles are managed individually. Open Vehicle List to see and manage them.',
  emptyTitle: 'No vehicle registered',
  emptyBody:
    'Once your vehicle registration is submitted and approved, its details will appear here.',
}

// A colour arrives as free text ("White", "#1B1B1B", sometimes junk). Feeding
// an unrecognised string straight to backgroundColor makes the swatch render
// as transparent, so only known-good values get a dot.
const NAMED_COLOURS = new Set([
  'white', 'black', 'red', 'blue', 'green', 'yellow', 'orange', 'grey',
  'gray', 'silver', 'brown', 'beige', 'maroon', 'navy', 'gold', 'purple',
  'pink', 'cyan', 'teal', 'ivory', 'tan',
])

const toSwatch = (raw?: string): string | null => {
  if (!raw) return null
  const value = raw.trim().toLowerCase()
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(value)) return value
  return NAMED_COLOURS.has(value) ? value : null
}

export function VehicleDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation()
  const { isDark, viewRtlStyle, textRtlStyle } = useValues()

  const { selfDriver } = useSelector((state: any) => state.account)
  const { translateData } = useSelector((state: any) => state.setting)
  const { vehicleTypedata } = useSelector((state: any) => state.vehicleType)
  const { serviceData } = useSelector((state: any) => state.service)
  const { categoryData } = useSelector((state: any) => state.serviceCategory)
  const { zoneValue } = useSelector((state: any) => state.zoneUpdate)

  const pageBg = isDark ? appColors.bgDark : appColors.graybackground
  const cardBg = isDark ? appColors.darkThemeSub : appColors.white
  const borderColor = isDark ? appColors.darkborder : appColors.border
  const titleColor = isDark ? appColors.white : brandColors.titleLight
  const bodyColor = isDark ? appColors.darkText : brandColors.bodyLight
  const softBg = isDark ? 'rgba(248,111,0,0.16)' : brandColors.primarySoft

  // `zoneValue` is an empty array until the zone lookup resolves, so an
  // unguarded currency_symbol prints the literal "undefined".
  const currency = zoneValue?.currency_symbol ?? ''

  const vehicle = selfDriver?.vehicle_info

  // The list endpoints previously loaded as a side effect of the picker
  // components this screen used to render. Those are gone, so the screen asks
  // for what it needs to resolve ids into names.
  useEffect(() => {
    dispatch(serviceDataGet())
    dispatch(categoryDataGet())
  }, [dispatch])

  useEffect(() => {
    if (!selfDriver?.service_id) return
    dispatch(
      vehicleTypeDataGet({
        service_id: selfDriver.service_id,
        service_category_id: selfDriver.service_category_id ?? 0,
      }),
    )
  }, [dispatch, selfDriver?.service_id, selfDriver?.service_category_id])

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack()
        return true
      }
      return false
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )
    return () => backHandler.remove()
  }, [navigation])

  const service = useMemo(
    () =>
      serviceData?.data?.find(
        (item: any) => Number(item?.id) === Number(selfDriver?.service_id),
      ),
    [serviceData, selfDriver?.service_id],
  )

  const categoryName = useMemo(
    () =>
      categoryData?.data?.find(
        (item: any) =>
          Number(item?.id) === Number(selfDriver?.service_category_id),
      )?.name,
    [categoryData, selfDriver?.service_category_id],
  )

  const vehicleType = useMemo(
    () =>
      vehicleTypedata?.data?.find(
        (item: any) => Number(item?.id) === Number(vehicle?.vehicle_type_id),
      ),
    [vehicleTypedata, vehicle?.vehicle_type_id],
  )

  const vehicleTypeName = vehicleType?.name

  /*
    Admin-uploaded artwork for the vehicle type — the same field rideInfo,
    rentalDetails and endRide render. Deliberately not vehicle_type_map_icon_url,
    which is the top-down sprite drawn for map pins. The API exposes a flattened
    url and a nested media object depending on the endpoint, so both are tried.
  */
  const vehicleArt =
    vehicleType?.vehicle_image_url ||
    vehicleType?.vehicle_image?.original_url ||
    null

  // The list is fetched scoped by service + category, so it can come back empty
  // (ambulance / find-driver especially) and the url can 404. Either way the
  // hero falls back to the line icon rather than showing an empty tile.
  const [artFailed, setArtFailed] = useState(false)
  useEffect(() => setArtFailed(false), [vehicleArt])
  const showArt = Boolean(vehicleArt) && !artFailed

  const serviceSlug = (service?.slug || '').toLowerCase().replace(/[-_]/g, '')
  const isAmbulance = serviceSlug === 'ambulance'
  const isFindDriver = serviceSlug === 'finddriver'
  const isRental = categoryName === 'Rental'

  const dash = translateData?.notSet || FALLBACK.notSet
  const show = (value: any) =>
    value === null || value === undefined || value === '' ? dash : String(value)

  /* ---------------- building blocks ---------------- */

  const SectionTitle = ({ text }: { text: string }) => (
    <Text
      style={[styles.sectionTitle, { color: bodyColor, textAlign: textRtlStyle }]}
    >
      {text}
    </Text>
  )

  const Card = ({ children }: { children: React.ReactNode }) => (
    <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
      {children}
    </View>
  )

  // `last` drops the divider on the final row so the card doesn't end on a line.
  const Row = ({
    label,
    value,
    swatch,
    last,
  }: {
    label: string
    value: any
    swatch?: string | null
    last?: boolean
  }) => (
    <>
      <View style={[styles.row, { flexDirection: viewRtlStyle }]}>
        <Text style={[styles.rowLabel, { color: bodyColor }]}>{label}</Text>
        <View style={[styles.rowValueWrap, { flexDirection: viewRtlStyle }]}>
          {swatch ? (
            <View
              style={[
                styles.swatch,
                { backgroundColor: swatch, borderColor },
              ]}
            />
          ) : null}
          <Text
            style={[styles.rowValue, { color: titleColor }]}
            numberOfLines={2}
          >
            {show(value)}
          </Text>
        </View>
      </View>
      {last ? null : (
        <View style={[styles.divider, { backgroundColor: borderColor }]} />
      )}
    </>
  )

  const PriceChip = ({ label, amount }: { label: string; amount: any }) => (
    <View
      style={[
        styles.priceChip,
        { backgroundColor: softBg, borderColor: brandColors.primaryBorder },
      ]}
    >
      <Text style={[styles.priceChipLabel, { color: bodyColor }]}>{label}</Text>
      <Text style={[styles.priceChipValue, { color: appColors.primary }]}>
        {currency}
        {show(amount)}
      </Text>
    </View>
  )

  const Notice = ({ text }: { text: string }) => (
    <View
      style={[
        styles.notice,
        { backgroundColor: cardBg, borderColor, flexDirection: viewRtlStyle },
      ]}
    >
      <View style={{ marginTop: 2 }}>
        <Icons.Info />
      </View>
      <Text style={[styles.noticeText, { color: bodyColor }]}>{text}</Text>
    </View>
  )

  /* ---------------- empty state ---------------- */

  if (!vehicle) {
    return (
      <View style={[styles.screen, { backgroundColor: pageBg }]}>
        <Header
          variant="brand"
          title={translateData?.vehicleDetails || FALLBACK.title}
        />
        <View style={styles.empty}>
          <Icons.vehicleSetting color={appColors.secondaryFont} />
          <Text style={[styles.emptyTitle, { color: titleColor }]}>
            {FALLBACK.emptyTitle}
          </Text>
          <Text style={[styles.emptyBody, { color: bodyColor }]}>
            {FALLBACK.emptyBody}
          </Text>
        </View>
      </View>
    )
  }

  /* ---------------- screen ---------------- */

  const heroName = isAmbulance
    ? vehicle?.name || vehicle?.model
    : vehicle?.model || vehicle?.name

  const heroMeta = [service?.name, categoryName].filter(Boolean).join('  ·  ')

  return (
    <View style={[styles.screen, { backgroundColor: pageBg }]}>
      <Header
        variant="brand"
        title={translateData?.vehicleDetails || FALLBACK.title}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/*
          The hero is brand orange in both themes — it is an accent card on the
          page, not a chrome band, so it does not follow the header's
          light-mode-only rule. Everything on it inverts to white.
        */}
        <View
          style={[
            styles.hero,
            {
              backgroundColor: appColors.primary,
              borderColor: appColors.primary,
            },
          ]}
        >
          <View style={[styles.heroTop, { flexDirection: viewRtlStyle }]}>
            <View
              style={[
                styles.heroIcon,
                { backgroundColor: 'rgba(255,255,255,0.18)' },
              ]}
            >
              {showArt ? (
                <Image
                  source={{ uri: vehicleArt }}
                  style={styles.heroImage}
                  resizeMode="contain"
                  onError={() => setArtFailed(true)}
                />
              ) : (
                <Icons.vehicleSetting color={appColors.white} />
              )}
            </View>
            <View style={styles.heroText}>
              <Text
                style={[
                  styles.heroName,
                  { color: appColors.white, textAlign: textRtlStyle },
                ]}
                numberOfLines={1}
              >
                {show(heroName)}
              </Text>
              {heroMeta ? (
                <Text
                  style={[
                    styles.heroMeta,
                    {
                      color: 'rgba(255,255,255,0.85)',
                      textAlign: textRtlStyle,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {heroMeta}
                </Text>
              ) : null}
            </View>
          </View>

          {/* Ambulance and Find Driver registrations carry no plate. */}
          {!isAmbulance && !isFindDriver && vehicle?.plate_number ? (
            <View
              style={[
                styles.plate,
                {
                  borderColor: appColors.white,
                  backgroundColor: appColors.white,
                },
              ]}
            >
              <Text style={[styles.plateText, { color: appColors.primary }]}>
                {String(vehicle.plate_number).toUpperCase()}
              </Text>
            </View>
          ) : null}
        </View>

        <SectionTitle text={FALLBACK.registration} />
        <Card>
          {/*
            Deliberately not using translateData.selectService /
            selectCategory here: those strings read "Select Service" and
            "Select Category", which was right on the signup form but wrong on
            a read-only card. Plain nouns instead.
          */}
          <Row label={FALLBACK.service} value={service?.name} />
          <Row
            label={FALLBACK.category}
            value={categoryName}
            last={isAmbulance || isRental}
          />
          {!isAmbulance && !isRental ? (
            <Row
              label={FALLBACK.vehicleType}
              value={vehicleTypeName}
              last
            />
          ) : null}
        </Card>

        {isRental ? (
          <Notice text={FALLBACK.rentalNotice} />
        ) : isAmbulance ? (
          <>
            <SectionTitle text={FALLBACK.ambulance} />
            <Card>
              <Row
                label={translateData?.ambulanceName || FALLBACK.name}
                value={vehicle?.name}
                last={!vehicle?.description}
              />
              {vehicle?.description ? (
                <View style={styles.descBlock}>
                  <Text style={[styles.descLabel, { color: bodyColor }]}>
                    {translateData?.ambulanceDescription ||
                      FALLBACK.description}
                  </Text>
                  <Text
                    style={[
                      styles.descValue,
                      { color: titleColor, textAlign: textRtlStyle },
                    ]}
                  >
                    {vehicle.description}
                  </Text>
                </View>
              ) : null}
            </Card>
          </>
        ) : isFindDriver ? (
          <>
            <SectionTitle text={FALLBACK.driverProfile} />
            <Card>
              <Row
                label={FALLBACK.experience}
                value={
                  selfDriver?.experience
                    ? `${selfDriver.experience} ${FALLBACK.years}`
                    : null
                }
              />
              <Row
                label={FALLBACK.gearType}
                value={
                  selfDriver?.gear_type
                    ? String(selfDriver.gear_type).replace(/^./, c =>
                        c.toUpperCase(),
                      )
                    : null
                }
                last
              />
            </Card>

            <SectionTitle text={FALLBACK.pricing} />
            <Card>
              <View style={[styles.priceRow, { flexDirection: viewRtlStyle }]}>
                {selfDriver?.per_day_charge ? (
                  <PriceChip
                    label={FALLBACK.perDay}
                    amount={selfDriver.per_day_charge}
                  />
                ) : null}
                {selfDriver?.per_hour_charge ? (
                  <PriceChip
                    label={FALLBACK.perHour}
                    amount={selfDriver.per_hour_charge}
                  />
                ) : null}
                {selfDriver?.per_km_charge ? (
                  <PriceChip
                    label={FALLBACK.perKm}
                    amount={selfDriver.per_km_charge}
                  />
                ) : null}
                {!selfDriver?.per_day_charge &&
                !selfDriver?.per_hour_charge &&
                !selfDriver?.per_km_charge ? (
                  <Text style={[styles.rowLabel, { color: bodyColor }]}>
                    {dash}
                  </Text>
                ) : null}
              </View>
            </Card>
          </>
        ) : (
          <>
            <SectionTitle text={FALLBACK.vehicle} />
            <Card>
              <Row
                label={translateData?.vehicleName || FALLBACK.vehicleName}
                value={vehicle?.model}
              />
              <Row
                label={translateData?.vehicleColor || FALLBACK.colour}
                value={vehicle?.color}
                swatch={toSwatch(vehicle?.color)}
              />
              <Row
                label={translateData?.maximumSeats || FALLBACK.seats}
                value={vehicle?.seat}
                last
              />
            </Card>
          </>
        )}

        <Notice text={FALLBACK.readOnly} />
      </ScrollView>
    </View>
  )
}
