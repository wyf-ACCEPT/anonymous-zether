// Run all of these in shell

// Init
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const provider = new Web3.providers.WebsocketProvider("ws://localhost:8545");
const __dirname = '/Users/wangyifan/Desktop/Blockchain/IVC/anonymous-zether/packages/protocol'
const Client = require(path.join(__dirname, '../anonymous.js/src/client.js'));
contract = require("@truffle/contract");
path = require('path');
const ZSCJSON = require(path.join(__dirname, 'build/contracts/ZSC.json'));
const ZSC = contract(ZSCJSON);
ZSC.setProvider(provider);
ZSC.deployed();
const CashTokenJSON = require(path.join(__dirname, 'build/contracts/CashToken.json'));
const CashToken = contract(CashTokenJSON);
CashToken.setProvider(provider);
CashToken.deployed();
let zsc, cash, home;
web3.eth.getAccounts().then((accounts) => { home = accounts[accounts.length - 1]; });

// Halt for a while...
ZSC.at(ZSC.address).then((result) => { zsc = result; });
CashToken.at(CashToken.address).then((result) => { cash = result; });

// Halt...
cash.mint(home, 1000, { 'from': home });

// Halt...
cash.approve(zsc.address, 1000, { 'from': home });

// Alice
const alice = new Client(web3, zsc.contract, home);
alice.register();

// Bob, Carol, Dave
const recv = new Client(web3, zsc.contract, home);
recv.register();

// Alice
alice.deposit(100);
alice.withdraw(10);

// Bob, Carol, Dave
recv.account.public();

// Alice (fill in the address)
alice.friends.add("Bob", []);
alice.friends.add("Carol", [
    '0x2afec91db77872e232d660f52e9b1cc3c0f0b5586071fcad84a05b72fb1bb56f',
    '0x0e608ad8c13cf4d7c3bcbbab20fbe3a5a5d414f464fca3c9473a7fed526b1423'
]);
alice.friends.add("Dave", [
    '0x10d24f32b958ed660a206f6bcf7fe5db84a2fb6af1012403495fc62f81c490ef',
    '0x125bdef5c7146763751d85d5a995ca8860f5813c6ee0492bd693b33bae85073e'
]);

alice.transferBatch(["Bob", "Carol"], [20, 30], ["Dave"])
// alice.transfer("Bob", 20);

// Whatever
web3.eth.getAccounts().then((accounts) => { carol = new Client(web3, zsc.contract, accounts[3]); });
web3.eth.getAccounts().then((accounts) => { dave = new Client(web3, zsc.contract, accounts[3]); });
carol.register()
dave.register()
carol.account.public()
dave.account.public()

alice.friends.add("Carol", [
    '0x0aca546923aa02bfd9dd830336f690cad08d40b3a61a88025355bb796f42799b',
    '0x09bf48c3a256444ebf7d650581463dee4c2c562838e50554e20366d04b10f06e'
]);
alice.friends.add("Dave", [
    '0x03512835a151742287b7e499b865c24ea47132b63e4255e4ffa73465c50ba31d',
    '0x12eba585076492cb863a2a44d370ab4f1db7a54419d9f48e209602c4d7c702d6'
])