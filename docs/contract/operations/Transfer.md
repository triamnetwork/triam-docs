# Transfer

## Overview
 `Transfer` is used to transfer amount of an asset from the mentioned contract to destination.
 
## Parameters
 - *destination* : Account address that receives the payment.
 - *asset* : An asset to send to the destination account.
 - *amount*: Amount of the aforementioned asset to send.

## Example
 Example is a function in contract, which is used to transfer an amount of asset from contract account to another account.
 
````js
const base = require ('triam-base-contract');
//create a temporary account
let account = new base.Account (Context.sender, "0");
//build a transaction wrap operation call contract
    let transaction = new base.TransactionBuilder(account)
    .addOperation(base.Operation.callContract({ // add operation call contrat
      contractId: Context.contractKey,
      data: new base.ContractInput("tmp",[])
    }))
   .addContrOperationForCallContractOp(base.ContrOperation.transfer({ // add call contract's child operation transfer
         destination: "GADJA4AIHUB6UO2TTTHI2P6PFVKLTACPJ4BRZYUJ3UPM3LADRXTYMOKP",
         asset: StellarSdk.Asset.native(),
         amount: "23"
    }), 1)
   .build();
    //return a transaction as xdr.
   transaction.toEnvelope ().toXDR ().toString ('base64');    
```` 
 