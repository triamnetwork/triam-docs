# Query

## Overview
 `Query`  used to return data to horizon.
 
## Parameters
 - *data* : Data return to horizon (should convert data to buffer).
 

## Example
 Example is a function in contract, which is used to return data after user query.
 
````js
const base = require ('triam-base-contract');
//create a temporary account
let account = new base.Account (Context.sender, "0");
    let transaction = new base.TransactionBuilder(account)
    .addOperation(base.Operation.callContract({
      contractId: Context.contractKey,
      data: new base.ContractInput("tmp",[])
    }))
   .addContrOperationForCallContractOp(base.ContrOperation.query({ // add operation query
        data: "979jfe9f9ds7f9e0fsf09e7f9s9fd7s9f7e09f0sd9f8e"  //data will be return
    }), 1)
   .build();
    transaction.toEnvelope ().toXDR ().toString ('base64');  
```` 
 