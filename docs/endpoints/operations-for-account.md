---
Operations for Account
---

This endpoint represents all [operations](../resources/operation.md) that were included in valid [transactions](../resources/transaction.md) that affected a particular [account](../resources/account.md).

This endpoint can also be used in [streaming](../responses.md#streaming) mode so it is possible to use it to listen for new operations that affect a given account as they happen.
If called in streaming mode Horizon will start at the earliest known operation unless a `cursor` is set. In that case it will start from the `cursor`. You can also set `cursor` value to `now` to only stream operations created since your request time.

## Request

```
GET /accounts/{account}/operations{?cursor,limit,order}
```

### Arguments

| name     | notes                          | description                                                      | example                                                   |
| ------   | -------                        | -----------                                                      | -------                                                   |
| `account`| required, string               | Account ID                                                  | `GA2HGBJIJKI6O4XEM7CZWY5PS6GKSXL6D34ERAJYQSPYA6X6AI7HYW36`|
| `?cursor`| optional, default _null_       | A paging token, specifying where to start returning records from.  When streaming this can be set to `now` to stream object created since your request time. | `12884905984`                                             |
| `?order` | optional, string, default `asc`| The order in which to return rows, "asc" or "desc".              | `asc`                                                     |
| `?limit` | optional, number, default `10` | Maximum number of records to return.                             | `200`                                                     |


## Response

This endpoint responds with a list of operations that affected the given account. See [operation resource](../resources/operation.md) for reference.


### Example Request
::: tabs language

- curl
  ```curl
  curl "https://horizon-testnet.stellar.org/accounts/GA2HGBJIJKI6O4XEM7CZWY5PS6GKSXL6D34ERAJYQSPYA6X6AI7HYW36/operations"
  ```
- JavaScript
  ```js
  var StellarSdk = require('stellar-sdk');
  var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

  server.operations()
    .forAccount("GAKLBGHNHFQ3BMUYG5KU4BEWO6EYQHZHAXEWC33W34PH2RBHZDSQBD75")
    .call()
    .then(function (operationsResult) {
      console.log(operationsResult.records)
    })
    .catch(function (err) {
      console.log(err)
    })
  ```
- Try it out
  https://www.stellar.org/laboratory/#explorer?resource=operations&endpoint=for_account

:::
### Example Response

```json
{
  "_embedded": {
    "records": [
      {
        "_links": {
          "effects": {
            "href": "/operations/46316927324160/effects/{?cursor,limit,order}",
            "templated": true
          },
          "precedes": {
            "href": "/operations?cursor=46316927324160&order=asc"
          },
          "self": {
            "href": "/operations/46316927324160"
          },
          "succeeds": {
            "href": "/operations?cursor=46316927324160&order=desc"
          },
          "transactions": {
            "href": "/transactions/46316927324160"
          }
        },
        "account": "GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB",
        "funder": "GBIA4FH6TV64KSPDAJCNUQSM7PFL4ILGUVJDPCLUOPJ7ONMKBBVUQHRO",
        "id": 46316927324160,
        "paging_token": "46316927324160",
        "starting_balance": 1e+09,
        "type_i": 0,
        "type": "create_account"
      }
    ]
  },
  "_links": {
    "next": {
      "href": "/accounts/GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB/operations?order=asc&limit=10&cursor=46316927324160"
    },
    "prev": {
      "href": "/accounts/GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB/operations?order=desc&limit=10&cursor=46316927324160"
    },
    "self": {
      "href": "/accounts/GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB/operations?order=asc&limit=10&cursor="
    }
  }
}
```
