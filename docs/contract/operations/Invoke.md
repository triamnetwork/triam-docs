# Invoke

## Overview
 `Invoke` is used to Change the new state of contract after executing.
 
## Parameters
 - *newState* : The new state of the contract will be changed after executing.

## Example
 Example is a function in contract, which is used to change contract's state.
 
````js
const base = require ('triam-base-contract');
//create a temporary account
let account = new base.Account (Context.sender, "0");
    let transaction = new base.TransactionBuilder(account)
    .addOperation(base.Operation.callContract({
      contractId: Context.contractKey,
      data: new base.ContractInput("tmp",[])
    }))
   .addContrOperationForCallContractOp(base.ContrOperation.invoke({  // add operation invoke
         newState: "new_state"  //  state will be changed
       }), 1)
   .build();
    transaction.toEnvelope ().toXDR ().toString ('base64');  
```` 
 