//server
const APP_SERVER = 'https://fusebox1.xyz';
const BASE_URI = '/api/v1';
const URI_REGISTER = BASE_URI + '/register';
//http headers 
const CONTENT_TYPE = 'application/json';
const AUTHORIZATION = 'Authorization';

//labels
const LB_ASSET_VALUES = 'My Assets';
const BTN_BUY_ADA = 'Buy Ada';
const BTN_CREAT_ACCOUNT = 'Create Account';

//placeholders
const TX_FIAT_AMOUNT = 'I Spend Amount(KES)';
const TX_ADA_AMOUNT = 'I Get Amount (Ada)';

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
    URI_REGISTER,
    CONTENT_TYPE,
    LB_ASSET_VALUES,
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
}