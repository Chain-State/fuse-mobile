import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Theme from '../resources/assets/Style';

function AssetPriceLineChart({ title, chartData }) {
  return (
    <>
      <View>
        <Text
          style={{
            padding: 5,
            marginTop: 20,
            fontFamily: Theme.fsFonts.boldFont.fontFamily,
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          ADA: KES 36.34
        </Text>
        <LineChart
          data={chartData}
          curved={true}
          stepValue={5}
          minValue={0}
          noOfSections={7}
          hideDataPoints={true}
          yAxisLabelPrefix="Ksh"
          thickness={1}
          color={Theme.fsColors.secondary}
          showVerticalLines={false}
          // spacing={35}
          rulesColor={Theme.fsColors.secondary}
          initialSpacing={0}
          yAxisOffset={0}
          // noOfSectionsBelowXAxis={0}
          yAxisLabelWidth={50}
          yAxisIndicesHeight={20}
          yAxisColor={Theme.fsColors.backgroundColor}
          xAxisColor={Theme.fsColors.backgroundColor}
        />
      </View>
    </>
  );
}

export default AssetPriceLineChart;
