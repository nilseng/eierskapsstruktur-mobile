import { Colors } from "react-native/Libraries/NewAppScreen";

interface IColors {
    light: { [key: string]: string }
    dark: { [key: string]: string }
    [key: string]: string | { [key: string]: string }
}

export const colors: IColors = {
    light: {
        text: '#343a40',
        info: '#17a2b8',
        warning: 'orange',
        error: 'red',
        backgroundColor: Colors.lighter
    },
    dark: {
        text: '#f8f9fa',
        info: '#17a2b8',
        warning: 'orange',
        error: 'red',
        backgroundColor: Colors.darker
    }
}