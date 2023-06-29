import React, { useState } from 'react';
import { TextInput, View, FlatList, Text } from 'react-native';
import Theme from '../resources/assets/Style';
import { PaymentsHistoryDummyData } from '../data/dummy/PaymentsHistoryData';
import FsButton from '../components/Button';
import { SelectList } from 'react-native-dropdown-select-list';
import styles from '../components/ButtonStyles';
import { Card } from '@rneui/themed';
import { SwapPairs } from '../data/dummy/SwapPairsData';
import NoDataPlaceHolder from '../components/NoDataPlaceHolder';

let swap = { baseToken: '', baseTokenAmount: 0, targetToken: '', targetTokenAmount: 0 };

const SwapScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('');
  const [swapPair, setSwapPair] = useState(swap);

  return (
    <View style={{ ...Theme.fsContainer }}>
      <View
        style={{
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <Text style={{ ...Theme.fsFonts.boldFont, marginVertical: 10, marginHorizontal: 15 }}>
          Swap From
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            fontFamily={Theme.fsFonts.fontFamily}
            defaultOption={{ key: '0', value: SwapPairs[0] }}
            data={SwapPairs.map((item, index) => {
              return { key: index, value: item };
            })}
            save="value"
            boxStyles={Theme.fsSelectList}
            dropdownItemStyles={{ icon: '' }}
          />
          <TextInput
            style={{
              ...Theme.fsInput,
              marginLeft: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              flexGrow: 1,
            }}
            placeholder="Amount"
            onChangeText={(data) => setSwapPair({ ...swapPair, baseTokenAmountmount: data })}
            value={swapPair.baseTokenAmount}
            keyboardType="numeric"
          />
        </View>
        <Text style={{ ...Theme.fsFonts.boldFont, marginVertical: 10, marginHorizontal: 15 }}>
          Swap To
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            fontFamily={Theme.fsFonts.fontFamily}
            defaultOption={{ key: '3', value: SwapPairs[3] }}
            data={SwapPairs.map((item, index) => {
              return { key: index, value: item };
            })}
            save="value"
            boxStyles={Theme.fsSelectList}
            dropdownItemStyles={{ icon: '' }}
          />
          <TextInput
            style={{
              ...Theme.fsInput,
              marginLeft: 0,
              flexGrow: 1,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            placeholder="Amount"
            onChangeText={(data) => setSwapPair({ ...swapPair, targetTokenAmount: data })}
            value={swapPair.targetTokenAmount}
            keyboardType="numeric"
          />
        </View>
        <Card
          containerStyle={{ borderRadius: 5 }}
          wrapperStyle={{ fontFamily: Theme.fsFonts.fontFamily }}
        >
          <Card.Title>
            <Text style={{ fontFamily: Theme.fsFonts.boldFont.fontFamily }}>Swap Details</Text>
          </Card.Title>
          <Card.Divider></Card.Divider>
          <Text style={{ fontFamily: Theme.fsFonts.fontFamily }}>Platform Fees: </Text>
          <Text style={{ fontFamily: Theme.fsFonts.fontFamily }}>Expected Tokens: </Text>
          <Text style={{ fontFamily: Theme.fsFonts.fontFamily }}>Percentage Slippage: </Text>
        </Card>

        <FsButton style={{ ...styles.appButtonContainer }} title="Swap" />
        <View style={{ padding: 20, height: 300 }}>
          <View>
            <Text style={{ ...Theme.fsFonts.boldFont, marginBottom: 15 }}>
              Recent Swap Transactions
            </Text>
          </View>

          {/* <FlatList
            ListHeaderComponent={() => (
              <View>
                <View>
                  <Text style={{ ...Theme.fsFonts.boldFont, marginBottom: 15 }}>Swap History</Text>
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
          /> */}
          <NoDataPlaceHolder />
        </View>
      </View>
    </View>
  );
};

export default SwapScreen;
