# Simple Contract with Triam SDK


## Introduction to Smart contract.
	
Let us start with a simple example of smart contracts. The smart contract will store 1 number and there are 2 functions to use to add and subtract this number with a number entered by the user.
	Code below:
	
 ````js
'use strict';
/**
 * first part of contract, require packages
 */
const base = require ('triarm-base-sc');
const Bignumber = require ('bignumber.js');
const Storage = base.Storage;
const Context = base.State ();

/**
 * second part of contract, define contract
 */
class SimpleContract {
  //don't change anything in this function constructor
  constructor(_storage) {
    this.storage = new Storage (_storage);
  }
  
  /**
   * initial storage for contract
   * @param _myNumber
   * @returns {*}
   */
  initialize(_myNumber) {
    //add Number in storage, with value: _myNumber
    this.storage.set("Number", _myNumber);
    //return success json
    return base.Success (this.storage.save(), "", Context.contractKey, 'OK')
  }
  
  /**
   * function call when contract receive asset
   * @returns {*}
   */
  fallback() {
    //return error json, contract cant receive asset
    return base.Failed (Context.contractKey, "Contract cant receive asset");
  }
  
  /**
   * add _number
   * @param _number
   * @returns {*}
   */
  add (_number) {
    //change storage Number
    let newNumber = new Bignumber(this.storage.get('Number')).plus(new Bignumber(_number.toString()));
    //update storage Number
    this.storage.update('Number', newNumber.toString(10));
    //return succsess json
    return base.Success (this.storage.save (), SimpleContract.output(this.storage.save()), Context.contractKey, 'OK')
  }
  
  /**
   * subtract _number
   * @param _number
   * @returns {*}
   */
  sub (_number) {
    let newNumber = new Bignumber(this.storage.get('Number')).minus(new Bignumber(_number.toString()));
    this.storage.update('Number', newNumber.toString(10));
    return base.Success (this.storage.save (), SimpleContract.output(this.storage.save()), Context.contractKey, 'OK')
  }
  
  /**
   * handle output
   * @param _data
   * @returns {*}
   */
  static output(_data) {
    //create new transaction to wrap call contract operation
    let account = new base.Account (Context.sender, "0");
    let transaction = new base.TransactionBuilder(account)
    .addOperation(base.Operation.callContract({ //add operation call contract
      contractId: Context.contractKey,
      data: new base.ContractInput("tmp",[])
    }))
    .addContrOperationForCallContractOp(base.ContrOperation.invoke({ // add callcontracOperation invoke
      newState: _data  // in XLM
    }), 1)
    .build();
    //return transaction as xdr
    return transaction.toEnvelope ().toXDR ().toString ('base64');
  }
  
  /**
   * main function for contract
   * @param _funcName
   * @param _params
   * @returns {*}
   */
  main (_funcName, _params) {
    //switch the function name
    switch (_funcName) {
      case "constructor": {
        return this.initialize (_params[0]);
      }
      case "fallback" : {
        return this.fallback();
      }
      case "add": {
        return this.add(_params[0]);
      }
      case "sub": {
        return this.sub(_params[0]);
      }
      default:
        return base.Failed ( Context.contractKey, "Cant not map the function name");
    }
  }
}

/**
 * execute contract
 */
base.exec(SimpleContract);

````

   The first part of the contract, we will add the necessary modules so that the contract can run. First, you can see that the `triam-base-contract` package, this is the basic package, includes many functions that assist in contracting interaction with Triam core. Next is the `Bignumber.js` package, which is a package used to assist in javascript calculations. In addition to these two packages, Triam VM does not support any packages, avoiding the case of developers putting in content packages to attack the system. This section also requires two basic functions that are Storage (used to contract storage) and Context (the basic information of calling a core contract).
	
   The second part, the content of contract implementation will be defined in a class, the required class always has 4 functions:
+ constructor: This function must not be changed.
+ initialize: this is the function to create contract storage, which is used when initializing the contract.
+ fallback: this function will be called when a contract receives the asset sent from the user.
+ main: this is the main function, always called when there is a call from the core, every function in the contract you want to call must be added to the main function.

 The last part, this is the function provided by the `triam-base-contract` package to implement the contract defined above.

In addition to the main functions mentioned above, the contract also has 2 functions
+ add (_number): This function is used to add to the number stored in the contract by _number, which is entered by users. After doing all the calculations, to contract to update data on the blockchain, the contract needs to return results in the format supported by the `OutputFormat` function, provided by the` triam-base-contract` package.
+ sub (_number): This function is used to subtract the number stored in the contract by _number, which is entered by users.

After going to define functions, we add these functions to the main function functions, according to the predefined syntax, similar to the fallback functions, initialize.

Above is a simple example and detailed explanation, we will go into the next section to better understand how to write, deploy and interact with Triam smart contract.

## Javascript API:
   [Link to Document](/docs/contract/api/jsApi)

## Deploy Contract:
With the contract listed above, we will then deploy a contract to the Triam network. The work will be conducted according to the following steps:
- Step 1: Upload contract to contract host:
    - We provide an API to allow the user to upload the contract file to the host and return the filename and file hash of the contract so that the user enters the transaction to create a contract.
    - If the developer can use to write contracts in many different files, we encourage developers to use JavaScripts support tools to merge the files into only one file and upload to the contract host.


- Step 2: Create a transaction with the create contract operation.

Example: create a contract

````js
	
const TriamSdk = require('triam-sdk-contract');

TriamSdk.Network.use(new TriamSdk.Network("networkPassphrase"));
const server = new TriamSdk.Server("horizonUrl", {allowHttp: true});


const _account = TriamSdk.Keypair.fromSecret(secretKey);
server.loadAccount(_account.publicKey())
.then(function(account) {
  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 100})
  .addOperation(TriamSdk.Operation.createContract({
    startingBalance: "20",   // starting balance with contract
    contractAddr: "c8d0c91929e6ea08cd4805c11a66d7b516b90be7d3d47e94e56cab4770f5c743.js", //file name with contract
    data: new TriamSdk.ContractInput("constructor",["10"]), // data will send to contract, call function constructor and set contract's Number is 10
    fileHash: '92c0a6a0fc028383f6cd683e2a8e14e6d1f94bb7cb05187ada12b35758226d6f' // hash of contract file
  }))
  .addMemo(TriamSdk.Memo.text('Create Account'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret(_account.privateKey));
  let tx = encodeURIComponent(transaction.toEnvelope().toXDR().toString("base64"));
  console.log('tx',tx);
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
    console.log(JSON.stringify(transactionResult, null, 2));
    console.log('\nSuccess! View the transaction at: ');
    console.log(transactionResult._links.transaction.href);
  })
  .catch(function(err) {
    console.log('An error has occurred:');
    console.log(err.response.data.extras);
  });
})
.catch(function(e) {
  console.error(e);
});
````


## Interact with Contract.
- After deploying the contract, we will receive the contract id created from Triam core, now to interact with the contract, we will use contract id and operations provided by triam-sdk.

Example: call function add.
````js

const TriamSdk = require('triarm-sdk-sc');

TriamSdk.Network.use(new TriamSdk.Network(data["networkPassphrase"]));
const server = new TriamSdk.Server("horizon_url" , {allowHttp: true});
const _account = TriamSdk.Keypair.fromSecret(secretKey);

//get sequence number of account
server.loadAccount(_account.publicKey())
.then(function(account) {
  //build tranansaction
  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 100})
  //add operation to transaction
  .addOperation(TriamSdk.Operation.callContract({
    contractId: "contractKey", //contract key
    data: new TriamSdk.ContractInput('add', ['10']) // call function add with value is 10
  }))
  //add memo to transaction
  .addMemo(TriamSdk.Memo.text('Create Account'))
  .build();
  //sign transaction
  transaction.sign(TriamSdk.Keypair.fromSecret(_account.privateKey));
  //submit transaction
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
    console.log(JSON.stringify(transactionResult, null, 2));
    console.log('\nSuccess! View the transaction at: ');
    console.log(transactionResult._links.transaction.href);
  })
  .catch(function(err) {
    console.log('An error has occurred:');
    console.log(err.response.data.extras);
  });
})
.catch(function(e) {
  console.error(e);
});
````










