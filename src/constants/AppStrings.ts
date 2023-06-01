//http headers 
const CONTENT_TYPE = 'Content-Type';
const AUTHORIZATION = 'Authorization';

//response codes
const RESPONSE_OK = 200;
const RESPONSE_CREATED = 201;
const SERVER_ERROR = 500; 
const CLIENT_ERROR = 400;

//routes
const SCR_KYC = 'KYC';
const SCR_LOGIN= 'Login';
const SCR_REGISTRATION = 'Registration';
const SCR_WALLET = 'Wallet';
const SCR_BUY_ASSET = 'Buy';
const SCR_MAKE_PAYMENTS = 'Payments';
const SCR_SWAP_TOKENS = 'Swap'

export {
    SCR_KYC,
    SCR_REGISTRATION,
    SCR_WALLET,
    SCR_LOGIN,
    SCR_BUY_ASSET,
    SCR_MAKE_PAYMENTS,
    SCR_SWAP_TOKENS,
}