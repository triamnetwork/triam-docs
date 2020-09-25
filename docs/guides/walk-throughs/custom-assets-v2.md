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


## Steps

#### Transaction 1: Issuer will create an asset.
**Account**: source account (issuer)
**Operations**:	
- [Create Asset](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=create-account): create an Asset

**Signers**: source account (issuer)

#### Transaction 2: Trustors and Beneficiary will trust the above asset
**Account**: source account (trustors or beneficiary)
**Operations**:
- [Change Trust](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=change-trust): trust above asset

**Signers**: source account (trustors or beneficiary)


#### Transaction 3: Issuer will allow trust to trustors and beneficiary (if  allow trust is needed)
**Account**: source account (issuer)
- [Allow Trust](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=allow-trust): allow trust for trustline

**Signers**: source account (issuer)

#### Transaction 4: Issuer starts issuing asset
**Account**: source account (issuer)
**Operations**:
- [Payment](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=payment): issuing asset to the trustors. The exchange will not lose asset's fee. Destination will be the trustors and beneficiary

**Signers**: source account (issuer)


#### Transaction 5: Trustor1 make an exchange to trustor2 by using payment operation with above asset. Beneficiary will be received asset's fee
**Account**: trustor1
**Operations**:
- [Payment](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=payment): give an amount of asset to trustor2. 

**Signers**: trustor1


#### Transaction 6: Trustor can give back the asset to Issuer. We call this is "Burning asset"
**Account**: trustor
**Operations**:
- [Payment](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=payment): give an amount of asset to issuer. 

**Signers**: trustor

#### Transaction 7: Issuer can change Beneficiary
**Account**: issuer
**Operations**:
- [Change Asset](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=change-asset): change current beneficiary to another beneficiary

**Signers**: issuer

#### Transaction 8: Issuer stop issuing asset
**Account**: issuer
**Operations**:
- [Limit Asset](https://triamnetwork.github.io/triam-docs/#/docs/guides/concepts/list-of-operations?id=limit-asset): stop issuing asset to prevent inflation

**Signers**: issuer
