import React, { useState } from 'react';
import { View, ActivityIndicator, Platform, Alert, Text, TouchableOpacity, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import appColors from '../../../theme/appColors';
import { fontSizes, windowHeight } from '../../../theme/appConstant';
import { useValues } from '../../../utils/context';
import Icons from '../../../utils/icons/icons';
import appFonts from '../../../theme/appFonts';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import { URL } from '../../../api/config';
import styles from './style';
import { useSelector } from 'react-redux';

export function PdfViewer({ route }: any) {
    const { pdfUrl, rideNumber } = route?.params || {};
    const { isDark } = useValues();
    const headerBg = isDark ? appColors.darkThemeSub : appColors.primary;
    const chipBg = isDark ? 'transparent' : 'rgba(255,255,255,0.18)';
    const chipBorder = isDark ? appColors.darkborder : 'rgba(255,255,255,0.35)';
    const [loading, setLoading] = useState<boolean>(true);
    const pdfGoogleViewer = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;
    const { translateData } = useSelector((state: any) => state.setting);

    const [isSharing, setIsSharing] = useState<boolean>(false);

    const downloadPdf = async () => {
        if (isSharing) return;
        setIsSharing(true);

        const name = `invoice${rideNumber}.pdf`;
        const pdfUrl = `${URL}/api/ride/driver-invoice/${rideNumber}`;
        const downloadDest =
            Platform.OS === 'android'
                ? `${RNFS.DownloadDirectoryPath}/${name}`
                : `${RNFS.DocumentDirectoryPath}/${name}`;

        try {
            const fileExists = await RNFS.exists(downloadDest);

            if (!fileExists) {
                await RNFS.downloadFile({
                    fromUrl: pdfUrl,
                    toFile: downloadDest,
                }).promise;
            } else {
            }

            await Share.open({
                url: `file://${downloadDest}`,
                type: 'application/pdf',
                title: 'Share PDF',
            });

            Alert.alert(
                translateData.downloadComplete,
                `${translateData.pdfSavedTo} ${Platform.OS === 'android' ? translateData.downloadsFolder : translateData.downloadsFolder}:\n${downloadDest}`
            );
        } catch (err) {
        } finally {
            setIsSharing(false);
        }
    };


    const navigation = useNavigation<any>()

    return (
        <View style={{ flex: 1, backgroundColor: isDark ? appColors.darkThemeSub : appColors.white }}>
            {/* Brand orange in light mode, dark surface in dark mode — the
                same rule the shared Header follows. */}
            <StatusBar barStyle="light-content" backgroundColor={headerBg} />
            <View style={[styles.headerView, { backgroundColor: headerBg }]}>

                <TouchableOpacity style={{ borderWidth: 1, borderColor: chipBorder, backgroundColor: chipBg, borderRadius: windowHeight(0.9), height: windowHeight(5), width: windowHeight(5), alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => navigation.goBack()}
                >
                    <Icons.Back color={appColors.white} />
                </TouchableOpacity>
                <Text style={{ fontFamily: appFonts.medium, fontSize: fontSizes?.FONT4HALF, color: appColors.white }}>Invoice</Text>
                <TouchableOpacity onPress={() => {
                    if (loading) {
                        return;
                    }
                    downloadPdf();
                }}
                    style={{ borderWidth: 1, borderColor: chipBorder, backgroundColor: chipBg, borderRadius: windowHeight(0.9), height: windowHeight(5), width: windowHeight(5), alignItems: 'center', justifyContent: 'center' }}
                    disabled={loading}
                >
                    <Icons.Download color={appColors.white} />
                </TouchableOpacity>
            </View>
            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={appColors.primary} />
                </View>
            )}

            <WebView
                source={{ uri: pdfGoogleViewer }}
                style={{
                    flex: 1, width: '100%',
                    backgroundColor: isDark ? appColors.primaryFont : appColors.graybackground
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                onError={(error) => {
                    setLoading(false);
                }}
            />
        </View>
    );
}
