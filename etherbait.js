
const Web3 = require('web3');
const fs = require('fs')
let web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'))

buildJson = JSON.parse(fs.readFileSync('build/contracts/WETH9.json'))
wethAbi = buildJson.abi;
wethAddress = buildJson.networks['5777'].address

weth = new web3.eth.Contract(wethAbi, wethAddress);


let accounts;
web3.eth.getAccounts((err,res) => {accounts=res;console.log(res);});


// web3.eth.subscribe('newBlockHeaders', function (error, blockHeader) {
//     if (error) console.log(error)
//     console.log(blockHeader)
// });


web3.eth.subscribe('logs', {fromBlock: 0}, function (err,res) {
    if (err) console.log(err)
    console.log(res)
});

web3.eth.subscribe('pendingTransactions', function (err,res) {
    if (err) console.log(err)
    
    console.log(res)
});

// web3.eth.subscribe('logs', {address: '0x8eb29fc59cC57A858d8bEC71e52f74d558937f25'}, function (err,res) {
//     if (err) console.log(err)
//     console.log(res)
// });

// web3.currentProvider.disconnect();


/* Notes

Ways to do this:
subscribe to pending transactions and then wait 60sec or so for the transaciton to be confirmed: https://medium.com/coinmonks/monitoring-an-ethereum-address-with-web3-js-970c0a3cf96d
subscribe to every new block and check all transactions

Then:
add in egress function
Test which uses more infura requests and more pc resources

*/