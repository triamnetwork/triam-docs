---
Basic Examples
---

- [Creating a payment transaction](#creating-a-payment-transaction)
- [Loading an account's transaction history](#loading-an-accounts-transaction-history)
- [Streaming payment events](#streaming-payment-events)

## Creating a payment transaction

js-triam-sdk exposes the [`TransactionBuilder`](https://github.com/triamnetwork/js-triam-base/blob/master/src/transaction_builder.js) class from js-triam-base.  There are more examples of [building transactions here](#). All those examples can be signed and submitted to Ria in a similar manner as is done below.

In this example you must ensure that the destination account exists

```javascript
// Create, sign, and submit a transaction using JS Triam SDK.

// Assumes that you have the following items:
// 1. Secret key of a funded account to be the source account
// 2. Public key of an existing account as a recipient
//    These two keys can be created and funded by the friendbot at
//    https://www.triamnetwork.com/laboratory/ under the heading "Quick Start: Test Account"
// 3. Access to JS Triam SDK (https://github.com/triamnetwork/js-triam-sdk)
//    either through Node.js or in the browser.

// This code can be run in the browser at https://www.triamnetwork.com/laboratory/
// That site exposes a global TriamSdk object you can use.
// To run this code in the Chrome, open the console tab in the DevTools.
// The hotkey to open the DevTools console is Ctrl+Shift+J or (Cmd+Opt+J on Mac).

// To use in node, do `npm install triam-sdk` and uncomment the following line.
// var TriamSdk = require('triam-sdk');

// The source account is the account we will be signing and sending from.
var sourceSecretKey = 'SAKRB7EE6H23EF733WFU76RPIYOPEWVOMBBUXDQYQ3OF4NF6ZY6B6VLW';

// Derive Keypair object and public key (that starts with a G) from the secret
var sourceKeypair = TriamSdk.Keypair.fromSecret(sourceSecretKey);
var sourcePublicKey = sourceKeypair.publicKey();

var receiverPublicKey = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';

// Configure TriamSdk to talk to the horizon instance hosted by Triam.org
// To use the live network, set the hostname to 'horizon.triamnetwork.com'
var server = new TriamSdk.Server('https://testnet-horizon.arm-system-holdings.com');

// Uncomment the following line to build transactions for the live network. Be
// sure to also change the horizon hostname.
// TriamSdk.Network.usePublicNetwork();
TriamSdk.Network.useTestNetwork();

// Transactions require a valid sequence number that is specific to this account.
// We can fetch the current sequence number for the source account from Horizon.
server.loadAccount(sourcePublicKey)
  .then(function(account) {
    var transaction = new TriamSdk.TransactionBuilder(account)
      // Add a payment operation to the transaction
      .addOperation(TriamSdk.Operation.payment({
        destination: receiverPublicKey,
        // The term native asset refers to lumens
        asset: TriamSdk.Asset.native(),
        // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
        // the decimal. They are represented in JS Triam SDK in string format
        // to avoid errors from the use of the JavaScript Number data structure.
        amount: '350.1234567',
      }))
      // .addMemo(TriamSdk.Memo.text('Hello world!'))
      .build();

    // Sign this transaction with the secret key
    // NOTE: signing is transaction is network specific. Test network transactions
    // won't work in the public network. To switch networks, use the Network object
    // as explained above (look for TriamSdk.Network).
    transaction.sign(sourceKeypair);

    // Let's see the XDR (encoded in base64) of the transaction we just built
    console.log(transaction.toEnvelope().toXDR('base64'));

    // Submit the transaction to the Horizon server. The Horizon server will then
    // submit the transaction into the network for us.
    server.submitTransaction(transaction)
      .then(function(transactionResult) {
        console.log(JSON.stringify(transactionResult, null, 2));
        console.log('\nSuccess! View the transaction at: ');
        console.log(transactionResult._links.transaction.href);
      })
      .catch(function(err) {
        console.log('An error has occured:');
        console.log(err);
      });
  })
  .catch(function(e) {
    console.error(e);
  });
```

## Loading an account's transaction history

Let's say you want to look at an account's transaction history.  You can use the `transactions()` command and pass in the account address to `forAccount` as the resource you're interested in.

```javascript
var TriamSdk = require('triam-sdk')
var server = new TriamSdk.Server('https://testnet-horizon.arm-system-holdings.com');
var accountId = 'GBBORXCY3PQRRDLJ7G7DWHQBXPCJVFGJ4RGMJQVAX6ORAUH6RWSPP6FM';

server.transactions()
    .forAccount(accountId)
    .call()
    .then(function (page) {
        console.log('Page 1: ');
        console.log(page.records);
        return page.next();
    })
    .then(function (page) {
        console.log('Page 2: ');
        console.log(page.records);
    })
    .catch(function (err) {
        console.log(err);
    });
```

## Streaming payment events

js-triam-sdk provides streaming support for Horizon endpoints using `EventSource`.  You can pass a function to handle any events that occur on the stream.

Try submitting a transaction (via the guide above) while running the following code example.
```javascript
var TriamSdk = require('triam-sdk')
var server = new TriamSdk.Server('https://testnet-horizon.arm-system-holdings.com');

// Get a message any time a payment occurs. Cursor is set to "now" to be notified
// of payments happening starting from when this script runs (as opposed to from
// the beginning of time).
var es = server.payments()
  .cursor('now')
  .stream({
    onmessage: function (message) {
      console.log(message);
    }
  })
```

For more on streaming events, please check out [the Horizon responses documentation](#) and this [guide to server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events).
