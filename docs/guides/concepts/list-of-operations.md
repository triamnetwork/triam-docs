---
List of Operations
---

For a description of how operations work in Stellar, see [Operations](./operations.md).

For the protocol specification, see [stellar-transactions.x](https://github.com/stellar/stellar-core/blob/master/src/xdr/Stellar-transaction.x).

- [Create Account](#create-account)
- [Payment](#payment)
- [Path Payment](#path-payment)
- [Manage Offer](#manage-offer)
- [Create Passive Offer](#create-passive-offer)
- [Set Options](#set-options)
- [Change Trust](#change-trust)
- [Allow Trust](#allow-trust)
- [Account Merge](#account-merge)
- [Inflation](#inflation)
- [Manage Data](#manage-data)
- [CreateAsset](#createasset)
- [ChangeAsset](#changeasset)
- [LimitAsset](#limitasset)


## Create Account
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.createAccount) 

This operation creates and funds a new account with the specified starting balance.

Threshold: Medium

Result: `CreateAccountResult`

Parameters:

| Parameter        | Type       | Description                                                                                |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------ |
| Destination      | account ID | Account address that is created and funded.                                                |
| Starting Balance | integer    | Amount of RIA to send to the newly created account. This RIA comes from the source account.|


Possible errors:

| Error | Code | Description |
| ----- | ---- | ------|
|CREATE_ACCOUNT_MALFORMED| -1| The `destination` is invalid.|
|CREATE_ACCOUNT_UNDERFUNDED| -2| The source account performing the command does not have enough funds to give `destination` the `starting balance` amount of RIA and still maintain its minimum RIA reserve.  |
|CREATE_ACCOUNT_LOW_RESERVE| -3| This operation would create an account with fewer than the minimum number of RIA an account must hold.|
|CREATE_ACCOUNT_ALREADY_EXIST| -4| The `destination` account already exists.|



## Payment
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.payment) 

Sends an amount in a specific asset to a destination account.

Threshold: Medium

Result: `PaymentResult`

Parameters:

|Parameters| Type| Description|
| --- | --- | --- |
|Destination| account ID| Account address that receives the payment.|
|Asset| asset| Asset to send to the destination account.|
|Amount| integer| Amount of the aforementioned asset to send.|

Possible errors:

|Error| Code| Description|
| --- | --- | --- |
|PAYMENT_MALFORMED| -1| The input to the payment is invalid.|
|PAYMENT_UNDERFUNDED| -2| The source account (sender) does not have enough funds to send this transaction.  Note that the sender has a minimum reserve of RIA it must hold at all times.|
|PAYMENT_SRC_NO_TRUST| -3| The source account does not trust the issuer of the asset it is trying to send.|
|PAYMENT_SRC_NOT_AUTHORIZED| -4| The source account is not authorized to send this payment.|
|PAYMENT_NO_DESTINATION| -5| The receiving account does not exist.|
|PAYMENT_NO_TRUST| -6| The receiver does not trust the issuer of the asset being sent. For more information, see the [assets doc](./assets.md).|
|PAYMENT_NOT_AUTHORIZED| -7| The destination account is not authorized by the asset's issuer to hold the asset.|
|PAYMENT_LINE_FULL| -8| The receiving account only trusts an asset's issuer for a certain amount of credit.  If this transaction succeeded, the receiver's trust limit would be exceeded.|
|PAYMENT_NO_ISSUER| -9| The issuer of the asset does not exist.|
| PAYMENT_ASSET_STOP_ISSUING | -10 | Asset was stoppted issuing. Issuer cannot issuing more|
| PAYMENT_BENEFICIARY_NOT_TRUST_YET | -11 | Beneficiary hasn't still trust yet|
| PAYMENT_NO_NEW_ASSET | -12 | Asset code doesn't exist in Asset table|

## Path Payment
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.pathPayment) 

Sends an amount in a specific asset to a destination account through a path of offers. This allows the asset sent (e.g., 450 RIA) to be different from the asset received (e.g, 6 BTC).

Threshold: Medium

Result: `PathPaymentResult`

Parameters:

|Parameters| Type| Description|
| --- | --- | --- |
|Send asset| asset| The asset deducted from the sender's account.|
|Send max| integer| The maximum amount of `send asset` to deduct (excluding fees).|
|Destination| account ID| Account ID of the recipient.|
|Destination asset| asset| The asset the destination account receives.|
|Destination amount| integer| The amount of `destination asset` the destination account receives.|
|Path| list of assets| The assets (other than `send asset` and `destination asset`) involved in the offers the path takes. For example, if you can only find a path from USD to EUR through RIA and BTC, the path would be USD -> RIA -> BTC -> EUR and the `path` field would contain RIA and BTC.|

Possible errors:

| Error | Code | Description |
| ----- | ---- | ------|
|PATH_PAYMENT_MALFORMED| -1| The input to this path payment is invalid.|
|PATH_PAYMENT_UNDERFUNDED| -2| The source account (sender) does not have enough funds to send this transaction. Note that the sender has a minimum reserve of RIA it must hold at all times.|
|PATH_PAYMENT_SRC_NO_TRUST| -3| The source account does not trust the issuer of the asset it is trying to send.|
|PATH_PAYMENT_SRC_NOT_AUTHORIZED| -4| The source account is not authorized to send this payment. |
|PATH_PAYMENT_NO_DESTINATION| -5| The receiving account does not exist. |
|PATH_PAYMENT_NO_TRUST| -6| The receiver does not trust the issuer of the asset being sent. For more, see the [assets doc](./assets.md).|
|PATH_PAYMENT_NOT_AUTHORIZED| -7| The destination account is not authorized by the asset's issuer to hold the asset. |
|PATH_PAYMENT_LINE_FULL| -8| The receiving account only trusts an asset's issuer for a certain amount of credit.  If this transaction succeeded, the receiver's trust limit would be exceeded.|
|PATH_PAYMENT_NO_ISSUER| -9| The issuer on one of assets is missing.|
|PATH_PAYMENT_TOO_FEW_OFFERS| -10| There is no path of offers connecting the `send asset` and `destination asset`.  Stellar only considers paths of length 5 or shorter.|
|PATH_PAYMENT_OFFER_CROSS_SELF| -11| The payment would cross one of its own offers.|
|PATH_PAYMENT_OVER_SENDMAX| -12| The paths that could send `destination amount` of `destination asset` would exceed `send max`.|
| PATH_PAYMENT_ASSET_STOP_ISSUING | -13 | Asset was stoppted issuing. Issuer cannot issuing more|
| PATH_PAYMENT_BENEFICIARY_NOT_TRUST_YET | -14 | Beneficiary hasn't still trust yet|
| PATH_PAYMENT_NO_NEW_ASSET | -15 | Asset code doesn't exist in Asset table|

## Manage Offer
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.manageOffer)

Creates, updates, or deletes an offer.

If you want to create a new offer set Offer ID to `0`.

If you want to update an existing offer set Offer ID to existing offer ID.

If you want to delete an existing offer set Offer ID to existing offer ID and set Amount to `0`.

Threshold: Medium

Result: `ManageOfferResult`

|Parameters| Type| Description|
| --- | --- | --- |
| Selling| asset| Asset the offer creator is selling. |
| Buying| asset| Asset the offer creator is buying. |
| Amount| integer| Amount of `selling` being sold. Set to `0` if you want to delete an existing offer. |
| Price| {numerator, denominator} | Price of 1 unit of `selling` in terms of `buying`.  For example, if you wanted to sell 30 RIA and buy 5 BTC, the price would be {5,30}.|
| Offer ID| unsigned integer| The ID of the offer. `0` for new offer. Set to existing offer ID to update or delete. |

Possible errors:

| Error | Code | Description |
| ----- | ---- | ------|
|MANAGE_OFFER_MALFORMED| -1| The input is incorrect and would result in an invalid offer.|
|MANAGE_OFFER_SELL_NO_TRUST| -2| The account creating the offer does not have a trustline for the asset it is selling.|
|MANAGE_OFFER_BUY_NO_TRUST| -3| The account creating the offer does not have a trustline for the asset it is buying.|
|MANAGE_OFFER_SELL_NOT_AUTHORIZED| -4| The account creating the offer is not authorized to sell this asset.|
|MANAGE_OFFER_BUY_NOT_AUTHORIZED| -5| The account creating the offer is not authorized to buy this asset.|
|MANAGE_OFFER_LINE_FULL| -6| The account creating the offer only trusts the issuer of `buying` to a certain credit limit. If this offer succeeded, the account would exceed its trust limit with the issuer.|
|MANAGE_OFFER_UNDERFUNDED| -7| The account does not have enough of `selling` to fund this offer.|
|MANAGE_OFFER_CROSS_SELF| -8| The account has opposite offer of equal or lesser price active, so the account creating this offer would immediately cross itself.|
|MANAGE_OFFER_SELL_NO_ISSUER| -9| The issuer of selling asset does not exist.|
|MANAGE_OFFER_BUY_NO_ISSUER| -10| The issuer of buying asset does not exist.|
|MANAGE_OFFER_NOT_FOUND| -11| An offer with that `offerID` cannot be found.|
|MANAGE_OFFER_LOW_RESERVE| -12| The account creating this offer does not have enough RIA. For every offer an account creates, the minimum amount of RIA that account must hold will increase.|
| MANAGE_OFFER_NO_NEW_ASSET | -13 | Asset code doesn't exist in Asset table|

## Create Passive Offer
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.createPassiveOffer) 

A passive offer is an offer that does not act on and take a reverse offer of equal price. Instead, they only take offers
of lesser price. For example, if an offer exists to buy 5 BTC for 30 RIA, and you make a passive offer to buy 30 RIA for 5 BTC,
your passive offer *does not* take the first offer.

Note that regular offers made later than your passive offer can act on and take your passive offer, even if the regular
offer is of the same price as your passive offer.

Passive offers allow market makers to have zero spread. If you want to trade EUR for USD at 1:1 price and USD for EUR also
 at 1:1, you can create two passive offers so the two offers don't immediately act on each other.

Once the passive offer is created, you can manage it like any other offer using the [manage offer](#manage-offer) operation.

Threshold: Medium

Result: `CreatePassiveOfferResult`

|Parameters| Type| Description|
| --- | --- | --- |
|Selling| asset| The asset you would like to sell. |
|Buying| asset| The asset you would like to buy.|
|Amount| integer| Amount of `selling` being sold.|
|Price| {numerator, denominator}| Price of 1 unit of `selling` in terms of `buying`.  For example, if you wanted to sell 30 RIA and buy 5 BTC, the price would be {5,30}. |

Possible errors:


| Error | Code | Description |
| ----- | ---- | ------|
|MANAGE_OFFER_MALFORMED| -1| The input is incorrect and would result in an invalid offer.|
|MANAGE_OFFER_SELL_NO_TRUST| -2| The account creating the offer does not have a trustline for the asset it is selling.|
|MANAGE_OFFER_BUY_NO_TRUST| -3| The account creating the offer does not have a trustline for the asset it is buying.|
|MANAGE_OFFER_SELL_NOT_AUTHORIZED| -4| The account creating the offer is not authorized to sell this asset.|
|MANAGE_OFFER_BUY_NOT_AUTHORIZED| -5| The account creating the offer is not authorized to buy this asset.|
|MANAGE_OFFER_LINE_FULL| -6| The account creating the offer only trusts the issuer of `buying` to a certain credit limit. If this offer succeeded, the account would exceed its trust limit with the issuer.|
|MANAGE_OFFER_UNDERFUNDED| -7| The account does not have enough of `selling` to fund this offer.|
|MANAGE_OFFER_CROSS_SELF| -8| The account has opposite offer of equal or lesser price active, so the account creating this offer would immediately cross itself.|
|MANAGE_OFFER_SELL_NO_ISSUER| -9| The issuer of selling asset does not exist.|
|MANAGE_OFFER_BUY_NO_ISSUER| -10| The issuer of buying asset does not exist.|
|MANAGE_OFFER_NOT_FOUND| -11| An offer with that `offerID` cannot be found.|
|MANAGE_OFFER_LOW_RESERVE| -12| The account creating this offer does not have enough RIA. For every offer an account creates, the minimum amount of RIA that account must hold will increase.|


## Set Options
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.setOptions) 

This operation sets the options for an account.

For more information on the signing options, please refer to the [multi-sig doc](./multi-sig.md).

When updating signers or other thresholds, the threshold of this operation is high.

Threshold: Medium or High

Result: `SetOptionsResult`

Parameters:

|Parameters| Type| Description|
| --- | --- | --- |
|inflation Destination| account ID| Account of the inflation destination.|
|Clear flags| integer| Indicates which flags to clear. For details about the flags, please refer to the [accounts doc](./accounts.md). The bit mask integer subtracts from the existing flags of the account. This allows for setting specific bits without knowledge of existing flags.|
|Set flags| integer| Indicates which flags to set. For details about the flags, please refer to the [accounts doc](./accounts.md). The bit mask integer adds onto the existing flags of the account. This allows for setting specific bits without knowledge of existing flags.|
|Master weight| integer| Weight of the master key. This account may also add other keys with which to sign transactions using `signer` below.|
|Low threshold| integer| A number from 0-255 representing the threshold this account sets on all operations it performs that have [a low threshold](./multi-sig.html).|
|Medium threshold| integer| A number from 0-255 representing the threshold this account sets on all operations it performs that have [a medium threshold](./multi-sig.html).|
|High threshold| integer| A number from 0-255 representing the threshold this account sets on all operations it performs that have [a high threshold](./multi-sig.html). |
|Home domain| string| Sets the home domain of an account. See [Federation](./federation.md).|
|Signer| {Public Key, weight}| Add, update, or remove a signer from an account.  The signer is deleted if the weight is 0.|

Possible errors:

| Error | Code | Description |
| ----- | ---- | ------|
|SET_OPTIONS_LOW_RESERVE| -1| The account setting the options does not have enough RIA. For every new signer added to an account, the minimum reserve of RIA that account must hold increases.|
|SET_OPTIONS_TOO_MANY_SIGNERS| -2| 20 is the maximum number of signers an account can have, and adding another signer would exceed that.|
|SET_OPTIONS_BAD_FLAGS| -3| The flags set and/or cleared are invalid by themselves or in combination.|
|SET_OPTIONS_INVALID_INFLATION| -4| The destination account set in the `inflation` field does not exist.|
|SET_OPTIONS_CANT_CHANGE| -5| This account can no longer change the option it wants to change.|
|SET_OPTIONS_UNKNOWN_FLAG| -6| The account is trying to set a flag that is unknown.|
|SET_OPTIONS_THRESHOLD_OUT_OF_RANGE| -7| The value for a key weight or threshold is invalid.|
|SET_OPTIONS_BAD_SIGNER| -8| Any additional signers added to the account cannot be the master key.|
|SET_OPTIONS_INVALID_HOME_DOMAIN| -9| Home domain is malformed.|

## Change Trust
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.changeTrust) 

Creates, updates, or deletes a trustline.  For more on trustlines, please refer to the [assets documentation](./assets.md).

Threshold: Medium

Result: `ChangeTrustResult`

|Parameters| Type| Description|
| --- | --- | --- |
|Line| asset| The asset of the trustline.  For example, if a user extends a trustline of up to 200 USD to an anchor, the `line` is USD:anchor.|
|Limit| integer| The limit of the trustline.  In the previous example, the `limit` would be 200.|

Possible errors:

| Error | Code | Description |
| ----- | ---- | ------|
|CHANGE_TRUST_MALFORMED| -1| The input to this operation is invalid.|
|CHANGE_TRUST_NO_ISSUER| -2| The issuer of the asset cannot be found.|
|CHANGE_TRUST_INVALID_LIMIT| -3| This operation would drop the `limit` of this trustline below the amount of the asset the account currently holds.|
|CHANGE_TRUST_LOW_RESERVE| -4| The account does not have enough RIA.  For every new trustline added by the account, the minimum reserve of RIA it must hold increases.|
| CHANGE_TRUST_SELF_NOT_ALLOWED | -5 | Trusting self is not allowed|
| CHANGE_TRUST_NO_NEW_ASSET | -6 | Asset code doesn't exist in Asset table|




## Allow Trust
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.allowTrust) 

Updates the `authorized` flag of an existing trustline. This can only be called by the issuer of a trustline's [asset](./assets.md).

The issuer can only clear the `authorized` flag if the issuer has the `AUTH_REVOCABLE_FLAG` set. Otherwise, the issuer can only set the `authorized` flag.

Threshold: Low

Result: `AllowTrustResult`

|Parameters| Type| Description|
| --- | --- | --- |
|Trustor| account ID| The account of the recipient of the trustline.|
|Type| asset | The asset of the trustline the source account is authorizing. For example, if an anchor wants to allow another account to hold its USD credit, the `type` is USD:anchor.|
|Authorize| boolean| Flag indicating whether the trustline is authorized.|

Possible errors:

| Error | Code | Description |
| ----- | ---- | ------|
|ALLOW_TRUST_MALFORMED| -1| The asset specified in `type` is invalid.|
|ALLOW_TRUST_NO_TRUST_LINE| -2| The `trustor` does not have a trustline with the issuer performing this operation.|
|ALLOW_TRUST_TRUST_NOT_REQUIRED| -3| The source account (issuer performing this operation) does not require trust.  In other words, it does not have the flag `AUTH_REQUIRED_FLAG` set.|
|ALLOW_TRUST_CANT_REVOKE| -4| The source account is trying to revoke the trustline of the `trustor`, but it cannot do so.|
| ALLOW_TRUST_SELF_NOT_ALLOWED | -5 | Trusting self is not allowed|
| ALLOW_TRUST_NO_NEW_ASSET | -6 | Asset code doesn't exist in Asset table|


## Account Merge
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.accountMerge) 

Transfers the native balance (the amount of RIA an account holds) to another account and removes the source account from the ledger.

Threshold: High

Result: `AccountMergeResult`

|Parameters| Type| Description|
| --- | --- | --- |
|Destination| account ID| The account that receives the remaining RIA balance of the source account.|

Possible errors:

| Error | Code | Description |
| ----- | ---- | ------|
|ACCOUNT_MERGE_MALFORMED| -1| The operation is malformed because the source account cannot merge with itself. The `destination` must be a different account.|
|ACCOUNT_MERGE_NO_ACCOUNT| -2| The `destination` account does not exist.|
|ACCOUNT_MERGE_IMMUTABLE_SET| -3| The source account has `AUTH_IMMUTABLE` flag set.|
|ACCOUNT_MERGE_HAS_SUB_ENTRIES | -4| The source account has trust lines/offers.|

## Inflation
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.inflation)

This operation runs inflation.

Threshold: Low

Result: `InflationResult`

Possible errors:

| Error | Code | Description |
| ----- | ---- | ------|
|INFLATION_NOT_TIME| -1| Inflation only runs once a week. This failure means it is not time for a new inflation round yet.|


## Manage Data
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.manageData) 

Allows you to set,modify or delete a Data Entry (name/value pair) that is attached to a particular account. An account can have an arbitrary amount of DataEntries attached to it. Each DataEntry increases the minimum balance needed to be held by the account.

DataEntries can be used for application specific things. They are not used by the core Stellar protocol.

Threshold: Medium

Result: `ManageDataResult`

|Parameters| Type| Description|
| --- | --- | --- |
|Name| string | String up to 64 bytes long. If this is a new Name it will add the given name/value pair to the account. If this Name is already present then the associated value will be modified.  |
|Value| binary data | (optional) If not present then the existing Name will be deleted. If present then this value will be set in the DataEntry. Up to 64 bytes long.  |

Possible errors:

| Error | Code | Description |
| ----- | ---- | ------|
|MANAGE_DATA_NOT_SUPPORTED_YET| -1| The network hasn't moved to this protocol change yet. This failure means the network doesn't support this feature yet.|
|MANAGE_DATA_NAME_NOT_FOUND| -2| Trying to remove a Data Entry that isn't there. This will happen if Name is set (and Value isn't) but the Account doesn't have a DataEntry with that Name.|
|MANAGE_DATA_LOW_RESERVE| -3| Not enough RIA in the account to create a new Data Entry. Each additional Data Entry increases the minimum balance of the Account.|
|MANAGE_DATA_INVALID_NAME| -4| Name not a valid string.|

## CreateAsset
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.createAsset) 

**CreateAsset** is used to create a new token. The source account of the transaction which contains **CreateAsset** operation will be the unique owner on that token. We created an Asset table to save this data.

Threshold: Medium

Result: `CreateAssetResult`

Parameters:
| Parameters | Type | Description |
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
| CREATE_ASSET_MALFORMED_NATIVE_ASSET | -18 

## ChangeAsset
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.payment)

**ChangeAsset** is used to change the beneficiary (the holding fee wallet)

Threshold: Medium

Result: `ChangeAssetResult`

Parameters:

|Parameters| Type| Description|
| --- | --- | --- |
| asset | Asset | The token will be changed.|
| beneficiary | string | The new beneficiary of token|

Possible errors:

|Error| Code| Description|
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

## LimitAsset
[JavaScript](http://triamnetwork.github.io/triam-sdk/Operation.html#.payment)

**LimitAsset** is used to stop issuing more amount of the tokens. This will prevent the inflation.

Threshold: Medium

Result: `LimitAssetResult`

Parameters:

|Parameters| Type| Description|
| --- | --- | --- |
| asset | Asset |  The token will be limited|
| islimited | uint32 | Values: 0 or 1. 1 for limiting. 0 for countinue issuing. |

Possible errors:

|Error| Code| Description|
| --- | --- | --- |
| LIMIT_ASSET_MALFORMED | -1 | Invalid input|
| LIMIT_ASSET_ASSET_NO_EXIST | -2 | Asset code doesn't exist|
| LIMIT_ASSET_ISSUER_DIFF_SIGNER | -3 | Signer is difference from issuer|
| LIMIT_ASSET_ASSET_STOP_ISSUING | -4 | Asset was stopped issuing and cannot reopen|
| LIMIT_ASSET_MALFORMED_INVALID_ASSET | -5 | Invalid asset|
| LIMIT_ASSET_MALFORMED_NATIVE_ASSET | -6 | From version 10, we don't use native asset in trustline|
| LIMIT_ASSET_MALFORMED_INVALID_ISLIMITED | -7 | Values: 0 or 1|