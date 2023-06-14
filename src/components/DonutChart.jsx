import { PieChart } from 'react-native-gifted-charts';
import { Text, View } from 'react-native';
import Theme, { pieColor1, pieColor2, pieColor3, pieColor4 } from '../resources/assets/Style';
import { LB_ASSET_VALUES } from '../constants/AppStrings';

const renderDot = (color) => {
  return (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};

const renderLegendComponent = () => {
  return (
    <>
      <View style={Theme.fsCharts.fsDonutChart.legendContainer}>
        <View style={Theme.fsCharts.fsDonutChart.legendRow}>
          {renderDot(pieColor1)}
          <Text style={Theme.fsCharts.regText}>Ada: 47%</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
          {renderDot(pieColor2)}
          <Text style={Theme.fsCharts.regText}>AADA: 16%</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}
        >
          {renderDot(pieColor3)}
          <Text style={Theme.fsCharts.regText}>MELD: 40%</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
          {renderDot(pieColor4)}
          <Text style={Theme.fsCharts.regText}>Fuse: 3%</Text>
        </View>
      </View>
    </>
  );
};

export const DonutGraphWithLegend = ({ pieData }) => {
  return (
    <View style={Theme.fsCharts.fsDonutChart.container}>
      <View style={Theme.fsCharts.fsDonutChart.chart}>
        <Text style={Theme.fsCharts.text}>{LB_ASSET_VALUES}</Text>
        <View style={{ padding: 10, alignItems: 'center' }}>
          <PieChart
            data={pieData}
            donut
            sectionAutoFocus
            radius={90}
            innerRadius={50}
            innerCircleColor={Theme.primary_light}
            centerLabelComponent={() => {
              return (
                <View /> //No focused section details
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
};
