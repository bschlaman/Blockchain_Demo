




window.onload=function(){

    // Declare global vaiables
    p1=document.getElementById("p1");
    centBlockchain = [];
    allTransactions = [];
    miners = [];
	blockSize = 4;
    names = ["Brendan","Jason","Lauren","Kirsten","Mike","Bailey","Christa","Mark","Ralph","Judy","Julie","Bob","Alice","Charlie"];

    // Create initial Miner
    miners.push(new Miner());

    // Configure Canvas
    canvasOnload();
}


function createTransaction(sender, receiver, amount){
    // If I just want to make a bunch of transactions, this makes it easier
    if(sender==null&&receiver==null&&amount==null){
        genRandomTrans();
        return;
    }

	if(sender==''||receiver==''||amount==''){
		alert('Fill in all information to create transaction, or press "Random Transaction"');
		return;
	}

    // Just keeping track of transactions
    p1.innerHTML += sender+' sent '+amount+' to '+receiver+'<br>';
    var newT = new Transaction(sender, receiver, amount);
    allTransactions.push(newT);

    // Give transaction to the miner (maybe change later so that miner is listening)
    console.log('asdf');
	miners[0].receiveTransaction(newT);

}

// This function is unused
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
        blockDIV.style.width = '200px';
        blockDIV.style.height = centBlockchain.height;
        blockDIV.style.float = 'left';
        blockDIV.style.margin = '30px';

        for (var j = 0 ; j < centBlockchain[i].transactions.length ; j++){
            var p = document.createElement('p');
            p.style.textAlign = "left";
            p.style.margin = "8px";
            blockDIV.appendChild(p);
            p.innerHTML = (j + 1) +'. '+ centBlockchain[i].transactions[j].string() + '<br>';
        }
    }
}

function genRandomTrans(fromTestButton){
    var name1 = names[Math.floor(Math.random() * names.length)];
    var name2 = names[Math.floor(Math.random() * names.length)];
    if(name1==name2){genRandomTrans(); return;};
    var amt = Math.floor(Math.random() * 1000);

    
	// This logic helps the test button.  Should just be createTransaction(name1, name2, amt); when done testing
	if(fromTestButton){
		p1.innerHTML += name1+' sent '+amt+' to '+name2+'<br>';
		return new Transaction(name1, name2, amt);
	}
	else{createTransaction(name1, name2, amt);}
}


// Canvas Functions
function canvasOnload(){
    ctx = document.getElementById('canv').getContext("2d");
    ctx.canvas.addEventListener('mousemove', function(event){trackmouse(event)});
    origCanvHeight = parseInt(document.getElementById('cBlockchain').clientHeight);

    fitToContainer(ctx.canvas);

    setInterval(update, 1000/30);
}
function update(){
    fitToContainer(ctx.canvas);
    reorganizeCanvDivs();
    for(var i = 0 ; i < canvBlocks.length ; i++){
        canvBlocks[i].show();
		canvBlocks[i].showArrow();
    }
    if(popup){popup.show();}

    //miners[0].updateTransDiv(ctx.canvas.clientX + ctx.canvas.width, ctx.canvas.clientY);
}
function fitToContainer(canvas){
    parentDiv = document.getElementById('cBlockchain');
    ctx.canvas.width  = parentDiv.clientWidth;
    //ctx.canvas.height = parentDiv.clientHeight;
	//console.log(canvas.height, parentDiv.clientHeight);
}


canvBlocks = [];
canvBlockWidth = 120;
canvBlockHeight = 120;
canvBlockMargin = 20;
canvBlocksPerLine = 0;

function addDivCanv(fromMiner){
    var pos = getPosition(canvBlocks.length);
    canvBlocks.push(new CanvasBlock(pos.x, pos.y, canvBlocks.length));
	if(!fromMiner){
		faketrns = []
		for(var i = 0 ; i < blockSize ; i++){
			var t = genRandomTrans(true);
			faketrns.push(t);
			allTransactions.push(t);
		}
		centBlockchain.push(new Block(faketrns));
	}
    updateScroll();
}

function reorganizeCanvDivs(){

    canvBlocksPerLine = Math.floor(ctx.canvas.width/canvBlockWidth);
    for(var i = 0 ; i < canvBlocks.length; i++){
        canvBlocks[i].updatePosition(getPosition(i));
    }

    // Also update the height of the canvas
    var div = document.getElementById('cBlockchain');
    var cols = Math.ceil(canvBlocks.length/canvBlocksPerLine);
    if(cols * canvBlockHeight > div.clientHeight){
        ctx.canvas.height = cols * canvBlockHeight;
    }
	else{ctx.canvas.height = div.clientHeight;}
}

function getPosition(blkNum){
	if(canvBlocksPerLine == 0){canvBlocksPerLine=1;}
    //var x = canvBlocks.length%canvBlocksPerLine * canvBlockWidth;
    var getWidth = function(num, width, bpl){
        return (num%bpl)*width + width * (bpl-1-2*(num%bpl)) * (Math.floor(num/bpl)%2);
    }
    var w = getWidth(blkNum, canvBlockWidth, canvBlocksPerLine);
    var h = Math.floor(blkNum/canvBlocksPerLine) * canvBlockHeight;
    return {x: w, y: h};
}

currentBlock = null;
popup = null;
function trackmouse(event){
    var mouseX = event.clientX - ctx.canvas.offsetLeft;
    var mouseY = event.clientY - ctx.canvas.offsetTop + document.getElementById('cBlockchain').scrollTop + window.scrollY;
    var b = blockfromCoord(mouseX,mouseY);
    if(canvBlocks[b]){
        var mouseblock = canvBlocks[b];
        if(mouseblock != currentBlock){
            currentBlock = mouseblock;
            popup = new CanvPopUpData(mouseX, mouseY, b, currentBlock.color);
        }
        if(popup){
            popup.updatePosition({x: mouseX, y: mouseY});
        }
    }
    else{currentBlock = null; popup = null;}
}
function blockfromCoord(x,y){
    var row = Math.floor(y/canvBlockHeight);
    var col = Math.floor(x/canvBlockWidth);
    if(col >= canvBlocksPerLine){return null;}
    if(!(x > (col*canvBlockWidth+canvBlockMargin) && x < ((col+1)*canvBlockWidth-canvBlockMargin))){
        return null;
    }
    if(!(y > (row*canvBlockHeight+canvBlockMargin) && y < ((row+1)*canvBlockHeight-canvBlockMargin))){
        return null;
    }
    return row%2 == 0 ? (col + row*canvBlocksPerLine):((row+1)*canvBlocksPerLine-1-col);
}

function manyDivsCanv(x){
    for (var i = 0 ; i <x ; i++){
        addDivCanv(false);
    }
}

function clearCanvDivs(){
    canvBlocks = [];
	centBlockchain = [];
	allTransactions = [];
}

function updateScroll(){
    var element = document.getElementById('cBlockchain');
    element.scrollTop = element.scrollHeight;
}
