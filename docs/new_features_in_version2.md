---
Upgrading triam to version 2
---

## Overview

At this time, Triam network allows many issuers to issue the same token (same token name). This is easy to be confused. Besides, some issuers want to have exclusive rights on a token name. So that, we implemented new feature that allows a token name to be owned by only one issuer and more other features. This makes it not only easy for developing the bussinesses of third parties but also atracts more users to join Triam network. These features (operations) are described as below.

## New features - New Operations
### Create Asset
**CreateAsset** is used to create a new unique token. The source account of the transaction which contains **CreateAsset** operation will be the unique owner on that token.
| Fields | Param Type | Description |
| --- | --- | --- |
| asset | Asset | It contains two fields: issuer(PublicKey) and asset code (string). We will create the new unique token from asset code. |
| beneficiary | string | It is the holding fee wallet which will receive token fee from exchange using that token. Length: empty or 56 character|
| fee | uint32 | Rate of exchange amount need to pay for token fee. Range: 0 - 10000. Formula: Token fee = fee * exchange amount/10000.|
| ratio | uint32 | When we start issuing the token into market, our account will be locked an amount of RIA corresponding. Ratio will be used by formula: RIA's amount for locking =  amount for issuing / ratio.|
| minfee | int64 | A minimum amount for token fee.|

Possible errors:
| Error | Code | Description |
| --- | --- | --- |
| CREATE_ASSET_MALFORMED | -1 | Invalid input|
| CREATE_ASSET_NO_ISSUER | -2 | Issuer doesn't exist|
| CREATE_ASSET_ASSET_EXIST | -3 | Asset code (token) exists|
| CREATE_ASSET_NO_BENEFICIARY | -4 | Beneficiary doesn't exist|
| CREATE_ASSET_TRUST_SELF | -5 | Beneficiary can't be source account  |
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

### Limit Asset
**LimitAsset** is used to stop issuing more amount of the tokens.This will prevent the inflation.
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

### Changes
Of course, 

| Method | Horizon Endpoint | Param Type | Description |
| --- | --- | --- | --- |
| `accounts()` | [`accounts_all`](https://triamnetwork.com/developers/horizon/reference/accounts-all.html) | | Access all accounts. |
| `.accountId("accountId")` | [`accounts_single`](https://triamnetwork.com/developers/horizon/reference/accounts-single.html) | `string` | Pass in the ID of the account you're interested in to reach its details.|
| `.limit(limit)` | | `integer` | Limits the number of returned resources to the given `limit`.|
| `.cursor("token")` | | `string` | Return only resources after the given paging token. |
| `.order({"asc" or "desc"})` | | `string` |  Order the returned collection in "asc" or "desc" order. |
| `.call()` | | | Triggers a HTTP Request to the Horizon server based on the builder's current configuration.  Returns a `Promise` that resolves to the server's response.  For more on `Promise`, see [these docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).|
| `.stream({options})` | | object of [properties](https://developer.mozilla.org/en-US/docs/Web/API/EventSource#Properties) | Creates an `EventSource` that listens for incoming messages from the server.  URL based on builder's current configuration.  For more on `EventSource`, see [these docs](https://developer.mozilla.org/en-US/docs/Web/API/EventSource). |


## Examples

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

server.accounts()
  .accountId("GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ")
  .call()
  .then(function (accountResult) {
    console.log(accountResult);
  })
  .catch(function (err) {
    console.error(err);
  })
```
