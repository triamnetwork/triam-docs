# JAVASCRIPT API

## Class

  > Storage
   - Attributes
      - storage : this is storage of contract.
   - Methods
       - `constructor(_storage)` : create new storage for contract, if `_storage` is undefined, `storage` will be empty json. 
       - `set(_name, _data)` :  add a new field `_name` in storage, with data is `_data`. 
       - `get(_name)` : get a data store in field `_name` .
       - `remove(_name)` : delete field `_name`.
       - `update(_name, _data)` : update a field with name is `_name` and data is `_data`.
       - `save()` : convert storage to string buffer and return.
       - `recover(_data)` : recover storage from string buffer, using for testing.
       - `has(_name)` : check a field `_name` is exist.
       - `show()`: return storage as a json.
   - [Source code](#)    
        
## Functions

 > `exec (contract)` 
   - executing a class `contract`.
   - [source code](#)
     
 > `State()`  
   - return context of operation, data return include
        + `currentState`: current state of this contract.
        + `sender`: sender of transaction.
        + `ledSeq`: last close ledger sequence.
        + `param` : data input from user, if operation is `SendAsset`, param likes: 
            + `assetCode`: asset code of asset is sent, if asset is native, assetCode is `native`.
            + `assetIssuer`: issuer of asset.
            + `amount`: amount of asset will be sent.
            + `sender`: sender of operation.
            + `functionName` : name of function will be called.
            + `contractKey` :  contract id of contract.
   - [source code](#)    
 
 > `Encode(_data)` 
   - return sting buffer from json `_data1`.
   - [source code](#) 

 > `Decode (_data)` 
   - return a json from string buffer `_data`. If `_data` can not parse to json, it will throw error.
   - [source code](#)
 
 > `OutputFormat (_error, _newState, _ContrOps, _contract, _message )` 
  - format json interacted with Triam core.
      + `_error`: error code, include;
        + `0`: contract executing none error.
        + `1`: environment of docker container is incorrect so it can't execute contract.
        + `2`: contract stop when invalid condition.
      + `_newState`: new state of contract after executed.
      + `_ContrOps`: child operation of operation callContract, send to Triam core.
      + `_contract`: contract's id.
      + `_message`: message when executing contract.
  - [source code](#)
      
 > `Success`(_newState, _ContrOps, _contract, _message ) 
   -  return json on success:
      + `_newState`: new state of contract after executed.
      + `_ContrOps`: child operation of operation callContract, send to Triam core.
      + `_contract`: contract's id.
      + `_message`: message when executing contract.
   - [source code](#) 
  
 > `Success`(_newState, _ContrOps, _contract, _message ) 
   -  return json on error:
        + `_contract`: contract's id.
        + `_message`: message when executing contract.
   - [source code](#) 
          
 > `getBalance(_account)`
  - return balance of `_account`.
  - [source code](#)
  
 > `getLedgerSeq()`
  - return last close ledger sequence.
  - [source code](#)
  
 > `getState(_contractId)`
  - return last state of contract id.
  - [source code](#)
 
              