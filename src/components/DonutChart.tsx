import { PieChart } from "react-native-gifted-charts";
import {
    Alert,
    Dimensions,
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    ActivityIndicator,
    FlatList,
  } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const renderDot = color => {

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#006DFF')}
            <Text style={{color: 'white'}}>Asset A: 47%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#8F80F3')}
            <Text style={{color: 'white'}}>Asset C: 16%</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#3BE9DE')}
            <Text style={{color: 'white'}}>Asset B: 40%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#FF7F97')}
            <Text style={{color: 'white'}}>Other: 3%</Text>
          </View>
        </View>
      </>
    );
  };  

export const DonutGraphWithLegend = ({pieData}) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        backgroundColor: '#34448B',
        flex: 1,
      }}>
      <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: '#232B5D',
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Portfolio
        </Text>
        <View style={{padding: 20, alignItems: 'center'}}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => {
              return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                    47%
                  </Text>
                  <Text style={{fontSize: 14, color: 'white'}}>A</Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
    );
};