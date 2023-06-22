import React from 'react';
import { View, Text, Image } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Theme, { pieColor2 } from '../resources/assets/Style';

function AssetPriceLineChart({ title, chartData }) {
  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          marginLeft: -10,
          marginRight: -10,
          padding: 10,
          height: 330,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../resources/images/cardano-ada-logo.png')}
            style={{ width: 50, height: 40 }}
          />
          <Text
            style={{
              padding: 5,
              marginLeft: 10,
              fontFamily: Theme.fsFonts.boldFont.fontFamily,
              fontSize: 22,
              marginBottom: 10,
            }}
          >
            ADA Ksh. {title}
          </Text>
        </View>
        <LineChart
          data={chartData}
          showFractionalValues={true}
          // curved={true}
          stepValue={8}
          maxValue={41}
          noOfSections={5}
          hideDataPoints={false}
          // adjustToWidth={true}
          // yAxisLabelPrefix="Ksh "
          xAxisLabelTextStyle={{ fontFamily: Theme.fsFonts.fontFamily, fontSize: 13 }}
          yAxisTextStyle={{ fontFamily: Theme.fsFonts.fontFamily, fontSize: 13 }}
          thickness={1}
          color={Theme.fsColors.secondary}
          showVerticalLines={false}
          rulesColor={Theme.fsColors.secondary}
          // initialSpacing={0}
          // yAxisOffset={0}
          // yAxisLabelWidth={50}
          yAxisIndicesHeight={5}
          xAxisLabelTexts={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          dataPointsColor={Theme.fsColors.secondary}
          yAxisColor={Theme.fsColors.backgroundColor}
          xAxisColor={Theme.fsColors.backgroundColor}
        />
      </View>
    </>
  );
}

export default AssetPriceLineChart;
