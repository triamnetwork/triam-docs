---
Asset Details
---

The asset details endpoint provides information on a single [asset](../resources/assets.md)

## Request

```
GET /getassetinfo/{asset_code}
```

<!-- ### Arguments

| name | notes | description | example |
| ---- | ----- | ----------- | ------- |
| `account` | required, string | Account ID | GA2HGBJIJKI6O4XEM7CZWY5PS6GKSXL6D34ERAJYQSPYA6X6AI7HYW36 | -->

## Response

This endpoint responds with the details of an asset for a given asset_code. See [asset (../resources/account.md) for reference.

### Example Request
::: tabs language

- curl
  ```curl
  curl "https://testnet-horizon.triamnetwork.com/getassetinfo/GBT
  ```
- Try it out
  https://laboratory.triamnetwork.com/#explorer?resource=accounts&endpoint=single

:::

### Example Response
```json
{
  "_links": {
    "self": {
      "href": "http://13.212.7.16:8000/getassetinfo/GBT"
    }
  },
  "assetcode": "GBT",
  "beneficiary": "GB5CY6MPC2RN3XO7CJWTM3QASD5APTOV4D7BJQ6YCHEDYKLWBDWBH72T",
  "issuer": "GBAQ6RHTTQKZEMFDBN2BVCRNV4EMMX7GRWUP44Y35EN3V3QYLVJNRZKR",
  "ratio": 1000,
  "fee": 0,
  "minfee": 10000,
  "total": 1010339950165200000,
  "islimited": 0
}
```
