# Send Asset

## Overview
Sends an amount in a specific asset to a contract account.

## Parameters
- *contractId* : is the contract public key. It is started by `C`
- *asset* : an asset the contains asset_code, asset_type, issuer who issuing mentioned asset.
- *amount* : amount of asset we will send to the contract.

## Example
In this example, we will send asset to the contract , which was deployed.

````js
const TriamSdk = require('triam-sdk-contract');
TriamSdk.Network.use(new TriamSdk.Network(data["networkPassphrase"]));
const server = new TriamSdk.Server(data["horizonUrl"], {allowHttp: true});
const _account = TriamSdk.Keypair.fromSecret(secretKey);
const issuer = TriamSdk.Keypair.fromSecret(secretKey);
const asset = new TriamSdk.Asset("TEST" , issuer.publicKey());

server.loadAccount(_account.publicKey())
.then(function(account) {
  var transaction = new TriamSdk.TransactionBuilder(account, { fee: data["networkFee"]})
  // send `asset` to contract Key
  .addOperation(TriamSdk.Operation.sendAsset({
    contractId: contractKey,  //contract's id 
    asset : asset,  // asset
    amount: '300'  // amount
  }))
  .addMemo(TriamSdk.Memo.text('Create Account'))
  .build();
  //sign transaction
  transaction.sign(_account);
  //submit transaction
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
    console.log(JSON.stringify(transactionResult, null, 2));
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

````