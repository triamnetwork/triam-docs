---
Ledger Details
---

The ledger details endpoint provides information on a single [ledger](../resources/ledger.md).

## Request

```
GET /ledgers/{sequence}
```

### Arguments

|  name  |  notes  | description | example |
| ------ | ------- | ----------- | ------- |
| `sequence` | required, number | Ledger Sequence | `69859` |



## Response

This endpoint responds with a single Ledger.  See [ledger resource](../resources/ledger.md) for reference.


### Example Request
::: tabs language

- curl
  ```curl
  curl "https://testnet-horizon.arm-system-holdings.com//ledgers/69859"
  ```
- JavaScript
  ```js
  var StellarSdk = require('stellar-sdk')
  var server = new StellarSdk.Server('https://testnet-horizon.arm-system-holdings.com/');

  server.ledgers()
    .ledger('69858')
    .call()
    .then(function(ledgerResult) {
      console.log(ledgerResult)
    })
    .catch(function(err) {
      console.log(err)
    })

  ```
- Try it out
  https://laboratory.arm-system-holdings.com/#explorer?resource=ledgers&endpoint=single

:::
### Example Response

```json
{
  "_links": {
    "effects": {
      "href": "/ledgers/69859/effects/{?cursor,limit,order}",
      "templated": true
    },
    "operations": {
      "href": "/ledgers/69859/operations/{?cursor,limit,order}",
      "templated": true
    },
    "self": {
      "href": "/ledgers/69859"
    },
    "transactions": {
      "href": "/ledgers/69859/transactions/{?cursor,limit,order}",
      "templated": true
    }
  },
  "id": "4db1e4f145e9ee75162040d26284795e0697e2e84084624e7c6c723ebbf80118",
  "paging_token": "300042120331264",
  "hash": "4db1e4f145e9ee75162040d26284795e0697e2e84084624e7c6c723ebbf80118",
  "prev_hash": "4b0b8bace3b2438b2404776ce57643966855487ba6384724a3c664c7aa4cd9e4",
  "sequence": 69859,
  "transaction_count": 0,
  "operation_count": 0,
  "closed_at": "2015-07-20T15:51:52Z",
  "total_coins": "100000000000.0000000",
  "fee_pool": "0.0025600",
  "base_fee": 100,
  "base_reserve": "10.0000000",
  "max_tx_set_size": 50
}
```
