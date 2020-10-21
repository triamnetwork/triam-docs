---
Custom Assets
---

At this time, we are customizing token fee at application layer that allows an exchange to has token fee. A holding fee wallet will be received this fee and the source account will lost corresponding. Triam network hasn't this feature. But, at this vervion, we implemented it. This makes it not only easy for developing the bussinesses of third parties but also attracts more users to join Triam network. 

We created 3 new operations to:
- Has token's info for setting token fee in exchange.
- Change the holding fee wallet.
- Limit an amount of token in market for preventing inflation.

These features (operations) are described as below.
 - **CreateAsset** is used to create a new token. The source account of the transaction which contains **CreateAsset** operation will be the unique owner on that token. 
 - **ChangeAsset** is used to change the beneficiary (the holding fee wallet)
 - **LimitAsset** is used to stop issuing more amount of the tokens. This will prevent the inflation.

When we starts issuing token into market, our account will be frozen an amount of RIA corresponding. So a field named "amountlock" was added into the account records in Accounts table  to store this amount. Besides, the flow of payment or pathpayment will be redefine as below:
 A creates token named SAY with ratio is 100, minfee is 0.1, fee is zero and B is beneficiary. 
 B, C and D trusts this token. After that, A (issuer) starts issuing 1000 SAY to C. Account of A will be locked 10 RIA (1000/ratio) corresponding. C sends to D 50 SAY. This case, C will be lost 50 SAY and token fee. D is received 50 SAY. B (beneficiry) is received token fee with the formula:

 Token fee = (fee\*amount/10000 > minfee) ? fee\*amount/10000 : minfee
 <=> (0\*50/1000 > 0.1) ? 0\*50.1000 : 0.1. <=> 0.1

 Similar to pathpayment operation, the fist asset in assets path will be calculated as above.
 If any trustor sends token back to issuer, the account of issuer will be unlocked an amount corresponding. We call this is "Burning asset". Other, when we limit a token, that token will be stoppted issuing into market. Example:
 D sends back 50 SAY to issuer (A), Account of A will be unlocked 0.5 RIA (50/ratio or 50/100).
 Notes: we need to recalculate when exchanging on RIA (native token) because of an amount frozen.

 Some accounts for an example:
 ```
 Issuer:
Secret seed: SBJNGPLNMHQ7A4TRDLBIHGNBWP5BRBP62DXC2N5UMZI3FHRY2ON3WAYL
Public: GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ

Beneficiary:
Secret seed: SAC5B7TAKOG7OAKBVRBDV2GQTFSAYAZAIZ4WVL5HONVALHVM3KVKYVTC
Public: GA2XBCS73Q5TLTQA5LR6OJTKZPS5HDSIDYW3ESAD632JVMR4SFQPCKVI

New Beneficiary:
Secret seed: SC2SS43U53EXV5MCL65QJFZQNLW3GADWXAP6SEDKKAMWTFNWNOOHF6UT
Public: GA4CGIEBJNZN5XMDGMC3ZQ5EEEJEPOUNP4TX2HOQE7ND7OQGL5WZNCDF

Trustor1:
Secret seed: SBS7IFA6374K2TCT3XN5WM5VQIQFWQYJJML7QV6EP4USD2YX2PHFAYQ2
Public: GDJBQBMOB2FV3BL2NVA4FOJRILXS4JXOALZPEKPOMM4F5QP7Q3OTP6G6

Trustor2:
Secret seed: SCMDCPSZZNZTNN4HJDS3OTENF7XLBANXDEELBUTR6QKBV3NTWGOLQKKT
Public: GDHN3DOBHPTFM6EHJ3PLPY2GJ3PWNZYERHT7GZB3RCOQQ5URB4QHX4Q4
 ``` 


## Steps

#### Transaction 1: Issuer will create an asset.
**Account**: source account (issuer)
**Operations**:	
- [Create Asset](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=create-asset): create an Asset

**Signers**: source account (issuer)

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

const newToken = new TriamSdk.Asset('SAY' ,'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ');

server.loadAccount("GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
  .addOperation(TriamSdk.Operation.createAsset({
    beneficiary: 'GA2XBCS73Q5TLTQA5LR6OJTKZPS5HDSIDYW3ESAD632JVMR4SFQPCKVI',
    asset: newToken,
    fee: 0,
    ratio: 1000,
    minfee: '0.1'
  }))
  .addMemo(TriamSdk.Memo.text('Create Asset'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SBJNGPLNMHQ7A4TRDLBIHGNBWP5BRBP62DXC2N5UMZI3FHRY2ON3WAYL"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```

#### Transaction 2: Trustors and Beneficiary will trust the above asset
**Account**: source account (trustors or beneficiary)
**Operations**:
- [Change Trust](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=change-trust): trust above asset

**Signers**: source account (trustors or beneficiary)

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

const newToken = new TriamSdk.Asset('SAY' ,'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ');

server.loadAccount("GA2XBCS73Q5TLTQA5LR6OJTKZPS5HDSIDYW3ESAD632JVMR4SFQPCKVI")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
  .addOperation(StellarSdk.Operation.changeTrust({
    asset: newToken,
    limit: '922337203685.4775807'
  }))
  .addMemo(TriamSdk.Memo.text('Change Trust'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SAC5B7TAKOG7OAKBVRBDV2GQTFSAYAZAIZ4WVL5HONVALHVM3KVKYVTC"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

const newToken = new TriamSdk.Asset('SAY' ,'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ');

server.loadAccount("GDJBQBMOB2FV3BL2NVA4FOJRILXS4JXOALZPEKPOMM4F5QP7Q3OTP6G6")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
  .addOperation(StellarSdk.Operation.changeTrust({
    asset: newToken,
    limit: '922337203685.4775807'
  }))
  .addMemo(TriamSdk.Memo.text('Change Trust'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SBS7IFA6374K2TCT3XN5WM5VQIQFWQYJJML7QV6EP4USD2YX2PHFAYQ2"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

const newToken = new TriamSdk.Asset('SAY' ,'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ');

server.loadAccount("GDHN3DOBHPTFM6EHJ3PLPY2GJ3PWNZYERHT7GZB3RCOQQ5URB4QHX4Q4")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
  .addOperation(StellarSdk.Operation.changeTrust({
    asset: newToken,
    limit: '922337203685.4775807'
  }))
  .addMemo(TriamSdk.Memo.text('Change Trust'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SCMDCPSZZNZTNN4HJDS3OTENF7XLBANXDEELBUTR6QKBV3NTWGOLQKKT"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```


#### Transaction 3: Issuer will allow trust to trustors and beneficiary (if  allow trust is needed)
**Account**: source account (issuer)
- [Allow Trust](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=allow-trust): allow trust for trustline

**Signers**: source account (issuer)

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

server.loadAccount("GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
 .addOperation(StellarSdk.Operation.allowTrust({
    assetCode: "SAY",
    trustor: 'GA2XBCS73Q5TLTQA5LR6OJTKZPS5HDSIDYW3ESAD632JVMR4SFQPCKVI',
    authorize: true
  }))
  .addMemo(TriamSdk.Memo.text('Allow Trust'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SBJNGPLNMHQ7A4TRDLBIHGNBWP5BRBP62DXC2N5UMZI3FHRY2ON3WAYL"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

server.loadAccount("GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
 .addOperation(StellarSdk.Operation.allowTrust({
    assetCode: "SAY",
    trustor: 'GDJBQBMOB2FV3BL2NVA4FOJRILXS4JXOALZPEKPOMM4F5QP7Q3OTP6G6',
    authorize: true
  }))
  .addMemo(TriamSdk.Memo.text('Allow Trust'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SBJNGPLNMHQ7A4TRDLBIHGNBWP5BRBP62DXC2N5UMZI3FHRY2ON3WAYL"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

server.loadAccount("GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
 .addOperation(StellarSdk.Operation.allowTrust({
    assetCode: "SAY",
    trustor: 'GDHN3DOBHPTFM6EHJ3PLPY2GJ3PWNZYERHT7GZB3RCOQQ5URB4QHX4Q4',
    authorize: true
  }))
  .addMemo(TriamSdk.Memo.text('Allow Trust'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SBJNGPLNMHQ7A4TRDLBIHGNBWP5BRBP62DXC2N5UMZI3FHRY2ON3WAYL"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```

#### Transaction 4: Issuer starts issuing asset
**Account**: source account (issuer)
**Operations**:
- [Payment](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=payment): issuing asset to the trustors. The exchange will not lose asset's fee. Destination will be the trustors and beneficiary

**Signers**: source account (issuer)

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

const newToken = new TriamSdk.Asset('SAY' ,'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ');

server.loadAccount("GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
  .addOperation(StellarSdk.Operation.payment({
    destination: 'GDJBQBMOB2FV3BL2NVA4FOJRILXS4JXOALZPEKPOMM4F5QP7Q3OTP6G6',
    asset: newToken,
    amount: '1000',
  }))
  .addMemo(TriamSdk.Memo.text('Payment'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SBJNGPLNMHQ7A4TRDLBIHGNBWP5BRBP62DXC2N5UMZI3FHRY2ON3WAYL"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```

#### Transaction 5: Trustor1 make an exchange to trustor2 by using payment operation with above asset. Beneficiary will be received asset's fee
**Account**: trustor1
**Operations**:
- [Payment](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=payment): give an amount of asset to trustor2. 

**Signers**: trustor1

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

const newToken = new TriamSdk.Asset('SAY' ,'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ');

server.loadAccount("GDJBQBMOB2FV3BL2NVA4FOJRILXS4JXOALZPEKPOMM4F5QP7Q3OTP6G6")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
  .addOperation(StellarSdk.Operation.payment({
    destination: 'GDHN3DOBHPTFM6EHJ3PLPY2GJ3PWNZYERHT7GZB3RCOQQ5URB4QHX4Q4',
    asset: newToken,
    amount: '500',
  }))
  .addMemo(TriamSdk.Memo.text('Payment'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SBS7IFA6374K2TCT3XN5WM5VQIQFWQYJJML7QV6EP4USD2YX2PHFAYQ2"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```


#### Transaction 6: Trustor can give back the asset to Issuer. We call this is "Burning asset"
**Account**: trustor
**Operations**:
- [Payment](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=payment): give an amount of asset to issuer. 

**Signers**: trustor

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

const newToken = new TriamSdk.Asset('SAY' ,'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ');

server.loadAccount("GDHN3DOBHPTFM6EHJ3PLPY2GJ3PWNZYERHT7GZB3RCOQQ5URB4QHX4Q4")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
  .addOperation(StellarSdk.Operation.payment({
    destination: 'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ',
    asset: assetBE,
    amount: '100',
  }))
  .addMemo(TriamSdk.Memo.text('Payment'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SCMDCPSZZNZTNN4HJDS3OTENF7XLBANXDEELBUTR6QKBV3NTWGOLQKKT"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```

#### Transaction 7: Issuer can change Beneficiary
**Account**: issuer
**Operations**:
- [Change Asset](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=change-asset): change current beneficiary to another beneficiary

**Signers**: issuer

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

const newToken = new TriamSdk.Asset('SAY' ,'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ');

server.loadAccount("GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
  .addOperation(TriamSdk.Operation.changeAsset({
    asset: newToken,
    beneficiary: 'GA2XBCS73Q5TLTQA5LR6OJTKZPS5HDSIDYW3ESAD632JVMR4SFQPCKVI'
  }))
  .addMemo(TriamSdk.Memo.text('Change Asset'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SBJNGPLNMHQ7A4TRDLBIHGNBWP5BRBP62DXC2N5UMZI3FHRY2ON3WAYL"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```

#### Transaction 8: Issuer stop issuing asset
**Account**: issuer
**Operations**:
- [Limit Asset](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=limit-asset): stop issuing asset to prevent inflation

**Signers**: issuer

```js
var TriamSdk = require('triam-sdk');
var server = new TriamSdk.Server('testnet-horizon.triamnetwork.com');

const newToken = new TriamSdk.Asset('SAY' ,'GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ');

server.loadAccount("GBOYTLY55G75JHGB5LHQ6AOKUHSWB3IU4OVBQMFZ7RCZ4NBRVST4M3NZ")
.then(function(account) {

  var transaction = new TriamSdk.TransactionBuilder(account, { fee: 10000})
  .addOperation(TriamSdk.Operation.limitAsset({
    asset: newToken,
    islimited: 1
  }))
  .addMemo(TriamSdk.Memo.text('Limit Asset'))
  .build();
  
  transaction.sign(TriamSdk.Keypair.fromSecret("SBJNGPLNMHQ7A4TRDLBIHGNBWP5BRBP62DXC2N5UMZI3FHRY2ON3WAYL"));
  
  server.submitTransaction(transaction)
  .then(function(transactionResult) {
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
```
