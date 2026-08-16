import { StyleSheet } from 'react-native'
import appColors from '../../../theme/appColors'
import appTypography from '../../../theme/appTypography'
import appFonts from '../../../theme/appFonts'
import { fontSizes, windowWidth } from '../../../theme/appConstant'
import { windowHeight } from '../../../theme/appConstant'

const SIZE = windowHeight(7.5)
const OUTER_SIZE = SIZE + windowHeight(1.2)

const styles = StyleSheet.create({
    text: {
        color: appColors.white,
        ...appTypography.bodyLargeMedium,
    },
    container: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: windowHeight(5),
        height: SIZE * 3,
        width: SIZE * 3,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    pulse: {
        position: 'absolute',
        height: SIZE,
        width: SIZE,
        borderRadius: SIZE / 2,
        zIndex: 0,
    },
    staticOuterCircle: {
        position: 'absolute',
        height: OUTER_SIZE,
        width: OUTER_SIZE,
        borderRadius: OUTER_SIZE / 2,
        backgroundColor: appColors.primary,
        zIndex: 1,
    },
    button: {
        height: SIZE,
        width: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: appColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: windowHeight(0.15),
        zIndex: 2,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 10,
        height: windowHeight(80),
    },
    noRideContainer: {
        flex: 1,
        alignItems: 'center',
    },
    noRideImg: {
        width: windowWidth(80),
        height: windowWidth(80),
    },
    noRideText: {
        ...appTypography.bodyLargeMedium,
        color: appColors.secondaryFont,
        textAlign: 'center',
    },
    sosImage: {
        height: windowHeight(2.5),
        width: windowHeight(2.5),
        resizeMode: 'contain',
    },
    sideLine: {
        height: windowHeight(3),
        width: windowWidth(0.3),
        backgroundColor: appColors.white,
        marginHorizontal: windowWidth(3),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: appColors.modelBg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: windowHeight(1),
        padding: windowHeight(3),
        alignItems: 'center',
    },
    title: {
        ...appTypography.h3,
        marginBottom: windowHeight(1),
    },
    message: {
        ...appTypography.body,
        marginBottom: windowHeight(3),
        textAlign: 'center',
    },
    buttonModel: {
        backgroundColor: appColors.primary,
        borderRadius: windowHeight(1),
        padding: windowHeight(1.5),
    },
    buttonTextModel: {
        color: appColors.white,
        ...appTypography.button,
    },
})

export default styles
