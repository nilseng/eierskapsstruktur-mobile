import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    h100: {
        height: '100%',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 4,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 24,
        paddingHorizontal: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    sectionDescription: {
        textAlign: 'center',
        margin: 8,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    textInput: {
        height: 40,
        backgroundColor: '#f8f9fa',
        marginTop: 12,
        padding: 1,
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});