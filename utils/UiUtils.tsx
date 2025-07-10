import { Alert, AlertButton, AlertOptions, Platform } from "react-native";

export function showAlert(title: string, message: string, buttons?: AlertButton[], options?: AlertOptions) {
    if (Platform.OS === 'web') {
        alert(`${title}\n\n${message}`);
    } else {
        Alert.alert(title, message);
    }
}
