---
Load Account
---

## Overview

In order to submit transactions for an account, you need to know the account's sequence number (please see [this explanation](../readme.md#sequence-numbers)).  If you don't store the sequence number locally, you have to read the sequence number from the Horizon server.

`loadAccount()` allows you to read sequence numbers from the network.  Simply pass in the address of the account you're interested in, and it will return to you a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to an [Account object](https://github.com/triamnetwork/js-triam-base/blob/master/src/account.js).

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `address` | `string` | Address of account you want to load. |

## Example

```js
server.loadAccount("GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ")
    .then(function (account) {
        // build the transaction with the account as the source
        var transaction = new TriamSdk.TransactionBuilder(account)
            // this operation funds the new account with XLM
            .addOperation(TriamSdk.Operation.payment({
                destination: "GASGUKGJA6I5YMLSGD2H5IYFVER4NCIUWXK3XZ6HYMYYJ4YWZD52LRID",
                asset: TriamSdk.Asset.native(),
                amount: "1"
            }))
            .build();

        transaction.sign(TriamSdk.Keypair.fromSeed(seedString)); // sign the transaction

        return server.submitTransaction(transaction);
    })
    .then(function (transactionResult) {
        console.log(transactionResult);
    })
    .catch(function (err) {
        console.error(err);
    });
```
