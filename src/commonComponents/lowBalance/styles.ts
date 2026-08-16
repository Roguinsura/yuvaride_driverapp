import { StyleSheet } from "react-native";
import appColors from "../../theme/appColors";
import { fontSizes, windowHeight, windowWidth } from "../../theme/appConstant";
import appTypography from '../../theme/appTypography'
import appFonts from "../../theme/appFonts";

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        paddingVertical: windowHeight(3),
        paddingHorizontal: windowWidth(2),
        borderRadius: windowWidth(5),
        width: '80%',
    },
    // Was appFonts.semiBold, which does not exist on AppFonts — fontFamily
    // resolved to undefined, so this rendered in the platform default face.
    title: {
        ...appTypography.h3,
        marginVertical: windowHeight(2),
        alignSelf: 'center'
    },
    image: {
        height: windowHeight(6.5),
        width: windowWidth(15),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    subText: {
        fontFamily: appFonts.regular,
        fontSize: fontSizes.FONT3HALF,
        color: appColors.iconColor,
        textAlign: 'center'
    }
})

export default styles