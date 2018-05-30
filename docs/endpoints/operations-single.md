---
Operation Details
---

The operation details endpoint provides information on a single [operation](../resources/operation.md). The operation ID provided in the `id` argument specifies which operation to load.

## Request

```
GET /operations/{id}
```

### Arguments

|  name  |  notes  | description | example |
| ------ | ------- | ----------- | ------- |
| `id` | required, number | An operation ID. | 77309415424 |



## Response

This endpoint responds with a single Operation.  See [operation resource](../resources/operation.md) for reference.


### Example Request
::: tabs language

- curl
  ```curl
  curl https://testnet-horizon.arm-system-holdings.com//operations/77309415424
  ```
- JavaScript
  ```js
  var StellarSdk = require('stellar-sdk');
  var server = new StellarSdk.Server('https://testnet-horizon.arm-system-holdings.com/');

  server.operations()
    .operation('77309415424')
    .call()
    .then(function (operationsResult) {
      console.log(operationsResult)
    })
    .catch(function (err) {
      console.log(err)
    })


  ```
- Try it out
  https://laboratory.arm-system-holdings.com/#explorer?resource=operations&endpoint=single

:::
### Example Response

```json
{
  "_links": {
    "effects": {
      "href": "/operations/77309415424/effects/{?cursor,limit,order}",
      "templated": true
    },
    "precedes": {
      "href": "/operations?cursor=77309415424&order=asc"
    },
    "self": {
      "href": "/operations/77309415424"
    },
    "succeeds": {
      "href": "/operations?cursor=77309415424&order=desc"
    },
    "transactions": {
      "href": "/transactions/77309415424"
    }
  },
  "account": "GBIA4FH6TV64KSPDAJCNUQSM7PFL4ILGUVJDPCLUOPJ7ONMKBBVUQHRO",
  "funder": "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ",
  "id": 77309415424,
  "paging_token": "77309415424",
  "starting_balance": 1e+14,
  "type_i": 0,
  "type": "create_account"
}
```
