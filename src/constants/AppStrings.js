//server
const APP_SERVER = 'https://fusebox1.xyz';
const BASE_URI = '/api/v1';
const URI_REGISTER = BASE_URI + '/register';
const URI_USER_ASSETS = `${APP_SERVER}${BASE_URI}/wallet`;
const URI_BUY_ASSET = `${APP_SERVER}${BASE_URI}/transact/buy`;
const URI_TX_CONFIRM = `${APP_SERVER}${BASE_URI}/transact/checkPaymentComplete`;

//Cardano units
const LOVE_LACE = 1000000;


//APIs
const URI_COINAPI = 'https://rest.coinapi.io/v1/exchangerate/ADA/USD/history?period_id=1DAY&time_start=2023-06-09T23:59:00.0000000Z&time_end=2023-06-19T23:59:00.0000000Z&display_name=day&limit=20';
const URI_OPENEXCHANGE = 'https://openexchangerates.org/api/latest.json?app_id=46d02af8d01c44118f232980cbad46a8';

//http headers 
const CONTENT_TYPE = 'application/json';
const AUTHORIZATION = 'Authorization';

//storage keys
const ACCOUNT = 'account';

//labels
const LB_ASSET_VALUES = 'My Assets';
const LB_BUY_ADA_AMOUNT = 'Amount of ADA To Buy';
const LB_BUY_SPEND_AMOUNT = 'Amount of Ksh to Spend';
const BTN_BUY_ADA = 'Buy ADA';
const BTN_CREAT_ACCOUNT = 'Create Account';

//placeholders
const TX_FIAT_AMOUNT = 'I Spend Amount(KES)';
const TX_ADA_AMOUNT = 'I Get Amount (ADA)';

//response codes
const RESPONSE_OK = 200;
const RESPONSE_CREATED = 201;
const SERVER_ERROR = 500;
const CLIENT_ERROR = 400;

//routes
const SCR_HOME = 'Home';
const SCR_KYC = 'KYC';
const SCR_LOGIN = 'Login';
const SCR_REGISTRATION = 'Registration';
const SCR_WALLET = 'Wallet';
const SCR_BUY_ASSET = 'Buy';
const SCR_MAKE_PAYMENTS = 'Payments';
const SCR_SWAP_TOKENS = 'Swap'

export {
    APP_SERVER,
    ACCOUNT,
    URI_REGISTER,
    URI_USER_ASSETS,
    URI_BUY_ASSET,
    URI_COINAPI,
    URI_OPENEXCHANGE,
    URI_TX_CONFIRM,
    CONTENT_TYPE,
    LB_ASSET_VALUES,
    LB_BUY_ADA_AMOUNT,
    LB_BUY_SPEND_AMOUNT,
    SCR_HOME,
    SCR_KYC,
    SCR_REGISTRATION,
    SCR_WALLET,
    SCR_LOGIN,
    SCR_BUY_ASSET,
    SCR_MAKE_PAYMENTS,
    SCR_SWAP_TOKENS,
    TX_ADA_AMOUNT,
    TX_FIAT_AMOUNT,
    BTN_BUY_ADA,
    BTN_CREAT_ACCOUNT,
    LOVE_LACE,
}