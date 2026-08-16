import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import documentServices from '../../../../../../api/services/documentService'
import appColors from '../../../../../../theme/appColors'
import { useValues } from '../../../../../../utils/context'
import Icons from '../../../../../../utils/icons/icons'
import styles from './styles'

/*
  Vehicle documents for the vehicle type the driver just picked.

  The backend already scopes these: GET document?type=vehicle&vehicle_type_id=N
  returns documents with no vehicle types attached (they apply to everyone) plus
  the ones the admin attached to this type. So configuring PUC and RC against
  "Bike" in admin is all it takes for a bike driver to be asked for them here,
  and a car driver not to be.

  This component owns the list, the picked files and the expiry dates, and
  reports the whole lot up through onChange — so the parent screen holds one
  piece of state instead of four.
*/

export type VehicleDocumentsState = {
  /** Document rows returned for this vehicle type. */
  documents: any[]
  /** slug -> picked file ({ uri, type, name }). */
  uploads: Record<string, any>
  /** slug -> 'YYYY-MM-DD'. */
  expiryDates: Record<string, string>
  /** False while a required document is missing a file or a needed date. */
  isComplete: boolean
}

interface Props {
  vehicleTypeId?: number | null
  /** Set true after a failed submit to surface per-document errors. */
  showErrors?: boolean
  onChange: (state: VehicleDocumentsState) => void
}

export function VehicleDocuments({
  vehicleTypeId,
  showErrors,
  onChange,
}: Props) {
  const { colors } = useTheme()
  const { isDark, viewRtlStyle, textRtlStyle } = useValues()
  const { translateData } = useSelector((state: any) => state.setting)

  const [documents, setDocuments] = useState<any[]>([])
  const [uploads, setUploads] = useState<Record<string, any>>({})
  const [expiryDates, setExpiryDates] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [datePicker, setDatePicker] = useState<{
    visible: boolean
    slug: string | null
  }>({ visible: false, slug: null })
  // Sample image opened full screen. The thumbnail is too small to judge
  // whether your own photo matches it.
  const [preview, setPreview] = useState<{ uri: string; title: string } | null>(
    null,
  )

  const subText = isDark ? appColors.darkText : appColors.secondaryFont

  // Guards against a slow response for a vehicle type the driver has since
  // changed away from overwriting the current list.
  const requestRef = useRef(0)

  useEffect(() => {
    if (!vehicleTypeId) {
      setDocuments([])
      setUploads({})
      setExpiryDates({})
      return
    }

    const ticket = ++requestRef.current
    setLoading(true)
    // Files picked for a different vehicle are not valid for this one.
    setUploads({})
    setExpiryDates({})

    documentServices
      .documentType({ type: 'vehicle', vehicleTypeId })
      .then((res: any) => {
        if (ticket !== requestRef.current) return
        const rows = res?.data?.data
        setDocuments(Array.isArray(rows) ? rows : [])
      })
      .catch(() => {
        if (ticket !== requestRef.current) return
        setDocuments([])
      })
      .finally(() => {
        if (ticket !== requestRef.current) return
        setLoading(false)
      })
  }, [vehicleTypeId])

  const missingFor = useCallback(
    (doc: any) => {
      const file = uploads[doc.slug]
      const needsDate = doc.need_expired_date === 1
      if (doc.is_required !== 1) {
        // Optional, but a date is still required once a file is attached.
        return Boolean(file) && needsDate && !expiryDates[doc.slug]
      }
      return !file || (needsDate && !expiryDates[doc.slug])
    },
    [uploads, expiryDates],
  )

  useEffect(() => {
    onChange({
      documents,
      uploads,
      expiryDates,
      isComplete: !documents.some(missingFor),
    })
    // onChange is recreated by the parent each render; depending on it here
    // would loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents, uploads, expiryDates, missingFor])

  const pick = async (slug: string, source: 'camera' | 'gallery') => {
    try {
      const options: any = { mediaType: 'photo', quality: 0.8 }
      const res: any =
        source === 'camera'
          ? await launchCamera(options)
          : await launchImageLibrary(options)
      const file = res?.assets?.[0]
      if (!file?.uri) return
      setUploads(prev => ({
        ...prev,
        [slug]: {
          uri: file.uri,
          type: file.type,
          name: file.fileName || `${slug}.jpg`,
        },
      }))
    } catch (err) {
    }
  }

  const remove = (slug: string) => {
    setUploads(prev => {
      const next = { ...prev }
      delete next[slug]
      return next
    })
    setExpiryDates(prev => {
      const next = { ...prev }
      delete next[slug]
      return next
    })
  }

  const onDateChange = (event: any, selected?: Date) => {
    const slug = datePicker.slug
    if (event?.type === 'set' && selected && slug) {
      setExpiryDates(prev => ({
        ...prev,
        [slug]: new Date(selected).toISOString().split('T')[0],
      }))
    }
    setDatePicker({ visible: false, slug: null })
  }

  if (!vehicleTypeId) return null

  if (loading) {
    return (
      <View style={[styles.stateWrap, { borderColor: colors.border }]}>
        <ActivityIndicator color={appColors.primary} />
        <Text style={[styles.stateTitle, { color: subText }]}>
          {translateData?.loading || 'Checking required documents…'}
        </Text>
      </View>
    )
  }

  if (documents.length === 0) {
    return (
      <View style={[styles.stateWrap, { borderColor: colors.border }]}>
        <View style={styles.okBadge}>
          <Text style={styles.okBadgeMark}>✓</Text>
        </View>
        <Text style={[styles.stateTitle, { color: colors.text }]}>
          {translateData?.noDocumentsNeeded || 'No documents needed'}
        </Text>
        <Text style={[styles.stateSub, { color: subText }]}>
          {translateData?.noDocumentsNeededSub ||
            'This vehicle type does not require any documents right now.'}
        </Text>
      </View>
    )
  }

  return (
    <View>
      {documents.map((doc: any) => {
        const file = uploads[doc.slug]
        const required = doc.is_required === 1
        const needsDate = doc.need_expired_date === 1
        const sample = doc?.sample_image?.original_url
        const invalid = showErrors && missingFor(doc)

        return (
          <View
            key={doc.id ?? doc.slug}
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: invalid ? appColors.alertRed : colors.border,
              },
            ]}
          >
            <View style={[styles.headRow, { flexDirection: viewRtlStyle }]}>
              <View style={[styles.headLeft, { flexDirection: viewRtlStyle }]}>
                <Text
                  style={[styles.docName, { color: colors.text }]}
                  numberOfLines={2}
                >
                  {doc.name}
                </Text>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: required
                        ? 'rgba(248,111,0,0.12)'
                        : isDark
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.05)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      { color: required ? appColors.primary : subText },
                    ]}
                  >
                    {required
                      ? translateData?.required || 'Required'
                      : translateData?.optional || 'Optional'}
                  </Text>
                </View>
              </View>
            </View>

            {Boolean(sample) && (
              <TouchableOpacity
                style={[styles.sampleWrap, { flexDirection: viewRtlStyle }]}
                activeOpacity={0.8}
                onPress={() => setPreview({ uri: sample, title: doc.name })}
              >
                <View>
                  <Image
                    source={{ uri: sample }}
                    style={[styles.sampleImg, { borderColor: colors.border }]}
                    resizeMode="cover"
                  />
                  {/* An SVG centres by layout; the glyph this replaced sat
                      off-centre because a font's line box is asymmetric. */}
                  <View style={styles.zoomBadge}>
                    <Icons.Eye />
                  </View>
                </View>
                <Text
                  style={[
                    styles.sampleHint,
                    { color: subText, textAlign: textRtlStyle },
                  ]}
                >
                  {translateData?.sampleHint ||
                    'Example of what to upload. Make sure all details are readable.'}
                  {'\n'}
                  <Text style={styles.sampleTapHint}>
                    {translateData?.tapToView || 'Tap to view'}
                  </Text>
                </Text>
              </TouchableOpacity>
            )}

            {file ? (
              <View
                style={[
                  styles.filledRow,
                  {
                    flexDirection: viewRtlStyle,
                    borderColor: appColors.primary,
                    backgroundColor: isDark
                      ? 'rgba(248,111,0,0.12)'
                      : 'rgba(248,111,0,0.06)',
                  },
                ]}
              >
                <Image source={{ uri: file.uri }} style={styles.thumb} />
                <View style={styles.filledMeta}>
                  <Text
                    style={[styles.filledName, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {file.name}
                  </Text>
                  <Text style={[styles.filledSub, { color: subText }]}>
                    {translateData?.uploaded || 'Ready to upload'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => remove(doc.slug)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Icons.CloseSimple color={subText} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.actionRow, { flexDirection: viewRtlStyle }]}>
                <TouchableOpacity
                  style={[styles.action, { borderColor: colors.border }]}
                  activeOpacity={0.8}
                  onPress={() => pick(doc.slug, 'camera')}
                >
                  <Icons.Camera1 color={appColors.primary} />
                  <Text style={[styles.actionText, { color: colors.text }]}>
                    {translateData?.camera || 'Camera'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.action, { borderColor: colors.border }]}
                  activeOpacity={0.8}
                  onPress={() => pick(doc.slug, 'gallery')}
                >
                  <Icons.Gallery color={appColors.primary} />
                  <Text style={[styles.actionText, { color: colors.text }]}>
                    {translateData?.gallery || 'Gallery'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {needsDate && Boolean(file) && (
              <TouchableOpacity
                style={[
                  styles.dateChip,
                  {
                    flexDirection: viewRtlStyle,
                    borderColor: colors.border,
                    backgroundColor: isDark
                      ? appColors.darkThemeSub
                      : appColors.white,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() =>
                  setDatePicker({ visible: true, slug: doc.slug })
                }
              >
                <Text
                  style={[
                    styles.dateLabel,
                    {
                      color: expiryDates[doc.slug] ? colors.text : subText,
                    },
                  ]}
                >
                  {expiryDates[doc.slug] ||
                    translateData?.expiryDate ||
                    'Select expiry date'}
                </Text>
                <Icons.Clock color={subText} />
              </TouchableOpacity>
            )}

            {invalid && (
              <Text style={[styles.errorText, { textAlign: textRtlStyle }]}>
                {!file
                  ? translateData?.documentRequired ||
                    'This document is required'
                  : translateData?.expiryRequired ||
                    'Please select the expiry date'}
              </Text>
            )}
          </View>
        )
      })}

      {datePicker.visible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={onDateChange}
        />
      )}

      <Modal
        visible={Boolean(preview)}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setPreview(null)}
      >
        {/* Tapping anywhere outside the image closes it. */}
        <TouchableOpacity
          style={styles.previewBackdrop}
          activeOpacity={1}
          onPress={() => setPreview(null)}
        >
          <View style={[styles.previewBar, { flexDirection: viewRtlStyle }]}>
            <Text style={styles.previewTitle} numberOfLines={1}>
              {preview?.title}
            </Text>
            <TouchableOpacity
              onPress={() => setPreview(null)}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Icons.CloseSimple color={appColors.white} />
            </TouchableOpacity>
          </View>

          {Boolean(preview) && (
            <Image
              source={{ uri: preview!.uri }}
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}

          <Text style={styles.previewHint}>
            {translateData?.tapToClose || 'Tap anywhere to close'}
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}
