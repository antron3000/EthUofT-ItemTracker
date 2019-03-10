
// const aionweb3 = require("aion-web3");
let web3 = new Web3(new Web3.providers.HttpProvider("https://api.nodesmith.io/v1/aion/avmtestnet/jsonrpc?apiKey=333be7bc8dcf4068807ba4c3c5209942"));
let contractAddress = "0x0fa47cdd9672d265d879fc81693c2ee6e73fb5c08863a8109d04e87d64629ac7";
// let contractAddress= "0x0fd562355cb8052471d32f2b1d707d05cb8684533299fe467ecf8a9affb16c5f";
let accountAddress = "0xa04ef8ff2834bbb947acc7aa0f70d46c89e3b62f902da9d92504af0eac0553fe";
//
  let accountPK = "cd2be12256f993ca1af34e81d836d0c068f14867331ca21a515895581c1cd8135fd5af71c83126393dbf7f6c68e2b9bb5bf20fcee66be1b941ab94382e015684"

let logsObject;

// Update DOM on page load
// $(updateTrackerPage);

function greet() {

  var stringToGreet = document.getElementById("stringToGreet").value;

    // 1. Contract method definition
    console.log(web3);
    let method = web3.avm.method("greet").argTypes("String");
    let data = method.encodeToHex(stringToGreet);

    // 2. Create the transaction object
    let txObject = {
        from: accountAddress, // your account address
        to: contractAddress,
        gas: 2000000,
        data: data,
        type: '0xf'
    };

    // 3. Sign Transaction
    let signTxObject;

    web3.eth.accounts.signTransaction( // Signing function
        txObject, accountPK
    ).then(function(res) {
        signedTxObject = res;

        // 4. Send Signed Transaction
        web3.eth.sendSignedTransaction(
          signedTxObject.rawTransaction
        ).on('transactionHash', txHash => {
          console.log("txHash", txHash) // Print txHash
          whatyoudonext()
        }).on('receipt',
          receipt => { console.log("tx receipt", receipt) } // Print txReceipt
        );
    });
    function whatyoudonext() {
        var result = web3.eth.call({
            to: contractAddress, // contract address
            data: data
        });

        result.then(function(value){
          value = web3.avm.decodeOneObjectFromHex(value);

          console.log(value);
        })
    }

}

function setString(){

// or
let aiwa = aionweb3;

// 1. Define Method & Encode
var setStorage = web3.avm.method("setString").argTypes("String")

var stringToSet = document.getElementById("stringToSet").value;
let data = setStorage.encodeToHex(stringToSet);

// 2. Create TX object
txObject = {
  from: accountAddress,
  to: contractAddress,
  data: data,
  gas: 2000000,
  type: '0xf',
}

// 3. Prompt AIWA
aiwa.eth.sendTransaction( // I assigned aiwa = aionweb3 previously
  txObject
).then(function(txHash){
  console.log('txHash:', txHash);
});

}

function getString(){
  // or
  let aiwa = aionweb3;

  // 1. Define Method & Encode
  var methodToCall = web3.avm.method("getString").argTypes("Address")
  //let _data = getValue.encodeToHex(0);

  let _data = methodToCall.encodeToHex()

  var result = web3.eth.call({
      to: contractAddress, // contract address
      data: _data
  });

  result.then(function(value){

    value = web3.avm.decodeOneObjectFromHex(value);
    console.log(value);

  })
}

function transfer(){
  let aiwa = aionweb3;

  var methodToCall = web3.avm.method("transfer").argTypes("Address")

  var addressParam = document.getElementById("ToAddress").value;
  let data = methodToCall.encodeToHex(addressParam);

  // 2. Create TX object
  txObject = {
    from: accountAddress,
    to: contractAddress,
    data: data,
    gas: 2000000,
    type: '0xf',
  }

  // 3. Prompt AIWA
  aiwa.eth.sendTransaction( // I assigned aiwa = aionweb3 previously
    txObject
  ).then(function(txHash){
    console.log('txHash:', txHash);
  });
}

function getOwner(){
  let aiwa = aionweb3;

  // 1. Define Method & Encode
  var methodToCall = web3.avm.method("getOwner").argTypes("Address")
  //let _data = getValue.encodeToHex(0);

  let _data = methodToCall.encodeToHex()

  var result = web3.eth.call({
      to: contractAddress, // contract address
      data: _data
  });

  result.then(function(value){

    value = web3.avm.decodeOneObjectFromHex(value);
    console.log(value);

  })
}

function getName(){
  let aiwa = aionweb3;

  // 1. Define Method & Encode
  var methodToCall = web3.avm.method("getName").argTypes("String")
  //let _data = getValue.encodeToHex(0);

  let _data = methodToCall.encodeToHex()

  var result = web3.eth.call({
      to: contractAddress, // contract address
      data: _data
  });

  result.then(function(value){

    value = web3.avm.decodeOneObjectFromHex(value);
    console.log(value);

  })
}




function listen(){

  web3.eth.getPastLogs({
    address: contractAddress,
    fromBlock: 11000,
    topics: []
}).then(function(result) {
  console.log("I GOT IT");
  console.log(result);
  logsObject = result;
})
}

function showItemDetails(){
  let ItemContract = contractAddress;
  let itemOwner = getOwner();
  let itemName = getName();

  document.getElementbyId("ItemName").innerHTML = getName();
  document.getElementbyId("ItemContract").innerHTML = "Contract: " + contractAddress;
  document.getElementById("ItemOwner") = "Owner: " + getOwner();
}

/*** DOM Manipulation functions ***/
function updateDate(time) {
  // timeStamps.
}

function updateTrackerPage() {
  listen();
  let contractID = document.getElementById("parcelID");
//  let bHashElement = document.querySelectorAll("#blockhash");
//  let timeStamps = document.querySelectorAll(".parcel-timestamp");
  let checkpoints = document.querySelectorAll(".checkpoints-container");
  let numCheckpoints = logsObject.length;
//  let dateObj = new Date(time);

  contractID.innerHTML = contractAddress;

  for (let i = 0; i < numCheckpoints; i++) {
    let title = checkpoints.getElementById("checkpoint-title");
    title.innerHTML = logsObject[i].topics[0];
  }

//  for (i of logsObject) {
//  }
}
