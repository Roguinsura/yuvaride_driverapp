import { Alert, BackHandler, Linking, PermissionsAndroid, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    requestLocationPermission as requestLocationPermissionQueued,
    requestNotificationPermission as requestNotificationPermissionQueued,
    requestCameraPermission as requestCameraPermissionQueued,
    queuePermissionPrompt,
} from '../../utils/appPermissions';

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

/*
  These delegate to utils/appPermissions rather than requesting directly.

  They used to be a second, independent implementation: the Splash screen called
  these while App.tsx called the appPermissions set, and both fire on launch.
  Android shows one runtime permission dialog at a time and drops any request
  made while another is in flight, so the two collided — the loser came back
  denied without ever being shown, which is why the background-location prompt
  did not appear until the second launch.

  Routing every caller through the same queued implementation is what makes the
  startup prompts run one after another. Signatures are unchanged, so the call
  sites did not need touching.
*/
export const requestLocationPermission = (): Promise<boolean> =>
    requestLocationPermissionQueued();






export const handlePermissionDenied = () => {
    Alert.alert(
        'Permission Required',
        'Location permission is required to proceed. Please enable it in settings.',
        [
            {
                text: 'Go to Settings',
                onPress: () => Linking.openSettings(),
            },
            {
                text: 'Exit App',
                onPress: () => BackHandler.exitApp(),
                style: 'cancel',
            },
        ],
        { cancelable: false }
    );
};


export const getAndStoreLocation = async (): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await AsyncStorage.setItem('user_latitude', latitude.toString());
                await AsyncStorage.setItem('user_longitude', longitude.toString());
                resolve({ lat: latitude, lng: longitude });
            },
            (error) => {
                reject(null);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    });
};

export const getStoredLocation = async (): Promise<{ lat: number; lng: number } | null> => {
    const lat = await AsyncStorage.getItem('user_latitude');
    const lng = await AsyncStorage.getItem('user_longitude');
    if (lat && lng) return { lat: parseFloat(lat), lng: parseFloat(lng) };
    return null;
};


export const requestCameraPermission = (): Promise<boolean> =>
    requestCameraPermissionQueued();

/*
  The queued version also gates on Platform.Version >= 33. This one asked for
  POST_NOTIFICATIONS on every Android version, and that permission only exists
  from Android 13 — below it the request just resolves unavailable.
*/
export const requestNotificationPermission = (): Promise<boolean> =>
    requestNotificationPermissionQueued();

export const requestStoragePermission = async (): Promise<boolean> => {
    if (!isAndroid) return true;
    return queuePermissionPrompt(async () => {
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
    });
};
