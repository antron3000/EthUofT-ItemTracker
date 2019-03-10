
// const aionweb3 = require("aion-web3");
let web3 = new Web3(new Web3.providers.HttpProvider("https://api.nodesmith.io/v1/aion/avmtestnet/jsonrpc?apiKey=333be7bc8dcf4068807ba4c3c5209942"));
let contractAddress = "0x0f3bc797daf2b0096c5d47bb313a51619d25a9dbf58c3525fd85678e81587c00";
// let contractAddress= "0x0fd562355cb8052471d32f2b1d707d05cb8684533299fe467ecf8a9affb16c5f";
let accountAddress = "0xa029475725af9615a4599903e8191eb360a112150cf1f41c04cab8021cf66141";
//
let accountPK = "47b4439dd0714ece60a32feda327916ff4274cededea766cf7bf3d6c8d569613b954f5c5b6ba285685d4ab575573dafd5c1a44a79af79796052fba57e864bfd4"

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
  from: "0xa029475725af9615a4599903e8191eb360a112150cf1f41c04cab8021cf66141",
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
  var methodToCall = web3.avm.method("getString").argTypes()
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

function listenToEvent(){

  web3.eth.getPastLogs({
    address: "0x0f3bc797daf2b0096c5d47bb313a51619d25a9dbf58c3525fd85678e81587c00",
    fromBlock: 11000,
    topics: []
}).then(function(result) {
  console.log("I GOT IT");
  console.log(result);
})
}
