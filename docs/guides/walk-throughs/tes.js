const TriamSdk = require('triam-sdk');

TriamSdk.Network.useTestNetwork();
const axios = require('axios');
const server = new TriamSdk.Server('https://horizon-testnet.Triam.org');

const destinationId = 'GB5CY6MPC2RN3XO7CJWTM3QASD5APTOV4D7BJQ6YCHEDYKLWBDWBH72T'
const sourceKeys = TriamSdk.Keypair.fromSecret('SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4');
const ASSET_CODE = 'GBT'
const assetIssuer = 'GD73CPSYM5DQJHOF24GBKSJZXXSRPV3HPIV3ZNXEZHYY3SCHYI6ZVQFF'
const amount = 10



(async function () {
  try {
    // Check destination
    let destination, sourceKey;
    try{
        destination = await server.loadAccount(destinationId);
    }catch(err){
        throw new Error('The destination account does not exist!')
    }
    try{
        sourceKey = await server.loadAccount(sourceKeys.publicKey());
    }catch(err){
        throw new Error('The source account does not exist!')
    }
    
    /**
     * You might be interested in how token fee is calculated.
     * Change isCheck to true to run code block below
     */
      // get current balance of sender
      const balance = sourceKey.balances.find(balance => balance.asset_code === ASSET_CODE)
      console.log('Current balance: ', `${balance.balance} ${assetName}`)
      // get asset info
      const assetInfo = await axios.get('https://horizon-testnet.Triam.org/getassetinfo/GBT')
      // assetInfo.data example
      /**
      * {
      *  _links: { self: [Object] },
      *  assetcode: 'GBT',
      *  beneficiary: 'GB5CY6MPC2RN3XO7CJWTM3QASD5APTOV4D7BJQ6YCHEDYKLWBDWBH72T',
      *  issuer: 'GBAQ6RHTTQKZEMFDBN2BVCRNV4EMMX7GRWUP44Y35EN3V3QYLVJNRZKR',
      *  ratio: 1000,
      *  fee: 500,
      *  minfee: 10000,
      *  total: 1010339950165200000,
      *  islimited: 0 
      * }
      */
      const { fee, minfee } = assetInfo.data;
      // Fee is calculated as one per ten thousand
      const feeAmount = 10 * (fee / 10000) > minfee/10000 ? 10 * (fee / 10000) : minfee/10000;
      console.log('Token fee: ', feeAmount)
      console.log('Balance remaining if performing operation: ', +balance - (amount + feeAmount))
    // creating transaction
    transaction = new TriamSdk.TransactionBuilder(sourceAccount)
      .addOperation(TriamSdk.Operation.payment({
        destination: destinationId,
        // Because Triam allows transaction in many currencies, you must
        // specify the asset type.
        asset: TriamSdk.Asset(assetName, assetIssuer), // TriamSdk.Asset.native() if using RIA
        amount: amount.toString()
      }))
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Triam treats the transaction.
      .addMemo(TriamSdk.Memo.text('Test Transaction'))
      .build();
    // Sign the transaction to prove you are actually the person sending it.
    transaction.sign(sourceKeys);
    // And finally, send it off to Triam!
    const result = await server.submitTransaction(transaction);
    console.log('Results:', result);
    if (isCheck) {
      const sourceKey2 = await server.loadAccount(sourceKeys.publicKey())
      .catch(err => {throw new Error('Invalid source key')})
      const balance2 = sourceKey.balances.find(balance => balance.asset_code === assetName)
      console.log('Balance after transfering: ', `${balance2.balance} ${assetName}`)
    }
  } catch (e) {
    throw new Error(e.message)
  }
})()