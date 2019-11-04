---
Submit Transaction
---

## Overview

You can build a transaction locally (see [this example](../readme.md#building-transactions)), but after you build it you have to submit it to the Triam network.  js-triam-sdk has a function `submitTransaction()` that sends your transaction to the Horizon server (via the [`transactions_create`](https://triamnetwork.com/developers/horizon/reference/transactions-create.html) endpoint) to be broadcast to the Triam network.

## Methods

| Method | Horizon Endpoint | Param Type | Description |
| --- | --- | --- | --- |
| `submitTransaction(Transaction)` | [`transactions_create`](https://triamnetwork.com/developers/horizon/reference/transactions-create.html) |  [`Transaction`](https://github.com/triamnetwork/js-triam-base/blob/master/src/transaction.js) | Submits a transaction to the network.

## Example

```js
var TriamSdk = require('js-triam-sdk')
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

var transaction = new TriamSdk.TransactionBuilder(account)
        // this operation funds the new account with RIA
        .addOperation(TriamSdk.Operation.payment({
            destination: "GASGUKGJA6I5YMLSGD2H5IYFVER4NCIUWXK3XZ6HYMYYJ4YWZD52LRID",
            asset: TriamSdk.Asset.native(),
            amount: "1"
        }))
        .build();

transaction.sign(TriamSdk.Keypair.fromSeed(seedString)); // sign the transaction

server.submitTransaction(transaction)
    .then(function (transactionResult) {
        console.log(transactionResult);
    })
    .catch(function (err) {
        console.error(err);
    });
```
