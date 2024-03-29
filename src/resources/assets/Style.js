import { StyleSheet } from 'react-native';

//colors
const primary = '#8bc34a';
const primary_dark = '#145300';
const primary_light = '';

const secondary = '#56B8CF';
const secondary_dark = '#00697E';
const secondary_light = '#E6F4F1';

const primary_text = '#FFFFFF';
const secondary_text = '#000000';

const inactive_color = '#95B0B7';

export const pieColor1 = '#708653';
export const pieColor2 = '#E7F6D1';
export const pieColor3 = '#005165';
export const pieColor4 = '#457F8D';
export const pieColor5 = '#457F3D';

//fonts
const font = 'Montserrat-Regular';
const fontBold = 'Montserrat-Bold';
const semiBold = 'Montserrat-SemiBold';

const Theme = StyleSheet.create({
    fsContainer: {
        backgroundColor: '#FFFFFF',
        fontFamily: font,
        flex: 1,
        padding: 5,
        margin: 5,
    },

    fsColors: {
        primary: primary,
        secondary: secondary,
        backgroundColor: '#FFFFFF',
        inactive: inactive_color,
    },

    fsFonts: {
        fontFamily: font,
        boldFont: {
            fontFamily: fontBold,
        },
        semiBold: semiBold,
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
            fontFamily: font,
            paddingBottom: 5,
        },
    },
    fsList: {
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        column: {
            fontFamily: font,
            marginRight: 5,
            padding: 2,
            marginLeft: 5,
            marginBottom: 5,
            marginTop: 8,
        },
    },

    //components styling
    fsLabel: {
        fontFamily: semiBold,
        padding: 2,
        marginBottom: 5,
        marginTop: 10,
        marginLeft: 20,
        fontSize: 14,
    },

    fsInput: {
        fontFamily: 'Montserrat-Regular',
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#90A4AE',
        borderRadius: 10,
        padding: 10,
    },

    fsSelectList: {
        margin: 5,
        marginLeft: 15,
        marginRight: 0,
        borderRightWidth: 0,
        borderColor: '#90A4AE',
        borderBottomRightRadius: 0,
        borderTopEndRadius: 0,
        padding: 10,
        width: 150,
        height: 50,

    },

    error: {
        color: 'red',
        alignSelf: 'center',
        marginTop: -10,
        marginBottom: -10,
    },

    fsCharts: {
        lineChart: {
            container: {
                marginBottom: 5,
            },
            titleContainer: {
                flex: 1,
                alignItems: 'center',
            },
            legendContainer: {
                flexDirection: 'row',
                marginBottom: 5,
                justifyContent: 'center',
            },
        },

        fsDonutChart: {
            container: {
                padding: 10,
                backgroundColor: secondary_light,
            },
            chart: {
                margin: 15,
                padding: 20,
                borderRadius: 15,
                backgroundColor: primary,
                pieColor1: pieColor1,
                pieColor2: pieColor2,
                pieColor3: pieColor3,
                pieColor4: pieColor4,
            },

            legendContainer: {
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
            },
            legendItem: {
                flexDirection: 'row',
                width: 150,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 5,
                marginLeft: 5,
                padding: 2,
            },
        },

        text: {
            color: primary_text,
            fontSize: 16,
            fontFamily: fontBold,
        },
        regText: {
            color: primary_text,
            fontSize: 16,
            fontFamily: font,
        },
    },
});

export default Theme;
