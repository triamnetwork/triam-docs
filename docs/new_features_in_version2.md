---
Upgrading triam to version 2
---

## Overview
At this time, we are customizing token fee at application layer that allows an exchange to has token fee. A holding fee wallet will be received this fee and the source account will lost corresponding. Triam network hasn't this feature. But, at this vervion, we implemented it. This makes it not only easy for developing the bussinesses of third parties but also attracts more users to join Triam network. 

We created 3 new operations to:
- Has token's info for setting token fee in exchange.
- Change the holding fee wallet.
- Limit an amount of token in market for preventing inflation.

These features (operations) are described as below.

## New features - New Operations
### Create Asset
**CreateAsset** is used to create a new token. The source account of the transaction which contains **CreateAsset** operation will be the unique owner on that token. We created an Asset table to save this data. The following table describes **CreateAsset** operation:

| Fields | Param Type | Description |
| --- | --- | --- |
| asset | Asset | It contains two fields: issuer(PublicKey) and asset code (string). We will create the new unique token from asset code. |
| beneficiary | string | It is the holding fee wallet which will receive token fee from exchange using that token. Length: empty or 56 characters|
| fee | uint32 | Rate of exchange's amount need to pay for token fee. Range: 0 - 10000. Formula: Token fee = fee * exchange's amount/10000.|
| ratio | uint32 | When we starts issuing the token into market, our accounts will be locked an amount of RIA corresponding. Ratio will be used by formula: RIA's amount for locking =  amount for issuing / ratio.|
| minfee | int64 | A minimum amount for token fee.|

Possible errors:

| Error | Code | Description |
| --- | --- | --- |
| CREATE_ASSET_MALFORMED | -1 | Invalid input|
| CREATE_ASSET_NO_ISSUER | -2 | Issuer doesn't exist|
| CREATE_ASSET_ASSET_EXIST | -3 | Asset code (token) exists|
| CREATE_ASSET_NO_BENEFICIARY | -4 | Beneficiary doesn't exist|
| CREATE_ASSET_TRUST_SELF | -5 | Beneficiary can't be the source account  |
| CREATE_ASSET_ISSUER_DIFF_SIGNER | -6 | Signer is difference from issuer |
| CREATE_ASSET_UNDERFUNDED | -7 | Balance of issuer's account is underfunded|
| CREATE_ASSET_LOW_RESERVE | -8 | Account must has a minimum amount in it|
| CREATE_ASSET_BENEFICIARY_MUST_BE_EMPTY | -9 | Appearing when fee and minfee are equal zero but beneficiary is not empty|
| CREATE_ASSET_INVALID_BENEFICIARY | -10 | Invalid beneficiary format. It need be a public key string|
| CREATE_ASSET_NO_ADMIN | -11 | This case for hard-code. The refund-account doesn't exist|
| CREATE_ASSET_INVALID_ASSET_JSON_FILE | -12 | This case for hard-code. The asset json file is invalid or the asset json file doesn't exist|
| CREATE_ASSET_DIFF_ISSUER_ON_TRUSTLINE | -13 | Asset code exist on trustline but this issuer is difference on there|
| CREATE_ASSET_MALFORMED_NEGATIVE_MINFEE | -14 | Invalid minfee|
| CREATE_ASSET_MALFORMED_OUT_OF_RANGE_FEE | -15 | Range of fee: 0 - 10000|
| CREATE_ASSET_MALFORMED_OUT_OF_RANGE_RATIO | -16 | Range of ratio: 0 - 2100000000|
| CREATE_ASSET_MALFORMED_INVALID_ASSET | -17 | Invalid asset|
| CREATE_ASSET_MALFORMED_NATIVE_ASSET | -18 | From version 10, we don't use native asset in trustline|

View details [here](http://triamnetwork.github.io/triam-sdk/Operation.html#.createAsset)

### Change Asset
**ChangeAsset** is used to change the beneficiary (the holding fee wallet)

| Fields | Param Type | Description |
| --- | --- | --- |
| asset | Asset | The token will be changed.|
| beneficiary | string | The new beneficiary of token|

Possible errors:

| Error | Code | Description |
| --- | --- | --- |
| CHANGE_ASSET_MALFORMED | -1 | Invalid input|
| CHANGE_ASSET_ASSET_NO_EXIST | -2 | Asset code doesn't exist|
| CHANGE_ASSET_NO_BENEFICIARY | -3 | Beneficiary doesn't exist|
| CHANGE_ASSET_TRUST_SELF | -4 | Beneficiary can't be source account |
| CHANGE_ASSET_ISSUER_DIFF_SIGNER | -5 | Signer is difference from issuer |
| CHANGE_TRUST_INVALID_NUM_ENTRIES | -6 | Removed|
| CHANGE_ASSET_BENEFICIARY_MUST_BE_EMPTY | -7 | Appearing when fee and minfee are equal zero but beneficiary is not empty|
| CHANGE_ASSET_INVALID_BENEFICIARY | -8 | Invalid beneficiary format. It need be a public key string|
| CHANGE_ASSET_LOW_RESERVE | -9 |Account must has a minimum amount in it after minusing fee|
| CHANGE_ASSET_MALFORMED_INVALID_ASSET | -10 | Invalid asset|
| CHANGE_ASSET_MALFORMED_NATIVE_ASSET | -11 | From version 10, we don't use native asset in trustline |

View details [here](http://triamnetwork.github.io/triam-sdk/Operation.html#.changeAsset)

### Limit Asset
**LimitAsset** is used to stop issuing more amount of the tokens. This will prevent the inflation.

| Fields | Param Type | Description |
| --- | --- | --- |
| asset | Asset |  The token will be limited|
| islimited | uint32 | Values: 0 or 1. 1 for limiting. 0 for countinue issuing. |

Possible errors:

| Error | Code | Description |
| --- | --- | --- |
| LIMIT_ASSET_MALFORMED | -1 | Invalid input|
| LIMIT_ASSET_ASSET_NO_EXIST | -2 | Asset code doesn't exist|
| LIMIT_ASSET_ISSUER_DIFF_SIGNER | -3 | Signer is difference from issuer|
| LIMIT_ASSET_ASSET_STOP_ISSUING | -4 | Asset was stopped issuing and cannot reopen|
| LIMIT_ASSET_MALFORMED_INVALID_ASSET | -5 | Invalid asset|
| LIMIT_ASSET_MALFORMED_NATIVE_ASSET | -6 | From version 10, we don't use native asset in trustline|
| LIMIT_ASSET_MALFORMED_INVALID_ISLIMITED | -7 | Values: 0 or 1|

View details [here](http://triamnetwork.github.io/triam-sdk/Operation.html#.limitAsset)

## Changes

 When we starts issuing token into market, our account will be frozen an amount of RIA corresponding. So a field named "amountlock" was added into the account records in Accounts table  to store this amount. Besides, the flow of payment or pathpayment will be redefine as below:
 A creates token named SAY with ratio is 100, minfee is 0.1, fee is zero and B is beneficiary. 
 B, C and D trusts this token. After that, A (issuer) starts issuing 1000 SAY to C. Account of A will be locked 10 RIA (1000/ratio) corresponding. C sends to D 50 SAY. This case, C will be lost 50 SAY and token fee. D is received 50 SAY. B (beneficiry) is received token fee with the formula:

 Token fee = (fee\*amount/10000 > minfee) ? fee\*amount/10000 : minfee
 <=> (0\*50/1000 > 0.1) ? 0\*50.1000 : 0.1. <=> 0.1

 Similar to pathpayment operation, the fist asset in assets path will be calculated as above.
 If any trustor sends token back to issuer, the account of issuer will be unlocked an amount corresponding. We call this is "Burning asset". Other, when we limit a token, that token will be stoppted issuing into market. Example:
 D sends back 50 SAY to issuer (A), Account of A will be unlocked 0.5 RIA (50/ratio or 50/100).
 Notes: we need to recalculate when exchanging on RIA (native token) because of an amount frozen. 

 Some of possible errors will appear on old operations for this changing.

 ### Payment

| Error | Code | Description |
| --- | --- | --- |
| PAYMENT_ASSET_STOP_ISSUING | -10 | Asset was stoppted issuing. Issuer cannot issuing more|
| PAYMENT_BENEFICIARY_NOT_TRUST_YET | -11 | Beneficiary hasn't still trust yet|
| PAYMENT_NO_NEW_ASSET | -12 | Asset code doesn't exist in Asset table|

 ### PathPayment

| Error | Code | Description |
| --- | --- | --- |
| PATH_PAYMENT_ASSET_STOP_ISSUING | -13 | Asset was stoppted issuing. Issuer cannot issuing more|
| PATH_PAYMENT_BENEFICIARY_NOT_TRUST_YET | -14 | Beneficiary hasn't still trust yet|
| PATH_PAYMENT_NO_NEW_ASSET | -15 | Asset code doesn't exist in Asset table|

 ### ManageOffer

| Error | Code | Description |
| --- | --- | --- |
| MANAGE_OFFER_NO_NEW_ASSET | -13 | Asset code doesn't exist in Asset table|

 ### ChangeTrust

| Error | Code | Description |
| --- | --- | --- |
| CHANGE_TRUST_NO_NEW_ASSET | -6 | Asset code doesn't exist in Asset table|

 ### AllowTrust
 
| Error | Code | Description |
| --- | --- | --- |
| ALLOW_TRUST_NO_NEW_ASSET | -6 | Asset code doesn't exist in Asset table|


## Example about new operations

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

const newToken = new TriamSdk.Asset('SAY' ,'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ');

server.loadAccount("GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
  .addOperation(TriamSdk.Operation.createAsset({
    beneficiary: 'GCTUHZGU4DCONDKHXMQ3IG6Y7HCVC2JP6DRE3YFQHJKXSSJMMGBMR6PI',
    asset: newToken,
    fee: 0,
    ratio: 1000,
    minfee: '0.1'
  }))
  .addOperation(TriamSdk.Operation.changeAsset({
    asset: newToken,
    beneficiary: 'GBAQ6RHTTQKZEMFDBN2BVCRNV4EMMX7GRWUP44Y35EN3V3QYLVJNRZKR'
  }))
  .addOperation(TriamSdk.Operation.limitAsset({
    asset: newToken,
    islimited: 1
  }))
  .addMemo(TriamSdk.Memo.text('Create Asset'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SBJNGPLNMHQ7A4TRDLBIHGNBWP5BRBP62DXC2N5UMZI3FHRY2ON3WAYL"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
    console.log('\nSuccess! View the transaction at: ');
    console.log(transactionResult._links.transaction.href);
  })
  .catch(function(err) {
    console.log('An error has occured:');
    console.log(err.response.data.extras);
  });
})
.catch(function(e) {
  console.error(e);
});
```
## How to upgrade current triam core to new version
- Downloading triam-core binary file [here]()
- Adding new fields into triam.cfg file:
  ```
  ASSET_HARD_CODE_MODE=true
  IS_PRODUCTION=true
  REFUND_ACCOUNT="$RefundAccount"
  ```
  $RefundAccount is a account that has enough RIA to send back to issuers for freezing
- Replacing current triam-core binary file by new one
- Opening terminal (Ctrl + Alt + T) and cd /path/to/triam-core (the directory contains triam-core binary file)
- Running
  ```
  pm2 stop triam-core
  ./triam-core --conf triam-core.cfg --forcescp
  pm2 start ./triam-core --interpreter none -x -- --conf triam-core.cfg
  ```
- Setting time that triam-core will be upgraded by url:
  ```
  http://$IP:$PORT/upgrades?mode=set&upgradetime=$TIME&protocolversion=9
  ```
  Time format: yyyy-mm-ddThh:mm:ssZ. Example: 2020-7-10T03:24:00Z
