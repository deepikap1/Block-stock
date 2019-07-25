web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var account;
web3.eth.getAccounts().then((f) => {
 account = f[0];
})

//abi = JSON.parse('[ { constant: true,
    inputs: [],
    name: 'getBalance',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'account_list',
    outputs: [ [Object], [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'firm_list',
    outputs: [ [Object], [Object], [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'stocksOwned',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'stocksLeft',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: false,
    inputs: [ [Object], [Object] ],
    name: 'buy',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function' },
  { inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor' } ]
')

contract = new web3.eth.Contract(abi);
contract.options.address = "0x71789831d83d4C8325b324eA9B5fFB27525480b5";
// update this contract address with your contract address

// candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function buy(firm_id,quantity) {
 var firm_id = $("#id").val();
 console.log("Firm ID"+firm_id);
 var quantity = $("#quantity").val();
 console.log("Stocks to Buy"+quantity);
 contract.methods.buy(firm_id,quantity).send({from: account}).then((f) => {
  let div_id1 = "firm-"+firm_id+"quantity";
  contract.methods.stocksLeft(firm_id).call().then((f) => {
   $("#" + div_id1).html(f);
  })
  let div_id2 = "balance";
  contract.methods.getBalance().send({from: account}).then((f) => {
   $("#" + div_id2).html(f);
  })
  let div_id3 = "firm-"+firm_id+"owned";
  contract.methods.stocksOwned(firm_id).send({from: account}).then((f) => {
   $("#" + div_id3).html(f);
  })

 })
}

$(document).ready(function() {
// candidateNames = Object.keys(candidates);

 for(var i=0; i<3; i++) {
// let name = candidateNames[i];
 
 let div_id1 = "firm-"+i+"quantity";
  contract.methods.stocksLeft(i).call().then((f) => {
   $("#" + div_id1).html(f);
  })
  l
  let div_id3 = "firm-"+i+"owned";
  contract.methods.stocksOwned(i).send({from: account}).then((f) => {
   $("#" + div_id3).html(f);
  }) 
 
 }

 let div_id2 = "balance";
  contract.methods.getBalance().send({from: account}).then((f) => {
   $("#" + div_id2).html(f);
  })

});
