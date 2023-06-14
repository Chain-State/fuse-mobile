import { PieChart } from 'react-native-gifted-charts';
import { Text, View } from 'react-native';
import Theme from '../resources/assets/Style';
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

const renderLegendComponent = (legend) => {
  return (
    <>
      <View style={Theme.fsCharts.fsDonutChart.legendContainer}>
        {legend.map((element, index) => {
          let assetName = null;
          switch (element.asset_name) {
            case '':
              assetName = 'ADA';
              break;
            case '55534443':
              assetName = 'USDC';
              break;
            case '744d454c44':
              assetName = 'tMELD';
              break;
            case '744d494e':
              assetName = 'tMIN';
              break;
            case '74575254':
              assetName = 'tWRT';
              break;
            default:
              assetName: 'xtoken';
          }
          return (
            <View style={Theme.fsCharts.fsDonutChart.legendItem}>
              {renderDot(element.color)}
              <Text style={Theme.fsCharts.regText}>
                {assetName}: {element.percentage == 0 ? 'No Assets' : `${element.percentage}%`}
              </Text>
            </View>
          );
        })}
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
        {renderLegendComponent(pieData)}
      </View>
    </View>
  );
};
