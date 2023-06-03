import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

function AssetPriceLineChart({title, chartData}) {
  return (
    <View>
        <Text>{title}</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={120}
      />
    </View>
  );
}

export default AssetPriceLineChart;