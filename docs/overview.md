---
Overview
---
The JavaScript Triam SDK facilitates integration with the [Triam Horizon API server](#) and submission of Triam transactions, either on Node.js or in the browser. It has two main uses: [querying Horizon](#querying-horizon) and [building, signing, and submitting transactions to the Triam network](#building-transactions).

[Building and installing js-triam-sdk](https://triamnetwork.github.io/triam-sdk/)<br>
[Examples of using js-triam-sdk](./examples.md)

# Querying Horizon
js-triam-sdk gives you access to all the endpoints exposed by Horizon.

## Building requests
js-triam-sdk uses the [Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) to create the requests to send
to Horizon. Starting with a [server](https://triamnetwork.github.io/triam-sdk/Server.html) object, you can chain methods together to generate a query.
(See the [Horizon reference](https://triamnetwork.github.io/triam-docs/) documentation for what methods are possible.)
```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('https://testnet-horizon.arm-system-holdings.com');
// get a list of transactions that occurred in ledger 1400
server.transactions()
    .forLedger(1400)
    .call().then(function(r){ console.log(r); });

// get a list of transactions submitted by a particular account
server.transactions()
    .forAccount('GASGUKGJA6I5YMLSGD2H5IYFVER4NCIUWXK3XZ6HYMYYJ4YWZD52LRID')
    .call().then(function(r){ console.log(r); });
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              var server = new TriamSdk.Server('https://testnet-horizon.arm-system-holdings.com/');
              // get a list of transactions that occurred in ledger 1400
              server.transactions()
                  .forLedger(1400)
                  .call().then(function(r){ console.log(r); });

              // get a list of transactions submitted by a particular account
              server.transactions()
                  .forAccount('GASGUKGJA6I5YMLSGD2H5IYFVER4NCIUWXK3XZ6HYMYYJ4YWZD52LRID')
                  .call().then(function(r){
                     $('#json-renderer').jsonViewer(r.records);
                     $('#json-renderer').prepend('<p>results:</p>');
                   })
                   .catch(function(err){
                      $('#json-renderer').jsonViewer(err.message);
                      $('#json-renderer').prepend('<p>results:</p>');
                    });
            }
        }
    }
</script>
```

Once the request is built, it can be invoked with `.call()` or with `.stream()`. `call()` will return a
[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to the response given by Horizon.

## Streaming requests
Many requests can be invoked with `stream()`. Instead of returning a promise like `call()` does, `.stream()` will return an `EventSource`.
Horizon will start sending responses from either the beginning of time or from the point specified with `.cursor()`.
(See the [Horizon reference](https://triamnetwork.github.io/triam-docs/) documentation to learn which endpoints support streaming.)

For example, to log instances of transactions from a particular account:

```javascript
var TriamSdk = require('triam-sdk')
var server = new TriamSdk.Server('https://testnet-horizon.arm-system-holdings.com');
var lastCursor=0; // or load where you left off

var txHandler = function (txResponse) {
    console.log(txResponse);
};

var es = server.transactions()
    .forAccount(accountAddress)
    .cursor(lastCursor)
    .stream({
        onmessage: txHandler
    })
```

## Handling responses

### XDR
The transaction endpoints will return some fields in raw [XDR](#)
form. You can convert this XDR to JSON using the `.fromXDR()` method.

An example of re-writing the txHandler from above to print the XDR fields as JSON:

```javascript
var txHandler = function (txResponse) {
    console.log( JSON.stringify(TriamSdk.xdr.TransactionEnvelope.fromXDR(txResponse.envelope_xdr, 'base64')) );
    console.log( JSON.stringify(TriamSdk.xdr.TransactionResult.fromXDR(txResponse.result_xdr, 'base64')) );
    console.log( JSON.stringify(TriamSdk.xdr.TransactionMeta.fromXDR(txResponse.result_meta_xdr, 'base64')) );
};

```


### Following links
The links returned with the Horizon response are converted into functions you can call on the returned object.
This allows you to simply use `.next()` to page through results. It also makes fetching additional info, as in the following example, easy:

```js
server.payments()
    .limit(1)
    .call()
    .then(function(response){
        // will follow the transactions link returned by Horizon
        response.records[0].transaction().then(function(txs){
            console.log(txs);
        });
    });
```


# Transactions

## Building transactions

See the [Building Transactions](#) guide for information about assembling a transaction.

## Submitting transactions
Once you have built your transaction, you can submit it to the Triam network with `Server.submitTransaction()`.
```js
var TriamSdk = require('triam-sdk')
TriamSdk.Network.useTestNetwork();
var server = new TriamSdk.Server('https://testnet-horizon.arm-system-holdings.com');

server
  .loadAccount(publicKey)
  .then(function(account){
  		var transaction = new TriamSdk.TransactionBuilder(account)
  				// this operation funds the new account with XLM
  				.addOperation(TriamSdk.Operation.payment({
  					destination: "GASGUKGJA6I5YMLSGD2H5IYFVER4NCIUWXK3XZ6HYMYYJ4YWZD52LRID",
  					asset: TriamSdk.Asset.native(),
  					amount: "1"
  				}))
  				.build();

  		transaction.sign(TriamSdk.Keypair.fromSecret(secretString)); // sign the transaction

		return server.submitTransaction(transaction);
  })
  .then(function (transactionResult) {
    console.log(transactionResult);
  })
  .catch(function (err) {
  	console.error(err);
  });
```
