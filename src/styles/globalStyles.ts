import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";
import { fontFamily } from "../constants/fontFamily";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white
    },

    text: {
        fontFamily: fontFamily.regular,
        fontSize: 14,
        color: appColors.white,
    },

    button: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.white,
        paddingHorizontal: 16,
        paddingVertical: 16,
        minHeight: 56,
        flexDirection: 'row'
    },

    section: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

})