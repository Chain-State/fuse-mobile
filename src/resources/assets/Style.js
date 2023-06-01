import { StyleSheet } from "react-native";
const Theme = StyleSheet.create({

    fsContainer: {
        backgroundColor: '#FFFFFF',
    },

    fsColors: {
        primary: '#0288d1',
        secondary: '#8bc34a',
    },

    fsFonts: {
        fontFamily: 'Montserrat-Regular',
        regular: '',
        heavy: '',
    },
    fsTabNavigation: {
        tab: {
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
        },
        icons: {
            fontSize: 16,
        },
        labels: {
            fontSize: 13,
            fontFamily: 'Montserrat-Regular',
            paddingBottom: 5,
        }

    },

    //components styling
    fsInput: {
        fontFamily: 'Montserrat-Regular',
        height: 50,
        margin: 20,
        borderWidth: 1,
        borderColor: '#90A4AE',
        borderRadius: 5,
        padding: 10,
    },
});

export default Theme;