import React, { useState } from 'react';
import { TextInput, View, FlatList, Text } from 'react-native';
import Theme from '../resources/assets/Style';
import { PaymentsHistoryDummyData } from '../data/dummy/PaymentsHistoryData';
import FsButton from '../components/Button';
import { SelectList } from 'react-native-dropdown-select-list';
import styles from '../components/ButtonStyles';

let swap = { baseToken: '', baseTokenAmount: 0, targetToken: '', targetTokenAmount: 0 };

const SwapScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('');
  const [swapPair, setSwapPair] = useState(swap);

  return (
    <View style={{ ...Theme.fsContainer }}>
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <Text style={{ ...Theme.fsFonts.boldFont, marginVertical: 10, marginHorizontal: 15 }}>
          Swap From
        </Text>
        <SelectList
          setSelected={(val) => setSelected(val)}
          fontFamily={Theme.fsFonts.fontFamily}
          defaultOption={{ key: '5', value: 'ADA' }}
          data={[
            { key: '1', value: 'AADA' },
            { key: '2', value: 'MIN' },
            { key: '3', value: 'WMT' },
            { key: '4', value: 'GENIUS' },
            { key: '5', value: 'ADA' },
          ]}
          save="value"
          boxStyles={{ margin: 5, marginRight: 15, marginLeft: 15 }}
          dropdownItemStyles={{ icon: '' }}
        />
        <Text style={{ ...Theme.fsFonts.boldFont, marginVertical: 10, marginHorizontal: 15 }}>
          Amount
        </Text>
        <TextInput
          style={{ ...Theme.fsInput }}
          placeholder=""
          onChangeText={(data) => setSwapPair({ ...swapPair, baseTokenAmountmount: data })}
          value={swapPair.baseTokenAmount}
          keyboardType="numeric"
        />
        <Text style={{ ...Theme.fsFonts.boldFont, marginVertical: 10, marginHorizontal: 15 }}>
          Swap From
        </Text>
        <SelectList
          setSelected={(val) => setSelected(val)}
          fontFamily={Theme.fsFonts.fontFamily}
          defaultOption={{ key: '2', value: 'ADA' }}
          data={[
            { key: '1', value: 'AADA' },
            { key: '2', value: 'MIN' },
            { key: '3', value: 'WMT' },
            { key: '4', value: 'GENIUS' },
          ]}
          save="value"
          boxStyles={{ margin: 5, marginRight: 15, marginLeft: 15 }}
          dropdownItemStyles={{ icon: '' }}
        />
        <Text style={{ ...Theme.fsFonts.boldFont, marginVertical: 10, marginHorizontal: 15 }}>
          Amount
        </Text>
        <TextInput
          style={{ ...Theme.fsInput }}
          placeholder=""
          onChangeText={(data) => setSwapPair({ ...swapPair, targetTokenAmount: data })}
          value={swapPair.targetTokenAmount}
          keyboardType="numeric"
        />

        <FsButton style={{ ...styles.appButtonContainer }} title="Swap" />
        <View style={{ padding: 20, height: 300 }}>
          <FlatList
            ListHeaderComponent={() => (
              <View>
                <View>
                  <Text style={{ ...Theme.fsFonts.boldFont, marginBottom: 15 }}>
                    Transaction History
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ ...Theme.fsFonts.boldFont, marginRight: 5, marginLeft: 5 }}>
                    Date
                  </Text>
                  <Text style={{ ...Theme.fsFonts.boldFont, marginLeft: 5, marginRight: 5 }}>
                    Details
                  </Text>
                  <Text style={{ ...Theme.fsFonts.boldFont, marginLeft: 5, marginRight: 5 }}>
                    Amount
                  </Text>
                  <Text style={{ ...Theme.fsFonts.boldFont, marginLeft: 5, marginRight: 5 }}>
                    Status
                  </Text>
                </View>
              </View>
            )}
            scrollEnabled={true}
            data={PaymentsHistoryDummyData}
            renderItem={({ item }) => (
              <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={Theme.fsList.column}>{item.date}</Text>
                <Text style={Theme.fsList.column}>{item.type}</Text>
                <Text style={Theme.fsList.column}>{item.amount}</Text>
                <Text style={Theme.fsList.column}>{item.status}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default SwapScreen;
