




window.onload=function(){

    // Declare global vaiables
    p1=document.getElementById("p1");
    centBlockchain = [];
    allTransactions = [];
    miners = [];
	blockSize = 4;

    // Create initial Miner
    miner1 = new Miner();
    miners.push(miner1);

    // Canvas setup
    // canv=document.getElementById("gc");
    // ctx=canv.getContext("2d");

    // Update refresh rate
    //setInterval(update,1000/30);
}

function update(){
    //ctx.fillStyle="black";
    //ctx.fillRect(0,0,canv.width,canv.height);

    // for(var i = 0 ; i < miners.length ; i++){
    //     miners[i].showTempBlock();
    // }
}


function createTransaction(sender, receiver, amount){
    // If I just want to make a bunch of transactions, this makes it easier
    if(sender==receiver==amount==''){
        genRandomTrans();
        return;
    }

    // Just keeping track of transactions
    p1.innerHTML += sender+' sent '+amount+' to '+receiver+'<br>';
    var newT = new Transaction(sender, receiver, amount);
    allTransactions.push(newT);

    // Give transaction to the miner (maybe change later so that miner is listening)
    miner1.receiveTransaction(newT);
}

function updatecentBlockchain(){
    var cBlockchainDIV = document.getElementById('cBlockchain');

    // First, clear cBlockchainDIV
    while(cBlockchainDIV.firstChild){
        cBlockchainDIV.removeChild(cBlockchainDIV.firstChild);
    }

    for(var i = 0 ; i < centBlockchain.length ; i++){
        var blockDIV = document.createElement('div');
        cBlockchain.appendChild(blockDIV);
        blockDIV.innerHTML = 'Block ' + i;
        blockDIV.style.textAlign = "center";
        blockDIV.style.background = 'lightblue';
        blockDIV.style.width = '100px';
        blockDIV.style.height = '200px';
        blockDIV.style.float = 'left';
        blockDIV.style.margin = '10px';

        for (var j = 0 ; j < centBlockchain[i].transactions.length ; j++){
            var p = document.createElement('p');
            p.style.textAlign = "left";
            p.style.margin = "8px";
            blockDIV.appendChild(p);
            p.innerHTML = (j + 1) +'. '+ centBlockchain[i].transactions[j].string() + '<br>';
        }
    }
}

function genRandomTrans(){
    var name1 = '';
    var name2 = '';
    //var namesData = JSON.parse(window.names);
    var amtx = Math.random();

    name1 += String.fromCharCode(Math.floor(Math.random() * 26)+65)+
            String.fromCharCode(Math.floor(Math.random() * 26)+97)+
            String.fromCharCode(Math.floor(Math.random() * 26)+97)+
            String.fromCharCode(Math.floor(Math.random() * 26)+97);
    name2 += String.fromCharCode(Math.floor(Math.random() * 26)+65)+
            String.fromCharCode(Math.floor(Math.random() * 26)+97)+
            String.fromCharCode(Math.floor(Math.random() * 26)+97)+
            String.fromCharCode(Math.floor(Math.random() * 26)+97);

    createTransaction(name1, name2, amtx);
}
