import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import AssetPriceLineChart from '../components/LineChart';
import AwesomeAlert from 'react-native-awesome-alerts';
import Theme from '../resources/assets/Style';
import FsButton from '../components/Button';
import styles from '../components/ButtonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ACCOUNT,
  LOVE_LACE,
  SCR_WALLET,
  URI_COINAPI,
  URI_OPENEXCHANGE,
  URI_TX_CONFIRM,
} from '../constants/AppStrings';
import { WaveIndicator } from 'react-native-indicators';
import {
  BTN_BUY_ADA,
  LB_BUY_ADA_AMOUNT,
  LB_BUY_SPEND_AMOUNT,
  SCR_HOME,
  URI_BUY_ASSET,
} from '../constants/AppStrings';

const BuyAssetScreen = ({ navigation, route }) => {
  const [amountAda, setAmountAda] = useState(null);
  const [amountFiat, setAmountFiat] = useState(null);
  const [priceHistory, setPriceHistory] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [adaPrice, setAdaPrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [account, setAccount] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  let merchantRequestId = null;
  let txData = null;

  const getTokenExRate = () => {
    fetch(URI_COINAPI, {
      method: 'GET',
      headers: {
        'X-CoinAPI-Key': '7CC0179B-877B-4473-AD94-B0AB33921F18',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const priceData = data.map((item) => {
          item = item;
          delete item.time_period_start;
          delete item.time_period_end;
          delete item.rate_low;
          delete item.rate_high;
          delete item.rate_open;
          delete item.time_open;
          delete item.time_close;
          item['value'] = (item.rate_close * exchangeRate).toFixed(2);
          return item;
        });
        setPriceHistory(priceData);
        console.log(`Fetched price data: ${JSON.stringify(priceData)}`);
        setAdaPrice(priceData.at(priceData.length - 2)['value']);
      })
      .catch((error) => console.log(`Price data fetch failed: ${error}`));
  };

  const getLocalCurrencyRate = () => {
    fetch(URI_OPENEXCHANGE, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.rates['KES']);
        setExchangeRate(data.rates['KES']);
      })
      .catch((err) => console.log(`Fx rate fetch failed: ${err}`));
  };

  const buyAda = () => {
    const details = {
      userUuid: account,
      assetType: 'Ada',
      tokenQuantity: (parseFloat(amountAda) * LOVE_LACE).toString(),
      paymentAmount: 1,
    };
    console.log('Executing buy transaction...');
    fetch(URI_BUY_ASSET, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        if (data) {
          console.log(`Data from tx response: ${JSON.stringify(data)}`);
          //check if MPESA tx was logged to database
          merchantRequestId = data.data.txStatus.MerchantRequestID;
          txData = { account: account, requestId: merchantRequestId };
          return txData;
        }
      })
      .then((data) => {
        checkTransactionComplete().then((response) => {
          if (response !== null) {
            setIsProcessing(false);
            navigation.navigate(SCR_WALLET);
          }
        });
      })
      .catch((err) => console.log(`Tx failed ${err}`))
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const checkTransactionComplete = async () => {
    let data = null;
    //make api request to check if transaction for this account is logged.
    //return the payment object
    const txDetails = {
      account: account,
      requestId: merchantRequestId,
    };
    console.log(`Checking confirmation with ${JSON.stringify(txData)}`);
    try {
      const result = await fetch(URI_TX_CONFIRM, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(txDetails),
      });
      data = await result.json();
      if (data.length > 0) {
        console.log(`Confirmation data returned is: ${JSON.stringify(data)}`);
        return data;
      } else {
        setTimeout(checkTransactionComplete, 2000);
      }
    } catch (error) {
      console.log(`Failed transaction confirm: ${error}`);
    }
  };

  const userAccount = async () => {
    let account = null;
    try {
      account = await AsyncStorage.getItem(ACCOUNT);
      if (account !== null) {
        console.log(`(wallet read): User Key: ${JSON.parse(account)['uuid']}`);
        setAccount(JSON.parse(account)['uuid']);
      } else {
        throw new Error('No account details found for user');
      }
    } catch (error) {
      console.log(`Could not read user account details because: ${error} `);
    }
  };

  useEffect(() => {
    userAccount();
    getTokenExRate();
    getLocalCurrencyRate();
  }, [exchangeRate]);

  let transactionMessage = `Buy ${amountAda} ADA for Ksh. ${amountFiat}?`;
  return (
    <>
      <KeyboardAvoidingView enabled={true} behavior="padding">
        <SafeAreaView>
          <View style={Theme.fsContainer}>
            <AwesomeAlert
              show={showAlert}
              modalProps={{ amountAda, amountFiat }}
              showProgress={false}
              title="Confirm Transaction"
              message={transactionMessage}
              // message="Buy ADA for Ksh. Complete MPESA trasaction next "
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Cancel"
              confirmText="Continue"
              confirmButtonColor="#8bc34a"
              alertContainerStyle={{ fontFamily: Theme.fsFonts.fontFamily }}
              onCancelPressed={() => {
                setShowAlert(false);
              }}
              onConfirmPressed={() => {
                setShowAlert(false);
                setIsProcessing(true);
                buyAda();
              }}
            />
            {console.log(`PriceHistory at render: ${priceHistory}`) &&
            priceHistory == null ? null : (
              <AssetPriceLineChart title={adaPrice} chartData={priceHistory} />
            )}
            {isProcessing ? (
              <View style={{ marginTop: 200, flexDirection: 'column', alignItems: 'center' }}>
                <WaveIndicator size={100} color={Theme.fsColors.primary} />
                <Text
                  style={{
                    height: 40,
                    fontFamily: Theme.fsFonts.fontFamily,
                    marginTop: 50,
                  }}
                >
                  Processing transaction...
                </Text>
              </View>
            ) : (
              <View style={{ marginTop: 10 }}>
                <Text style={{ ...Theme.fsLabel, height: 20 }}>{LB_BUY_ADA_AMOUNT}</Text>
                <TextInput
                  value={amountAda}
                  style={Theme.fsInput}
                  keyboardType="numeric"
                  maxLength={4}
                  onChangeText={(data) => {
                    console.log(`Tx fiat cost: ${parseFloat(data) * adaPrice}`);
                    if (data.startsWith('0') || data == '0') {
                      console.log(`Data is == ${data}`);
                      setAmountFiat('');
                    } else {
                      setAmountAda(data);
                      setAmountFiat(
                        parseInt(data * adaPrice)
                          .toFixed(2)
                          .toString()
                      );
                    }
                  }}
                />
                <Text style={{ ...Theme.fsLabel, height: 20 }}>{LB_BUY_SPEND_AMOUNT}</Text>
                <TextInput
                  value={amountFiat}
                  style={Theme.fsInput}
                  keyboardType="numeric"
                  maxLength={5}
                  // showSoftInputOnFocus
                  onChangeText={(data) => {
                    if (data.startsWith('0') || data == '0' || data == '') {
                      setAmountAda('');
                    } else {
                      setAmountFiat(data);
                      setAmountAda(
                        parseInt((data / adaPrice) * exchangeRate)
                          .toFixed(2)
                          .toString()
                      );
                    }
                  }}
                />

                {/* <Text style={{ ...Theme.fsLabel, height: 20 }}>{LB_BUY_SPEND_AMOUNT}</Text>
              <CurrencyInput
                value={amountFiat}
                prefix="Ksh "
                precision={0}
                delimiter=","
                minValue={0}
                keyboardType="numeric"
                style={Theme.fsInput}
                onChangeText={(data) => {
                  if (data.startsWith('0') || data == '0' ) {
                    setAmountAda('');
                  } else {
                    setAmountFiat(data);
                    setAmountAda(
                      parseInt((data / adaPrice) * exchangeRate)
                        .toFixed(2)
                        .toString()
                    );
                  }
                }}
              /> */}
                <FsButton
                  style={{ ...styles.appButtonContainer }}
                  onPress={() => {
                    setShowAlert(true);
                  }}
                  title={BTN_BUY_ADA}
                />
              </View>
            )}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default BuyAssetScreen;
