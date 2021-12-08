web3.eth.subscribe('newBlockHeaders', function (error, blockHeader) { if (error) console.log(error); console.log(blockHeader); })
web3.eth.subscribe('newBlockHeaders', function(error, result) {if (!error) console.log(result);})
web3.eth.subscribe('logs', {address: accounts[0]}, function(error, result) {if (error) console.log(error); console.log(result);})
let Web3 = require('web3')
let web3ws = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'))

// truffle console
instance = await WETH9.deployed()
instance.balanceOf(accounts[0]).then(x => (x.toString()))
instance.deposit({from: accounts[0], value: web3.utils.toWei('1', 'ether')})
web3.eth.sendTransaction({from: accounts[1], to: accounts[0], value: web3.utils.toWei('0.5', 'ether')})