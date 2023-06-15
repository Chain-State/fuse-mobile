import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Theme, { pieColor2 } from '../resources/assets/Style';

function AssetPriceLineChart({ title, chartData }) {
  return (
    <>
      <View style={{ backgroundColor: pieColor2, margin: -10, padding: 10 }}>
        <Text
          style={{
            padding: 5,
            marginTop: 20,
            fontFamily: Theme.fsFonts.boldFont.fontFamily,
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          ADA: Ksh {chartData.at(chartData.length - 1)['value']}
        </Text>
        <LineChart
          data={chartData}
          showFractionalValues={true}
          curved={true}
          stepValue={1}
          noOfSections={5}
          hideDataPoints={false}
          yAxisLabelPrefix="Ksh "
          xAxisLabelTextStyle={{ fontFamily: Theme.fsFonts.fontFamily, fontSize: 13 }}
          yAxisTextStyle={{ fontFamily: Theme.fsFonts.fontFamily, fontSize: 13 }}
          thickness={3}
          color={Theme.fsColors.secondary}
          showVerticalLines={false}
          rulesColor={Theme.fsColors.secondary}
          initialSpacing={0}
          yAxisOffset={0}
          yAxisLabelWidth={50}
          yAxisIndicesHeight={20}
          xAxisLabelTexts={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          dataPointsColor={Theme.fsColors.secondary}
          yAxisColor={Theme.fsColors.backgroundColor}
          xAxisColor={Theme.fsColors.backgroundColor}
        />
      </View>
    </>
  );
}

export default AssetPriceLineChart;
