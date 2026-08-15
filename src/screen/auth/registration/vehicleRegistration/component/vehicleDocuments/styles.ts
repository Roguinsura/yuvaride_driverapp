import { StyleSheet } from 'react-native'
import appColors from '../../../../../../theme/appColors'
import appFonts from '../../../../../../theme/appFonts'
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from '../../../../../../theme/appConstant'

const styles = StyleSheet.create({
  card: {
    borderRadius: windowWidth(3.5),
    borderWidth: 1.5,
    padding: windowWidth(3.5),
    marginBottom: windowHeight(1.4),
  },
  headRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headLeft: {
    flex: 1,
    alignItems: 'center',
  },
  docName: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
    flexShrink: 1,
  },
  badge: {
    marginLeft: windowWidth(2),
    paddingHorizontal: windowWidth(2),
    paddingVertical: windowHeight(0.25),
    borderRadius: windowWidth(1.2),
  },
  badgeText: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT2HALF,
  },
  // Example image the admin uploads so the driver knows what to submit.
  sampleWrap: {
    marginTop: windowHeight(1.2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sampleImg: {
    width: windowWidth(14),
    height: windowWidth(14),
    borderRadius: windowWidth(2),
    borderWidth: 1,
  },
  sampleHint: {
    marginLeft: windowWidth(2.5),
    flex: 1,
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT2HALF,
    lineHeight: windowHeight(2),
  },
  sampleTapHint: {
    color: appColors.primary,
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT2HALF,
  },
  /*
    Corner affordance on the sample thumbnail so it reads as tappable. Sized
    off the 20x20 icon it holds, with room to breathe around it.
  */
  zoomBadge: {
    position: 'absolute',
    right: -windowWidth(1.2),
    bottom: -windowWidth(1.2),
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // Lifts it off the thumbnail underneath.
    borderWidth: 1.5,
    borderColor: appColors.white,
  },
  previewBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth(4),
  },
  previewBar: {
    position: 'absolute',
    top: windowHeight(6),
    left: windowWidth(5),
    right: windowWidth(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewTitle: {
    flex: 1,
    color: appColors.white,
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT4,
    marginRight: windowWidth(4),
  },
  previewImage: {
    width: '100%',
    height: '70%',
  },
  previewHint: {
    position: 'absolute',
    bottom: windowHeight(6),
    color: 'rgba(255,255,255,0.6)',
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3,
  },
  actionRow: {
    marginTop: windowHeight(1.4),
    flexDirection: 'row',
    gap: windowWidth(2.5),
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: windowWidth(1.5),
    height: windowHeight(5),
    borderRadius: windowWidth(2.2),
    borderWidth: 1.2,
    borderStyle: 'dashed',
  },
  actionText: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3,
  },
  // Replaces the action row once a file is attached.
  filledRow: {
    marginTop: windowHeight(1.4),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: windowWidth(2.2),
    borderWidth: 1.2,
    padding: windowWidth(2),
  },
  thumb: {
    width: windowWidth(12),
    height: windowWidth(12),
    borderRadius: windowWidth(1.8),
  },
  filledMeta: {
    flex: 1,
    marginHorizontal: windowWidth(2.5),
  },
  filledName: {
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3,
  },
  filledSub: {
    marginTop: windowHeight(0.2),
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT2HALF,
  },
  removeBtn: {
    padding: windowWidth(1.5),
  },
  dateChip: {
    marginTop: windowHeight(1.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight(5),
    paddingHorizontal: windowWidth(3),
    borderRadius: windowWidth(2.2),
    borderWidth: 1.2,
  },
  dateLabel: {
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT3,
  },
  errorText: {
    marginTop: windowHeight(0.6),
    color: appColors.alertRed,
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT2HALF,
  },
  // Standalone tick for the empty state; the CheckTic icon takes no colour
  // prop and renders white, which would vanish on this background.
  okBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: appColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  okBadgeMark: {
    color: appColors.white,
    fontSize: fontSizes.FONT4,
    fontFamily: appFonts.bold,
    fontWeight: '700',
  },

  // Loading / empty states
  stateWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowHeight(3),
    borderRadius: windowWidth(3.5),
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  stateTitle: {
    marginTop: windowHeight(1),
    fontFamily: appFonts.medium,
    fontSize: fontSizes.FONT3HALF,
    textAlign: 'center',
  },
  stateSub: {
    marginTop: windowHeight(0.4),
    fontFamily: appFonts.regular,
    fontSize: fontSizes.FONT2HALF,
    textAlign: 'center',
    paddingHorizontal: windowWidth(6),
  },
})

export default styles
