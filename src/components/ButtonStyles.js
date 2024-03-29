import { Colors } from "react-native/Libraries/NewAppScreen";
import Theme from "../resources/assets/Style";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    appButtonContainer: {
        borderRadius: 8,
        margin: 15,
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 5,
        backgroundColor: Theme.fsColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    appButtonText: {
        fontFamily: Theme.fsFonts.semiBold,
        lineHeight: 21,
        fontSize: 16,
        color: 'white'
    },


});

export default styles;