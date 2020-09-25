---
New concepts in version 2
---

At this time, we are customizing token fee at application layer that allows an exchange to has token fee. A holding fee wallet will be received this fee and the source account will lost corresponding. Triam network hasn't this feature. But, at this vervion, we implemented it. This makes it not only easy for developing the bussinesses of third parties but also attracts more users to join Triam network. 

We created 3 new operations to:
- Has token's info for setting token fee in exchange.
- Change the holding fee wallet.
- Limit an amount of token in market for preventing inflation.


## Beneficiary
It is the holding fee wallet which will receive token fee from exchange using that token. Length: empty or 56 characters
## Fee
Rate of exchange's amount need to pay for token fee. Range: 0 - 10000. Formula: Token fee = fee * exchange's amount/10000.
## Ratio
When we starts issuing the token into market, our accounts will be locked an amount of RIA corresponding. Ratio will be used by formula: RIA's amount for locking =  amount for issuing / ratio.
## Minfee
A minimum amount for token fee.
## Islimited
Values: 0 or 1. 1 for limiting. 0 for countinue issuing.