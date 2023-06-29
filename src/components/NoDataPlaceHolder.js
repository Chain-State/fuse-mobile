import React, { useState } from 'react';
import Theme from '../resources/assets/Style';
import { TextInput, View, FlatList, Text } from 'react-native';
import { Card } from '@rneui/base';

const NoDataPlaceHolder = () => {

    return (
        <View style={{ ...Theme.fsContainer }}>
            <Card containerStyle={{ borderRadius: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ ...Theme.fsLabel, fontFamily: Theme.fsFonts.boldFont.fontFamily, color: Theme.fsColors.inactive }}>No Data</Text>
            </Card>
        </View>
    )
}

export default NoDataPlaceHolder