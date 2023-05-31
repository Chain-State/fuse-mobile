const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    appButtonContainer: {
        fontFamily: 'Montserrat-Regular',
        borderRadius: 8,
        margin: 15,
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 5,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center'
    },

    appButtonText: {
        lineHeight: 21,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.75,
        color: '#FFFFFF'
    },


});

export default styles;