import React, { useState } from 'react';
import { TextInput, View, FlatList, Text } from 'react-native';
import Theme from '../resources/assets/Style';
import { PaymentsHistoryDummyData } from '../data/dummy/PaymentsHistoryData';
import FsButton from '../components/Button';
import { SelectList } from 'react-native-dropdown-select-list';
import styles from '../components/ButtonStyles';
import NoDataPlaceHolder from '../components/NoDataPlaceHolder';

const PaymentsScreen = ({ navigation }) => {
    const [amountAda, setAmountAda] = useState('');
    const [amountFiat, setAmountFiat] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [selected, setSelected] = useState('');

    return (
        <View style={{ ...Theme.fsContainer }}>
            <View
                style={{
                    marginTop: 20,
                    marginBottom: 10,
                }}
            >
                <Text style={{ ...Theme.fsFonts.boldFont, marginVertical: 10, marginHorizontal: 15 }}>Payment Method</Text>

                <SelectList
                    setSelected={(val) => setSelected(val)}
                    fontFamily={Theme.fsFonts.fontFamily}
                    defaultOption={{ key: '2', value: 'Till Number' }}
                    data={[
                        { key: '1', value: 'PayBill' },
                        { key: '2', value: 'Till Number' },
                        { key: '3', value: 'Send Money' },
                    ]}
                    save="value"
                    boxStyles={{ marginLeft: 15, marginRight: 15, height: 50, marginBottom: 15 }}
                />
                <Text style={{ ...Theme.fsFonts.boldFont, marginVertical: 10, marginHorizontal: 15 }}>Till Number</Text>
                <TextInput
                    style={{ ...Theme.fsInput, marginTop: 5, marginBottom: 15 }}
                    placeholder="Enter Till Number"
                    onChangeText={(data) => setFormData({ ...formData, fname: data })}
                    value={amountFiat}
                />

                <Text style={{ ...Theme.fsFonts.boldFont, marginVertical: 10, marginHorizontal: 15 }}>Amount To Send</Text>
                <TextInput
                    style={{ ...Theme.fsInput, marginTop: 5 }}
                    placeholder="Enter Amount"
                    onChangeText={(data) => setFormData({ ...formData, fname: data })}
                    value={exchangeRate}
                />
                <FsButton style={{ ...styles.appButtonContainer }} title="Make Payment" />
                <View style={{ padding: 20, height: 300 }}>
                    <View>
                        <Text style={{ ...Theme.fsFonts.boldFont, marginBottom: 15 }}>
                            Recent Payment Transactions
                        </Text>
                    </View>
                    {/* <FlatList
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
                        showsVerticalScrollIndicator={true}
                        scrollEnabled={true}
                        data={PaymentsHistoryDummyData}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
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

export default PaymentsScreen;