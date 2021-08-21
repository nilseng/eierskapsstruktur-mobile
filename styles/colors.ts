import { Colors } from "react-native/Libraries/NewAppScreen";

interface IColors {
    light: { [key: string]: string }
    dark: { [key: string]: string }
    [key: string]: string | { [key: string]: string }
}

export const colors: IColors = {
    light: {
        text: '#343a40',
        muted: '#868e96',
        primary: '#17a2b8',
        secondary: '#6f42c1',
        info: '#17a2b8',
        warning: 'orange',
        error: 'red',
        backgroundColor: Colors.lighter,
        backgroundColorAccent: Colors.light
    },
    dark: {
        text: '#f8f9fa',
        muted: '#dee2e6',
        primary: '#17a2b8',
        secondary: '#6f42c1',
        info: '#17a2b8',
        warning: 'orange',
        error: 'red',
        backgroundColor: Colors.darker,
        backgroundColorAccent: Colors.dark
    }
}