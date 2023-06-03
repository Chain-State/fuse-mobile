import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../resources/assets/Style';

const PaymentsHistoryDummyData = [
  {
    key: 'tx1',
    date: '09-12-22',
    amount: 'KES 1,100',
    type: 'OP93DMKD',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx2',
    date: '01-05-23',
    type: 'JK39K892Q',
    amount: 'KES 783.00',
    status: <MaterialCommunityIcons name="close" size={15} color="red" />,
  },
  {
    key: 'tx3',
    date: '11-06-23',
    type: 'JK392204D',
    amount: 'KES 2,783.00',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx4',
    date: '27-06-23',
    type: 'SJ8943NSM',
    amount: 'KES 5,999.00',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx5',
    date: '02-07-23',
    type: 'JK399382AS',
    amount: 'KES 1000.00',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx6',
    date: '12-05-23',
    type: 'AK892FFVS',
    amount: 'KES 80.00',
    status: <MaterialCommunityIcons name="close" size={15} color="red" />,
  },
];

const pieDummyData = [
  {
    value: 47,
    color: Theme.fsCharts.fsDonutChart.chart.pieColor1,
    gradientCenterColor: '#006DFF',
    focused: true,
  },
  {
    value: 40,
    color: Theme.fsCharts.fsDonutChart.chart.pieColor2,
    gradientCenterColor: '#3BE9DE',
  },
  {
    value: 16,
    color: Theme.fsCharts.fsDonutChart.chart.pieColor3,
    gradientCenterColor: '#8F80F3',
  },
  {
    value: 3,
    color: Theme.fsCharts.fsDonutChart.chart.pieColor4,
    gradientCenterColor: '#FF7F97',
  },
];

export { PaymentsHistoryDummyData };
