
window.onload=function(){

    // Workaround for weird resizing issue
    document.getElementById("cBlockchain").style.height = (0.9 * window.innerHeight) + 'px';
    // Declare global vaiables
    p1=document.getElementById("p1");
    centBlockchain = [];
    allTransactions = [];
    miners = [];
	blockSize = 4;
    names = ["Brendan","Jason","Lauren","Kirsten","Mike","Bailey","Christa","Mark","Ralph","Judy","Julie","Bob","Alice","Charlie"];
	startCredits = 1000;
	miningReward = 200;
	rewardDRate = 0.9;
	numVerify = 0;
	nonceLength = 12;

    // Create initial Miner
    miners.push(new Miner());
    setInterval(function(){eval('miners[0].speedHash();')}, 1000/5);
	// setInterval(function(){createTransaction(null, null, null)}, 1000/0.5);

    // Configure Canvas
    canvasOnload();

	tableCreate();

    modalCreate();
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
    while(name1==name2){name2 = names[Math.floor(Math.random() * names.length)];}
    var amt = Math.floor(Math.random() * 1000);


	// This logic helps the test button.  Should just be createTransaction(name1, name2, amt); when done testing
	if(fromTestButton){
		p1.innerHTML += name1+' sent '+amt+' to '+name2+'<br>';
		return new Transaction(name1, name2, amt);
	}
	else{createTransaction(name1, name2, amt);}
}

function tableCreate() {
	var tbl = document.getElementById('ledger');
	var tbdy = document.createElement('tbody');
	for (var i = 0; i < names.length; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < 2; j++) {
			var td = document.createElement('td');
			j == 0 ? td.appendChild(document.createTextNode(names[i])) : td.appendChild(document.createTextNode(startCredits));
			//i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
			tr.appendChild(td);

		}
		tbdy.appendChild(tr);
	}
    // Create 'Total' row
    var tr = document.createElement('tr');
    tr.style.fontWeight = 'bold';
    var td = document.createElement('td');
    td.appendChild(document.createTextNode('Total Credits'));
    tr.appendChild(td);
    td = document.createElement('td');
    // TODO: There should be a better way to calculate inital value in case
    // I want to start with uneven values
    td.appendChild(document.createTextNode(startCredits*names.length));
    tr.appendChild(td);
    tbdy.appendChild(tr);

	tbl.appendChild(tbdy);
	//wrapDiv.insertBefore(tbl, wrapDiv.childNodes.item('tblref').nextSibling);
}

function updateLedger(){
	var tbl = document.getElementById('ledger');
	var latestTransactions = centBlockchain[centBlockchain.length-1].transactions;
	for(var i = 0 ; i < latestTransactions.length ; i++){
        // For loop logic should reflect other rows like 'Total' or headder
		for(var j = 0 ; j < tbl.rows.length - 1 ; j++){
			if(tbl.rows[j].childNodes[0].innerHTML == latestTransactions[i].s){
				tbl.rows[j].childNodes[1].innerHTML = parseInt(tbl.rows[j].childNodes[1].innerHTML) - latestTransactions[i].a;
			}
			if(tbl.rows[j].childNodes[0].innerHTML == latestTransactions[i].r){
				tbl.rows[j].childNodes[1].innerHTML = parseInt(tbl.rows[j].childNodes[1].innerHTML) + latestTransactions[i].a;
			}
		}
	}
    // Update Total row
    var tot = 0;
    for(var j = 0 ; j < tbl.rows.length - 1 ; j++){
        tot += parseInt(tbl.rows[j].childNodes[1].innerHTML);
    }
    tbl.rows[tbl.rows.length-1].childNodes[1].innerHTML = tot;

}

function modalCreate(){
    var modal = document.getElementById('popupVerify');
    var btn = document.getElementById("myBtn");

    document.getElementById('appendcheck').onclick = function(){eval('miners[0].appendGuessandCheck();')};
	document.getElementById('addreward').onclick = function(){eval('miners[0].addReward();')};
    document.getElementById('runhash').onclick = function(){eval('miners[0].startHash();')};

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


// Canvas Functions
function canvasOnload(){
    ctx = document.getElementById('canv').getContext("2d");
    ctx.canvas.addEventListener('mousemove', function(event){trackmouse(event)});
    origCanvHeight = parseInt(document.getElementById('cBlockchain').clientHeight);

    fitToContainer(ctx.canvas);

    setInterval(canvasUpdate, 1000/10);
}
function canvasUpdate(){
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
}


canvBlocks = [];
canvBlockWidth = 120;
canvBlockHeight = 120;
canvBlockMargin = 20;
canvBlocksPerLine = 0;

function addDivCanv(fromTestButton, hash){
    var pos = getPosition(canvBlocks.length);
    canvBlocks.push(new CanvasBlock(pos.x, pos.y, canvBlocks.length, hash));
	if(fromTestButton){
		faketrns = []
		for(var i = 0 ; i < blockSize ; i++){
			var t = genRandomTrans(true);
			faketrns.push(t);
			allTransactions.push(t);
		}
		// Fix the logic to get hash from buttons, not inherit
		centBlockchain.push(new Block(faketrns, 'inherit', canvBlocks.length-1));
		updateLedger();
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
    var parentDiv = document.getElementById('cBlockchain');
    // ctx.canvas.clientLeft/Right should alwasy be 0
    var mouseX = event.clientX - ctx.canvas.clientLeft - parentDiv.offsetLeft;
    var mouseY = event.clientY - ctx.canvas.clientTop - parentDiv.offsetTop + parentDiv.scrollTop + window.scrollY;

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
        addDivCanv(true);
    }
}

function resetAll(){
    canvBlocks = [];
	centBlockchain = [];
	allTransactions = [];

    // Reset Transaction History, ledger, form, and Captured Transactions
    document.getElementById('p1').innerHTML = '';
    var tableRows = document.getElementById('ledger').rows;
    for(var i = 0 ; i < tableRows.length-1 ; i++){
        tableRows[i].childNodes[1].innerHTML = startCredits;
    }
    document.getElementById("transForm").reset();
    while(miners[0].trnsContainer.childNodes[1]){
        miners[0].trnsContainer.removeChild(miners[0].trnsContainer.childNodes[1]);
    }
    miners[0].capturedTransactions = [];
}

function updateScroll(){
    var element = document.getElementById('cBlockchain');
    element.scrollTop = element.scrollHeight;
}
