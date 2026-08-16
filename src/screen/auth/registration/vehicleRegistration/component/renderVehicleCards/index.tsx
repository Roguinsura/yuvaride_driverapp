import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import {
  vehicleData,
  vehicleTypeDataGet,
} from '../../../../../../api/store/action/vehicleTypeAction'
import { AppDispatch } from '../../../../../../api/store'
import appColors from '../../../../../../theme/appColors'
import { useValues } from '../../../../../../utils/context'
import Icons from '../../../../../../utils/icons/icons'
import styles, { COLUMNS } from './styles'

/*
  Replaces the vehicle-type dropdown with a card grid showing the artwork the
  admin already configures per vehicle type (`vehicle_image_url`). A driver
  picking their vehicle recognises the shape faster than the word, and the
  images were being paid for in admin without ever being shown here.

  Props and the handleItemPress signature match the old RenderVehicleList, so
  this is a drop-in swap at both call sites.
*/

interface RenderVehicleCardsProps {
  handleItemPress: (
    index: number,
    name: string,
    itemid?: number,
    vehicle?: any,
  ) => void
  serviceId?: any
  categoryId?: number
  selectedVehicleID?: number
  editable?: boolean
  unscoped?: boolean
  /**
   * False while the service/category pair is still settling. Nothing is
   * fetched until it turns true, so the list never answers a question the
   * screen was in the middle of changing.
   */
  ready?: boolean
}

export function RenderVehicleCards({
  handleItemPress,
  serviceId,
  categoryId,
  selectedVehicleID,
  editable,
  unscoped,
  ready = true,
}: RenderVehicleCardsProps | any) {
  const { translateData } = useSelector((state: any) => state.setting)
  const dispatch = useDispatch<AppDispatch>()
  const { colors } = useTheme()
  const { isDark } = useValues()
  const [failedArt, setFailedArt] = useState<Record<number, boolean>>({})

  const waitingForService = !unscoped && (!serviceId || !ready)
  const fetchKey = unscoped ? 'all' : `${serviceId}-${categoryId ?? 0}`

  /*
    The rows come from the response we asked for, not from the redux store.

    Changing service fires a fetch while the category is still the old one,
    then the category resets to the new service's first and fires a second
    fetch. Both write to `state.vehicleType.vehicleTypedata`, so whichever
    resolved last won — when that was the stale wrong-category request (an
    empty list) the grid said "No vehicles available" even though the fetch it
    was actually waiting on had returned vehicles. Keeping the rows local means
    a superseded response is discarded outright instead of overwriting the
    good one. The dispatch stays so the store is still populated for everyone
    else reading it.

    `loadedKey` is which fetch those rows answer. It also separates "still
    waiting" from "answered, and the answer is none" — inferring loading from
    an empty list left a service with no vehicle types spinning forever.
  */
  const [rows, setRows] = useState<any[]>([])
  const [loadedKey, setLoadedKey] = useState('')
  const [failed, setFailed] = useState(false)
  const lastFetchRef = useRef<string>('')

  const load = useCallback(() => {
    if (waitingForService) return
    lastFetchRef.current = fetchKey
    setFailed(false)

    const action: any = unscoped
      ? dispatch(vehicleData())
      : dispatch(
          vehicleTypeDataGet({
            service_id: serviceId,
            service_category_id: categoryId ?? 0,
          }),
        )

    Promise.resolve(action)
      .then((res: any) => {
        // A newer service or category was picked while this was in flight.
        if (lastFetchRef.current !== fetchKey) return
        if (res?.error) {
          setFailed(true)
          setRows([])
        } else {
          // `allVehicle` comes back a bare array, vehicle types as { data }.
          const payload = res?.payload
          setRows(
            Array.isArray(payload)
              ? payload
              : Array.isArray(payload?.data)
                ? payload.data
                : [],
          )
        }
        setLoadedKey(fetchKey)
      })
      .catch(() => {
        if (lastFetchRef.current !== fetchKey) return
        setFailed(true)
        setRows([])
        setLoadedKey(fetchKey)
      })
  }, [waitingForService, fetchKey, unscoped, serviceId, categoryId, dispatch])

  useEffect(() => {
    if (waitingForService || fetchKey === lastFetchRef.current) return
    load()
  }, [waitingForService, fetchKey, load])

  /*
    The old dropdown auto-selected the first row on load. That is wrong here —
    it would submit a vehicle the driver never chose, and it also drives which
    documents get asked for. Selection stays empty until they tap.
  */

  if (waitingForService) {
    // No service yet is the driver's turn to act; a service without a settled
    // category is us still working, so it keeps the loading treatment.
    return serviceId ? (
      <View style={styles.stateWrap}>
        <ActivityIndicator color={appColors.primary} />
        <Text style={[styles.stateText, { color: colors.text }]}>
          {translateData?.loading || 'Loading vehicles…'}
        </Text>
      </View>
    ) : (
      <View style={styles.stateWrap}>
        <Text style={[styles.stateText, { color: colors.text }]}>
          {translateData?.selectVehicleFirst || 'Select a service first'}
        </Text>
      </View>
    )
  }

  if (loadedKey !== fetchKey) {
    return (
      <View style={styles.stateWrap}>
        <ActivityIndicator color={appColors.primary} />
        <Text style={[styles.stateText, { color: colors.text }]}>
          {translateData?.loading || 'Loading vehicles…'}
        </Text>
      </View>
    )
  }

  if (rows.length === 0) {
    return (
      <View style={styles.stateWrap}>
        <Text style={[styles.stateText, { color: colors.text }]}>
          {failed
            ? translateData?.somethingWentWrong || 'Could not load vehicles'
            : translateData?.noVehiclesAvailable ||
              'No vehicles available for this service'}
        </Text>
        {failed && (
          <TouchableOpacity
            style={styles.retry}
            activeOpacity={0.8}
            onPress={load}
          >
            <Text style={styles.retryText}>
              {translateData?.retry || 'Retry'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <View style={styles.grid}>
      {rows.map((vehicle: any, index: number) => {
        const selected = selectedVehicleID === vehicle.id
        const art = vehicle?.vehicle_image_url
        const showArt = Boolean(art) && !failedArt[vehicle.id]

        return (
          <TouchableOpacity
            key={vehicle.id ?? index}
            activeOpacity={0.85}
            disabled={editable}
            onPress={() =>
              // The row goes with it — the parent reads `seat` off it rather
              // than looking the vehicle up in the store again.
              handleItemPress(index, vehicle.name, vehicle.id, vehicle)
            }
            style={[
              styles.card,
              {
                backgroundColor: selected
                  ? isDark
                    ? 'rgba(248,111,0,0.16)'
                    : 'rgba(248,111,0,0.08)'
                  : colors.card,
                borderColor: selected ? appColors.primary : colors.border,
              },
            ]}
          >
            <View style={styles.artWrap}>
              {showArt ? (
                <Image
                  source={{ uri: art }}
                  style={styles.art}
                  resizeMode="contain"
                  onError={() =>
                    setFailedArt(prev => ({ ...prev, [vehicle.id]: true }))
                  }
                />
              ) : (
                // No artwork set in admin for this type.
                <View style={[styles.art, styles.artFallback]}>
                  <Icons.Car color={appColors.primary} />
                </View>
              )}
            </View>

            <Text
              style={[
                styles.name,
                { color: selected ? appColors.primary : colors.text },
              ]}
              numberOfLines={1}
            >
              {vehicle.name}
            </Text>

            {Boolean(vehicle?.seat) && (
              <Text
                style={[
                  styles.seats,
                  {
                    color: isDark
                      ? appColors.darkText
                      : appColors.secondaryFont,
                  },
                ]}
              >
                {`${vehicle.seat} ${
                  vehicle.seat > 1
                    ? translateData?.seats || 'seats'
                    : translateData?.seat || 'seat'
                }`}
              </Text>
            )}

            {selected && (
              <View style={styles.tick}>
                <Text style={styles.tickMark}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        )
      })}

      {Array.from({ length: (COLUMNS - (rows.length % COLUMNS)) % COLUMNS }).map(
        (_, i) => (
          <View key={`spacer-${i}`} style={styles.spacer} />
        ),
      )}
    </View>
  )
}
