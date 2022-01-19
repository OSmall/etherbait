
const Web3 = require('web3');
const fs = require('fs');

let infuraId = fs.readFileSync('.infura', 'utf-8').trim();
let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/' + infuraId));

buildJson = JSON.parse(fs.readFileSync('truffle/build/contracts/WETH9.json'));
wethAbi = buildJson.abi;
wethAddress = buildJson.networks['5777'].address;

weth = new web3.eth.Contract(wethAbi, wethAddress);

// let account = {address: '0x2EdE2e78FADF5777F720ee77de34BD28F69f42c1'};
let account = {address: '0x2EA99EE5D5A1418a1128D18f47b8f205a4d719Db'};


// create wallet

let wallet;
let secret;
let currentIndex = 0;

if (!fs.existsSync('.secret')) {
    console.error('\'.secret\' file not found');
    process.exit(1);
} else {
    console.log('found \'.secret\'')
    secret = fs.readFileSync('.secret', 'utf-8').trim();
}

if (!fs.existsSync('wallet.json')) {
    wallet = web3.eth.accounts.wallet.create(2);
    let walletJson = JSON.stringify(wallet.encrypt(secret));
    fs.writeFile('wallet.json', walletJson, function(){});
    console.log('wallet.json does not exist, creating a new one');
} else {
    let walletEncrypted = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'));
    wallet = web3.eth.accounts.wallet.decrypt(walletEncrypted, secret);
    currentIndex = wallet.length - 2;
    console.log('wallet loaded from \'wallet.json\'');
}

// wallet.clear();
// wallet.add('0xb130959e4d684f98c114100bb03735f5854f10ef94bf0418e5d848e1e1a00275');
// wallet.add(web3.eth.accounts.create());
// let walletJson = JSON.stringify(wallet.encrypt(secret));
// fs.writeFile('wallet.json', walletJson, function(){console.log('done saving wallet');});

console.log(wallet);


web3.eth.subscribe('newBlockHeaders', function (err, res) {
    if (err) console.error(err);
    
    let hash = res.hash;

    web3.eth.getBlock(hash, true, async function(err, res) {
        if (err) console.error(err);

        let balance = await web3.eth.getBalance(account.address);
        console.log('balance:', balance);

        for (transaction of res.transactions) {
            if (transaction.to == wallet[currentIndex].address) {
                egress();
            }
        }
        
    });

    console.log(hash);
});

function egress() {
    // pull out ERC20 tokens to next address in the wallet and create new account in wallet
    console.log('ETH transferred to target wallet (success)');

}

// web3.currentProvider.disconnect();


/* Notes

Ways to do this:
subscribe to pending transactions and then wait 60sec or so for the transaciton to be confirmed: https://medium.com/coinmonks/monitoring-an-ethereum-address-with-web3-js-970c0a3cf96d
subscribe to every new block and check all transactions

Then:
add in egress function
Test which uses more infura requests and more pc resources

*/