import { StyleSheet } from "react-native";
import { windowHeight, fontSizes, windowWidth } from "../../theme/appConstant";
import appColors from "../../theme/appColors";
import appTypography from '../../theme/appTypography'
import appFonts from "../../theme/appFonts";


const styles = StyleSheet.create({
    chartContainer: {
        alignItems: 'center',
        marginTop: windowHeight(2.6),
        marginHorizontal: windowHeight(2.5),
        borderRadius: windowHeight(0.8),
        paddingBottom: windowHeight(2.3),
        borderWidth: windowHeight(0.1)
    },
    centerText: {
        position: 'absolute',
        top: '34%',
        alignItems: 'center',
    },
    title: {
        ...appTypography.bodyMedium,
        color: appColors.black,
    },
    // Headline figure on a stat tile.
    count: {
        ...appTypography.price,
        color: appColors.primary,
        top: '15%',
    },

    legendValue: {
        fontWeight: 'bold',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: windowHeight(4),
        width: '100%',
        backgroundColor: appColors.white,
    },
    statusBox: {
        alignItems: 'center',
    },
    statusTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    statusDot: {
        width: windowHeight(1.6),
        height: windowHeight(0.6),
        borderRadius: 4,
        marginRight: 6,
    },
    statusLabel: {
        ...appTypography.body,
        color: appColors.iconColor,
    },
    statusValue: {
        ...appTypography.bodyMedium,
        color: appColors.black,
        left: windowWidth(2.8),
    },
})
export default styles;