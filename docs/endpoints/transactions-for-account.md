---
Transactions for Account
---

This endpoint represents all [transactions](../resources/transaction.md) that affected a given [account](../resources/account.md).
This endpoint can also be used in [streaming](../responses.md#streaming) mode so it is possible to use it to listen for new transactions as that affect a given account as they get made in the Stellar network.
If called in streaming mode Horizon will start at the earliest known transaction unless a `cursor` is set. In that case it will start from the `cursor`. You can also set `cursor` value to `now` to only stream transaction created since your request time.

## Request

```
GET /accounts/{account_id}/transactions{?cursor,limit,order}
```

### Arguments

| name | notes | description | example |
| ---- | ----- | ----------- | ------- |
| `account_id` | required, string | ID of an account | GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ |
| `?cursor` | optional, any, default _null_ | A paging token, specifying where to start returning records from. When streaming this can be set to `now` to stream object created since your request time. | 12884905984 |
| `?order`  | optional, string, default `asc` | The order in which to return rows, "asc" or "desc". | `asc` |
| `?limit`  | optional, number, default: `10` | Maximum number of records to return. | `200` |


## Response

This endpoint responds with a list of transactions that changed a given account's state. See [transaction resource](../resources/transaction.md) for reference.


### Example Request
::: tabs language

- curl
  ```curl
  curl "https://horizon-testnet.stellar.org/accounts/GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ/transactions?limit=1"
  ```
- JavaScript
  ```js
  var StellarSdk = require('stellar-sdk');
  var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

  server.transactions()
    .forAccount("GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ")
    .call()
    .then(function (accountResult) {
      console.log(accountResult);
    })
    .catch(function (err) {
      console.error(err);
    })
  ```
- Try it out
  https://www.stellar.org/laboratory/#explorer?resource=transactions&endpoint=for_account

:::
### Example Response
```json
{
  "_embedded": {
    "records": [
      {
        "_links": {
          "account": {
            "href": "/accounts/GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H"
          },
          "effects": {
            "href": "/transactions/2a2beb163e2c68bd2377aab243d68225626d70263444a85556ec7271d4e46e03/effects{?cursor,limit,order}",
            "templated": true
          },
          "ledger": {
            "href": "/ledgers/33"
          },
          "operations": {
            "href": "/transactions/2a2beb163e2c68bd2377aab243d68225626d70263444a85556ec7271d4e46e03/operations{?cursor,limit,order}",
            "templated": true
          },
          "precedes": {
            "href": "/transactions?cursor=141733924864&order=asc"
          },
          "self": {
            "href": "/transactions/2a2beb163e2c68bd2377aab243d68225626d70263444a85556ec7271d4e46e03"
          },
          "succeeds": {
            "href": "/transactions?cursor=141733924864&order=desc"
          }
        },
        "id": "2a2beb163e2c68bd2377aab243d68225626d70263444a85556ec7271d4e46e03",
        "paging_token": "141733924864",
        "hash": "2a2beb163e2c68bd2377aab243d68225626d70263444a85556ec7271d4e46e03",
        "ledger": 33,
        "created_at": "2015-09-09T02:46:44Z",
        "account": "GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H",
        "account_sequence": 1,
        "max_fee": 0,
        "fee_paid": 0,
        "operation_count": 1,
        "result_code": 0,
        "result_code_s": "tx_success",
        "envelope_xdr": "AAAAAGL8HQvQkbK2HA3WVjRrKmjX00fG8sLI7m0ERwJW/AX3AAAACgAAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAZc2EuuEa2W1PAKmaqVquHuzUMHaEiRs//+ODOfgWiz8AAFrzEHpAAAAAAAAAAAABVvwF9wAAAEAhwIlmkDnlvOaUnj5NMyGlu7XlGLUqUoigWbbMwLS0Em99ZrEh/Gd85pz7hGtAxNMj335utvGDUOAm9WAewEYE",
        "result_xdr": "KivrFj4saL0jd6qyQ9aCJWJtcCY0RKhVVuxycdTkbgMAAAAAAAAACgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAA==",
        "result_meta_xdr": "AAAAAAAAAAEAAAABAAAAIQAAAAAAAAAAYvwdC9CRsrYcDdZWNGsqaNfTR8bywsjubQRHAlb8BfcBY0V4XYn/9gAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAAAAAAhAAAAAAAAAABlzYS64RrZbU8AqZqpWq4e7NQwdoSJGz//44M5+BaLPwAAWvMQekAAAAAAIQAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAhAAAAAAAAAABi/B0L0JGythwN1lY0aypo19NHxvLCyO5tBEcCVvwF9wFi6oVND7/2AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA=="
      }
    ]
  },
  "_links": {
    "next": {
      "href": "/accounts/GBS43BF24ENNS3KPACUZVKK2VYPOZVBQO2CISGZ777RYGOPYC2FT6S3K/transactions?order=asc&limit=1&cursor=141733924864"
    },
    "prev": {
      "href": "/accounts/GBS43BF24ENNS3KPACUZVKK2VYPOZVBQO2CISGZ777RYGOPYC2FT6S3K/transactions?order=desc&limit=1&cursor=141733924864"
    },
    "self": {
      "href": "/accounts/GBS43BF24ENNS3KPACUZVKK2VYPOZVBQO2CISGZ777RYGOPYC2FT6S3K/transactions?order=asc&limit=1&cursor="
    }
  }
}
```
