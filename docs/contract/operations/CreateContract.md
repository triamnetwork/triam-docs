# Create Contract

## Overview
This operation creates and funds a new contract with the specified starting balance.

## Parameters 
- *startingBalance* : amount will be funded for a new contract (only RIA).
- *contractAddr* : the file name of contract is stored into contract host, which receive after uploaded contract file to host.
- *data* :  is used by a contract when the contract is executed at docker.
- *filehash* : we create a contract file. After uploading, we gets a hash of contract file and sends to the stellar core by CreateContract Operation. We need to know whether the contract file has changed.

## Example
In this example below, we will create simple transaction with operation create contract:

````js
  const TriamSdk = require('triam-sdk-contract');
  TriamSdk.Network.use(new TriamSdk.Network("networkPassphrase"));
  const server = new TriamSdk.Server("horizonUrl", {allowHttp: true});
  const _account = TriamSdk.Keypair.fromSecret(secretKey);
  server.loadAccount(_account.publicKey())
  .then(function(account) {
    var transaction = new TriamSdk.TransactionBuilder(account, { fee: data["networkFee"]})
    .addOperation(TriamSdk.Operation.createContract({
      startingBalance: "20",
      contractAddr: "c8d0c91929e6ea08cd4805c11a66d7b516b90be7d3d47e94e56cab4770f5c743.js",
      data: new TriamSdk.ContractInput("constructor",["10"]),
      fileHash: '92c0a6a0fc028383f6cd683e2a8e14e6d1f94bb7cb05187ada12b35758226d6f'
    }))
    .addMemo(TriamSdk.Memo.text('Create Account'))
    .build();
    
    transaction.sign(_account);
    let tx = encodeURIComponent(transaction.toEnvelope().toXDR().toString("base64"));
    console.log('tx',tx);
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

 


