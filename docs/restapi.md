---
Horizon API
---

## getKeypair

```curl
curl -X GET \
  https://testnet-horizon.arm-system-holdings.com/getKeypair \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 87887390-8ad8-1e95-7046-5dbf6076cf89'
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              fetch('https://testnet-horizon.arm-system-holdings.com/getKeypair')
                .then((response) => response.json())
                .then((responseJSON) => {
                    $('#json-renderer').jsonViewer(responseJSON);
                    $('#json-renderer').prepend('<p>results:</p>');
                })
                .catch((error) =>{
                  $('#json-renderer').jsonViewer(error);
                  $('#json-renderer').prepend('<p>results:</p>');
                });
            }
        }
    }
</script>
```



## createAccount

```curl
curl -X POST \
  https://testnet-horizon.arm-system-holdings.com/createAccount \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: f08d110c-c1e6-0fb1-46c9-915ed72f11a1' \
  -d '{
                "secret": "SCMF5DJR4OOJ76N4HNM3Q4UK4UDTM4U5N4IEM7QQI2X2BZ67GO4NMOT5",
                "destination": "GCUWWKSLTP3FANF22BL23N7FG6GLEX4QGKWWD24M6FRMZHT7J6BWNBV3",
                "startingBalance": "25"
            }'
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer-createAccount">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "secret": "SCMF5DJR4OOJ76N4HNM3Q4UK4UDTM4U5N4IEM7QQI2X2BZ67GO4NMOT5",
                  "destination": keyPair.publicKey(),
                  "startingBalance": "20"
                }),
              };

              fetch('https://testnet-horizon.arm-system-holdings.com/createAccount', options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    $('#json-renderer-createAccount').jsonViewer(responseJSON);
                    $('#json-renderer-createAccount').prepend('<p>results:</p>');
                })
                .catch((error) =>{
                  $('#json-renderer-createAccount').jsonViewer(error);
                  $('#json-renderer-createAccount').prepend('<p>results:</p>');
                });
            }
        }
    }
</script>
```

## getAccountInfo

```curl
curl -X POST \
  https://testnet-horizon.arm-system-holdings.com/getAccountInfo \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 4499c6ba-778c-92d4-c24c-5430499ea908' \
  -d '{
            "publicKey": "GDRXC5H65UL33R63AP2EBO2XMPH3JSLF7QFEWLBTA4EMCA4WDE6HPE4G"
        }'
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer-getAccountInfo">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "publicKey": "GDRXC5H65UL33R63AP2EBO2XMPH3JSLF7QFEWLBTA4EMCA4WDE6HPE4G"
                }),
              };

              fetch('https://testnet-horizon.arm-system-holdings.com/getAccountInfo', options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    $('#json-renderer-getAccountInfo').jsonViewer(responseJSON);
                    $('#json-renderer-getAccountInfo').prepend('<p>results:</p>');
                })
                .catch((error) =>{
                  $('#json-renderer-getAccountInfo').jsonViewer(error);
                  $('#json-renderer-getAccountInfo').prepend('<p>results:</p>');
                });
            }
        }
    }
</script>
```

## mergeAccount

```curl
curl -X POST \
  https://testnet-horizon.arm-system-holdings.com/mergeAccount \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 81aa68f7-0bb3-ad8b-579c-970693673e54' \
  -d '{
			"sourceKey": "SAL2RZODFWMCICTUZEKNQ6RGVWMJQDFCQALFMEX2N3EAAIHUL6NVKOTA",
            "destination": "GDRXC5H65UL33R63AP2EBO2XMPH3JSLF7QFEWLBTA4EMCA4WDE6HPE4G"
        }'
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer-mergeAccount">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
        			       "sourceKey": "SAL2RZODFWMCICTUZEKNQ6RGVWMJQDFCQALFMEX2N3EAAIHUL6NVKOTA",
                     "destination": "GDRXC5H65UL33R63AP2EBO2XMPH3JSLF7QFEWLBTA4EMCA4WDE6HPE4G"
                }),
              };

              fetch('https://testnet-horizon.arm-system-holdings.com/mergeAccount', options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    $('#json-renderer-mergeAccount').jsonViewer(responseJSON);
                    $('#json-renderer-mergeAccount').prepend('<p>results:</p>');
                })
                .catch((error) =>{
                  $('#json-renderer-mergeAccount').jsonViewer(error);
                  $('#json-renderer-mergeAccount').prepend('<p>results:</p>');
                });
            }
        }
    }
</script>
```

## setAccountOptions

```curl
curl -X POST \
  https://testnet-horizon.arm-system-holdings.com/setOption \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: b3e32283-b000-0803-d3c1-7d1181c4db57' \
  -d '{
				"source_account": "SAL2RZODFWMCICTUZEKNQ6RGVWMJQDFCQALFMEX2N3EAAIHUL6NVKOTA",
				"opts": {}
			}'
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer-setAccountOptions">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
          				"source_account": "SAL2RZODFWMCICTUZEKNQ6RGVWMJQDFCQALFMEX2N3EAAIHUL6NVKOTA",
          				"opts": {}
          			}),
              };

              fetch('https://testnet-horizon.arm-system-holdings.com/setOption', options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    $('#json-renderer-setAccountOptions').jsonViewer(responseJSON);
                    $('#json-renderer-setAccountOptions').prepend('<p>results:</p>');
                })
                .catch((error) =>{
                  $('#json-renderer-setAccountOptions').jsonViewer(error);
                  $('#json-renderer-setAccountOptions').prepend('<p>results:</p>');
                });
            }
        }
    }
</script>
```


## findPathPayment

```curl
curl -X POST \
  https://testnet-horizon.arm-system-holdings.com/findPathPayment \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 504a49be-b644-2395-2676-cc83c1648467' \
  -d '{
		   "sourceAccount": "GBGTJZ64L4DBMQX3ZQZZ646CFYRVIQCXTJR2QX4I26FO5EEZAPIQPNX4",
		   "destinationAccount": "GDRXC5H65UL33R63AP2EBO2XMPH3JSLF7QFEWLBTA4EMCA4WDE6HPE4G",
		   "destinationAsset": {
		       "asset_type": "credit_alphanum12",
		       "asset_code": "BAPCOIN",
		       "asset_issuer": "GC5EOK5NFVZUSXUIOAFM6KPIZ2ATV2VD6WZORB3GOSQC3PMKY6KULDDZ"
		   },
		   "destinationAmount": "20"
}'
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer-findPathPayment">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
              		   "sourceAccount": "GBGTJZ64L4DBMQX3ZQZZ646CFYRVIQCXTJR2QX4I26FO5EEZAPIQPNX4",
              		   "destinationAccount": "GDRXC5H65UL33R63AP2EBO2XMPH3JSLF7QFEWLBTA4EMCA4WDE6HPE4G",
              		   "destinationAsset": {
              		       "asset_type": "credit_alphanum12",
              		       "asset_code": "BAPCOIN",
              		       "asset_issuer": "GC5EOK5NFVZUSXUIOAFM6KPIZ2ATV2VD6WZORB3GOSQC3PMKY6KULDDZ"
              		   },
              		   "destinationAmount": "20"
              }),
              };

              fetch('https://testnet-horizon.arm-system-holdings.com/findPathPayment', options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    $('#json-renderer-findPathPayment').jsonViewer(responseJSON);
                    $('#json-renderer-findPathPayment').prepend('<p>results:</p>');
                })
                .catch((error) =>{
                  $('#json-renderer-findPathPayment').jsonViewer(error);
                  $('#json-renderer-findPathPayment').prepend('<p>results:</p>');
                });
            }
        }
    }
</script>
```


## pathPayment

```curl
curl -X POST \
  https://testnet-horizon.arm-system-holdings.com/findPathPayment \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 504a49be-b644-2395-2676-cc83c1648467' \
  -d '{
		   "sourceAccount": "GBGTJZ64L4DBMQX3ZQZZ646CFYRVIQCXTJR2QX4I26FO5EEZAPIQPNX4",
		   "destinationAccount": "GDRXC5H65UL33R63AP2EBO2XMPH3JSLF7QFEWLBTA4EMCA4WDE6HPE4G",
		   "destinationAsset": {
		       "asset_type": "credit_alphanum12",
		       "asset_code": "BAPCOIN",
		       "asset_issuer": "GC5EOK5NFVZUSXUIOAFM6KPIZ2ATV2VD6WZORB3GOSQC3PMKY6KULDDZ"
		   },
		   "destinationAmount": "20"
}'
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer-pathPayment">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
            			"sourceKey": "SCMF5DJR4OOJ76N4HNM3Q4UK4UDTM4U5N4IEM7QQI2X2BZ67GO4NMOT5",
            			"destination": "GBGTJZ64L4DBMQX3ZQZZ646CFYRVIQCXTJR2QX4I26FO5EEZAPIQPNX4",
            			"sourceAsset": {
            				"asset_type": "credit_alphanum12",
            				"asset_code": "BAPCOIN",
            				"asset_issuer": "GC5EOK5NFVZUSXUIOAFM6KPIZ2ATV2VD6WZORB3GOSQC3PMKY6KULDDZ"
            			},
            			"sourceMax": "1",
            			"path": [],
            			"destAsset": {
            				"asset_type": "credit_alphanum12",
            				"asset_code": "TUANCOIN",
            				"asset_issuer": "GAX5OPBPGWF6MRF7Q43AGYPBY4N5JWOF2ZEZSQVCB2UEXEOPJ3FKUSBS"
            			},
            			"destAmount": "1"
            		}),
              };

              fetch('https://testnet-horizon.arm-system-holdings.com/pathPayment', options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    $('#json-renderer-pathPayment').jsonViewer(responseJSON);
                    $('#json-renderer-pathPayment').prepend('<p>results:</p>');
                })
                .catch((error) =>{
                  $('#json-renderer-pathPayment').jsonViewer(error);
                  $('#json-renderer-pathPayment').prepend('<p>results:</p>');
                });
            }
        }
    }
</script>
```


## changeTrust

```curl
curl -X POST \
  https://testnet-horizon.arm-system-holdings.com/changeTrust \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: aacd1f8c-d68e-a22b-1616-1cc0222f0ebf' \
  -d '{
                "secrectKey": "SCMF5DJR4OOJ76N4HNM3Q4UK4UDTM4U5N4IEM7QQI2X2BZ67GO4NMOT5",
                "assetCode": "TEST4",
                "assetIssuer": "GC5LVEZ2TVZNQI2S4XUQU65VJU2475CBIHOU6XF3MHUJDB63AWZLKAD7",
                "limit": "0"
            }'
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer-changeTrust">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        "secrectKey": "SCMF5DJR4OOJ76N4HNM3Q4UK4UDTM4U5N4IEM7QQI2X2BZ67GO4NMOT5",
                        "assetCode": "TEST4",
                        "assetIssuer": "GC5LVEZ2TVZNQI2S4XUQU65VJU2475CBIHOU6XF3MHUJDB63AWZLKAD7",
                        "limit": "0"
                    }),
              };

              fetch('https://testnet-horizon.arm-system-holdings.com/changeTrust', options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    $('#json-renderer-changeTrust').jsonViewer(responseJSON);
                    $('#json-renderer-changeTrust').prepend('<p>results:</p>');
                })
                .catch((error) =>{
                  $('#json-renderer-changeTrust').jsonViewer(error);
                  $('#json-renderer-changeTrust').prepend('<p>results:</p>');
                });
            }
        }
    }
</script>
```


## payment

```curl
curl -X POST \
  https://testnet-horizon.arm-system-holdings.com/payment \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: fb0b07ea-363b-7ffb-ce64-ada89314ac82' \
  -d '{
		   "sourceKey": "SCMF5DJR4OOJ76N4HNM3Q4UK4UDTM4U5N4IEM7QQI2X2BZ67GO4NMOT5",
		   "destination": "GBGTJZ64L4DBMQX3ZQZZ646CFYRVIQCXTJR2QX4I26FO5EEZAPIQPNX4",
		   "asset":{
				"asset_type": "credit_alphanum12",
    			"asset_code": "BAPCOIN",
    			"asset_issuer": "GC5EOK5NFVZUSXUIOAFM6KPIZ2ATV2VD6WZORB3GOSQC3PMKY6KULDDZ"
		   },
		   "amount": "1"
		 }'
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer-payment">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
          		   "sourceSecret": "SCMF5DJR4OOJ76N4HNM3Q4UK4UDTM4U5N4IEM7QQI2X2BZ67GO4NMOT5",
          		   "destination": "GBGTJZ64L4DBMQX3ZQZZ646CFYRVIQCXTJR2QX4I26FO5EEZAPIQPNX4",
          		   "asset":{
          				  "asset_type": "credit_alphanum12",
              			"asset_code": "ACB",
              			"asset_issuer": "GBGTJZ64L4DBMQX3ZQZZ646CFYRVIQCXTJR2QX4I26FO5EEZAPIQPNX4"
          		   },
          		   "amount": "1"
          		 }),
              };

              fetch('https://testnet-horizon.arm-system-holdings.com/payment', options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    $('#json-renderer-payment').jsonViewer(responseJSON);
                    $('#json-renderer-payment').prepend('<p>results:</p>');
                })
                .catch((error) =>{
                  $('#json-renderer-payment').jsonViewer(error);
                  $('#json-renderer-payment').prepend('<p>results:</p>');
                });
            }
        }
    }
</script>
```

## submitTransaction

```curl
curl -X POST \
  https://testnet-horizon.arm-system-holdings.com/transactions \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 93efad50-87dc-8cfe-0f0e-f32e80bd7aa3' \
  -d '{
  	"tx": "AAAAAGwn8ekiKwVX8I/GUc63zte5/Pj8fKR6aXdYolDaZHmCAAAnEAAEHCcAAABRAAAAAAAAAAEAAAANSVNTVUlOR19BU1NFVAAAAAAAAAEAAAAAAAAAAQAAAAC6upM6nXLYI1Ll6Qp7tU01z/RBQd1PXLth6JGH2wWytQAAAAJURVNUMjQAAAAAAAAAAAAAbCfx6SIrBVfwj8ZRzrfO17n8+Px8pHppd1iiUNpkeYIAAAAAAJiWgAAAAAAAAAAB2mR5ggAAAEBvPapD13qTDXKA5NXQfizakkDtxR+s5USIvtuNvbi/xKgUp5XxDjpcqDZNSEc3bI3yj90yh36rE1xyHhOaXUcM"
  }'
```

```js
/*vue*/
<desc>
Horizon API
</desc>
<template>
    <div>
        <div className='wrapper'>
            <div>
                <button @click="callHorizon">Run</button>
            </div>
            <pre id="json-renderer-submitTransaction">result:</pre>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            callHorizon() {
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "tx": "AAAAAGwn8ekiKwVX8I/GUc63zte5/Pj8fKR6aXdYolDaZHmCAAAnEAAEHCcAAABRAAAAAAAAAAEAAAANSVNTVUlOR19BU1NFVAAAAAAAAAEAAAAAAAAAAQAAAAC6upM6nXLYI1Ll6Qp7tU01z/RBQd1PXLth6JGH2wWytQAAAAJURVNUMjQAAAAAAAAAAAAAbCfx6SIrBVfwj8ZRzrfO17n8+Px8pHppd1iiUNpkeYIAAAAAAJiWgAAAAAAAAAAB2mR5ggAAAEBvPapD13qTDXKA5NXQfizakkDtxR+s5USIvtuNvbi/xKgUp5XxDjpcqDZNSEc3bI3yj90yh36rE1xyHhOaXUcM"
                }),
              };

              fetch('https://testnet-horizon.arm-system-holdings.com/transactions', options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    $('#json-renderer-submitTransaction').jsonViewer(responseJSON);
                    $('#json-renderer-submitTransaction').prepend('<p>results:</p>');
                })
                .catch((error) =>{
                  $('#json-renderer-submitTransaction').jsonViewer(error);
                  $('#json-renderer-submitTransaction').prepend('<p>results:</p>');
                });
            }
        }
    }
</script>
```
