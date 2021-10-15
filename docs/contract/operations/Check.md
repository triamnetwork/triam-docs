# Check

## Overview
 `Check` is used to Compare the balance of a specific account with an amount.
 
## Parameters
 - *sourceAccId* : Account address that wants to compare.
 - *amount* :The balance of the aforementioned account to compare with this amount.
 - *op*: The operator will use for comparing.

## Example
 Example is a function in contract, which is used to compare an account's balance to an amount.
 
````js
const base = require ('triam-base-contract');
let account = new base.Account (Context.sender, "0");
    let transaction = new base.TransactionBuilder(account)
    .addOperation(base.Operation.callContract({
      contractId: Context.contractKey,
      data: new base.ContractInput("tmp",[])
    }))
   .addContrOperationForCallContractOp(base.ContrOperation.check({
        sourceAccId: "GADJA4AIHUB6UO2TTTHI2P6PFVKLTACPJ4BRZYUJ3UPM3LADRXTYMOKP",
        op: ">",
        amount: "13"
    }), 1)
   .build();
```` 
 