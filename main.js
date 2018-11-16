console.log('asdf');




window.onload=function(){

    // Declare global vaiables
    p1=document.getElementById("p1");
    p1inner = '';
    centBlockchain = [];
    allTransactions = [];
    miners = [];

    // Create initial Miner
    miner1 = new Miner();
    miners.push(miner1);

    // Canvas setup
    // canv=document.getElementById("gc");
    // ctx=canv.getContext("2d");

    // Update refresh rate
    setInterval(update,1000/30);
}

function update(){
    //ctx.fillStyle="black";
    //ctx.fillRect(0,0,canv.width,canv.height);
    p1.innerHTML = p1inner;

    // for(var i = 0 ; i < miners.length ; i++){
    //     miners[i].showTempBlock();
    // }
}


function createTransaction(sender, receiver, amount){
    // Just keeping track of transactions
    p1inner += sender+' sent '+amount+' to '+receiver+'<br>';
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
            p.innerHTML = j +'. '+ centBlockchain[i].transactions[j].string() + '<br>';
        }
    }
}
