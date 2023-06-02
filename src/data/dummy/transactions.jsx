import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const transactionDummyData = [
  {
    key: 'tx1',
    date: '12-05-23',
    amount: 'Buy Ada',
    type: 'Buy',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx2',
    date: '12-05-23',
    type: 'Buy Ada',
    amount: 'KES 783.00',
    status: <MaterialCommunityIcons name="close" size={15} color="red" />,
  },
  {
    key: 'tx3',
    date: '12-05-23',
    type: 'Buy',
    amount: 'KES 783.00',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx4',
    date: '12-05-23',
    type: 'Buy',
    amount: 'KES 783.00',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx5',
    date: '12-05-23',
    type: 'Buy',
    amount: 'KES 783.00',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx6',
    date: '12-05-23',
    type: 'Payment',
    amount: 'KES 783.00',
    status: <MaterialCommunityIcons name="close" size={15} color="red" />,
  },
  {
    key: 'tx7',
    date: '12-05-23',
    type: 'Swap',
    amount: 'KES 400.00',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx8',
    date: '12-05-23',
    type: 'Buy',
    amount: 'KES 2,500.00',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx9',
    date: '12-05-23',
    type: 'Buy',
    amount: 'KES 200.00',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
  },
  {
    key: 'tx10',
    date: '12-05-23',
    type: 'Buy',
    amount: 'KES 1,500.00',
    status: <MaterialCommunityIcons name="check-bold" size={15} color="green" />,
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

export default { transactionDummyData, pieDummyData };
