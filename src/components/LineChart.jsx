import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Theme from '../resources/assets/Style';

function AssetPriceLineChart({ title, chartData }) {
  return (
    <View>
      <Text>{title}</Text>
      <LineChart
        data={chartData}
        curved={true}
        stepValue={10}
        hideDataPoints={true}
        hideYAxisText={true}
        thickness={2}
        color={Theme.fsColors.secondary}
        showVerticalLines={false}
        spacing={35}
        initialSpacing={0}
        xAxisLength={500}
        hideRules={true}
        yAxisColor={Theme.fsColors.backgroundColor}
        xAxisColor={Theme.fsColors.backgroundColor}
      />
    </View>
  );
}

export default AssetPriceLineChart;
