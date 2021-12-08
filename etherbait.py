from web3 import Web3
import json
from pprint import pprint

web3 = Web3(Web3.HTTPProvider('http://localhost:7545'))

with open('build/contracts/WETH9.json') as json_file:
    build = json.load(json_file)
    weth_address = build['networks']['5777']['address']
    weth_abi = build['abi']

weth = web3.eth.contract(address=weth_address, abi=weth_abi)

accounts = web3.eth.get_accounts()

def main():
    account = accounts[1]
    print(account, Web3.fromWei(weth.functions.balanceOf(account).call(), 'ether'))

    # Check if ether balance has changed
    # if so, transfer all weth and eth out of the wallet

if __name__ == "__main__":
    main()
