import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

// import Legend from './Legend';

const screenWidth = Dimensions.get('window').width;

function AssetPriceLineChart({title, chartData}) {
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,

    // fillShadowGradient,
    fillShadowGradientOpacity: 0,
    color: (opacity = 1) => `#023047`,
    labelColor: (opacity = 1) => `#333`,
    strokeWidth: 2,

    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>{title}</Text>
      </View>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
      />

      {/* <View style={styles.legendContainer}>
        {legend.map(({name, color}) => {
          return <Legend key={name} name={name} color={color} />;
        })}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  legendContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default AssetPriceLineChart;