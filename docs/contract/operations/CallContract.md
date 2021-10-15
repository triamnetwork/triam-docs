# Call Contract

## Overview
 We will execute call a function in contract when contract define.
 
 ## Parameters
 - *contractId* : contract account id.
 - *data* : is used by contract when executing a function in contract.
 
 ## Example
 
 ````js
 const TriamSdk = require('triam-sdk-contract');
 TriamSdk.Network.use(new TriamSdk.Network(data["networkPassphrase"]));
 const server = new TriamSdk.Server(data["horizonUrl"], {allowHttp: true});
 
 const _account = TriamSdk.Keypair.fromSecret(secretKey);
 
 server.loadAccount(_account.publicKey())
 .then(function(account) {
   var transaction = new TriamSdk.TransactionBuilder(account, { fee: data["networkFee"]})
   // call a function in contract
   .addOperation(TriamSdk.Operation.callContract({
     contractId: contractKey, // contract's id
     data: new TriamSdk.ContractInput('add', ['10']) // data will be sent.
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