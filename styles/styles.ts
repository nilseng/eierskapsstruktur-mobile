import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    sectionContainer: {
        paddingTop: 32,
        paddingHorizontal: 4,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 24,
        paddingHorizontal: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    sectionDescription: {
        textAlign: 'center',
        padding: 8,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});