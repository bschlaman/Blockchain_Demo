function Miner(){

	this.capturedTransactions = [];

	this.trnsContainer = null;



	this.receiveTransaction = function(transaction){

		// Could be a possible reworking of logic here.  Current logic: if we are on a non-0 multiple of blocksize,
		// then don't accept message.  Otherwise process the trans. and if afterwards its a multiple of 4 then append
		// ready message
		if(this.capturedTransactions.length % blockSize == 0 && this.capturedTransactions.length>0){
			if(!this.trnsContainer.lastChild.innerHTML.startsWith('C')){
				this.displayMessageIntrnsContainer('Can\'t accept, full! Push.', 'alert');
			}
		}
		else{
			// Log transaction in this.capturedTransactions
			this.capturedTransactions.push(transaction);

			// Display the transaction inside the this.trnsContainer div
			this.displayTransaction(transaction);
			if(this.capturedTransactions.length % blockSize == 0){
				this.displayMessageIntrnsContainer('Ready to Verify and Push\n', 'ready');
			}
		}

	};


	this.openVerification = function(){
		if(this.capturedTransactions.length % blockSize == 0 && this.capturedTransactions.length > 0){

			// Eventually, this should be somewhere else so you can close the modal and everything still be there
			this.verified = false;

			var popup = document.getElementById('popupVerify');
			popup.style.display = "block";
			// Make this a better name
			var modalTrans = document.getElementById('modalTrans');
			modalTrans.innerHTML = '';
			this.hashInput = '';

			for(var i = 0 ; i < this.capturedTransactions.length ; i++){
				modalTrans.innerHTML += this.capturedTransactions[i].string()+'<br>';
			}
			modalTrans.innerHTML += '<br>';

			var prevHash = '#NULL';
			if(centBlockchain[centBlockchain.length-1]){
				prevHash = centBlockchain[centBlockchain.length-1].hash;
			}
			modalTrans.innerHTML += 'Hash of previous block: ' + prevHash + '<br><br>';
			this.hashInput += prevHash + '\n';

			modalTrans.innerHTML += 'Appended Hex Guess: ';

			document.getElementById('popupfooter').innerHTML = 'Run hash to verify transactions and create block.' + '<br>';
			document.getElementById('popupfooter').innerHTML += 'Rule: Hash must start with "0".';
			document.getElementById('resultTitle').innerHTML = 'Resultant Hash: ';
			document.getElementById('result').innerHTML = '';

			for(var i = 0 ; i < this.capturedTransactions.length ; i++){
				this.hashInput += this.capturedTransactions[i].string()+'\n';
			}

		}
	};
	
	this.rewardAdded = false;
	this.addReward = function(){
		if(!this.rewardAdded && !this.verified){
			var modalTrans = document.getElementById('modalTrans');
			var i = modalTrans.innerHTML.indexOf('Hash') - 4;
			modalTrans.innerHTML = modalTrans.innerHTML.slice(0, i) + '-\> Brendan : ' + miningReward + '<br>' + modalTrans.innerHTML.slice(i);
			p1.innerHTML += 'Brendan received ' + miningReward + ' from mining<br>';
			this.capturedTransactions.push(new Transaction('', 'Brendan', miningReward));
			this.rewardAdded = true;
		}
	}

	this.hashOn = false;
	this.startHash = function(){
		if(!this.verified){
			this.hashOn = true;
		}
	};

	// Needs better name
	this.speedHash = function(){
		if(this.hashOn){
			this.appendGuessandCheck();
		}

	};

	this.hashInput = '';
	this.appendGuessandCheck = function(){
		// This is to prevent buttons being clicked after verification
		if(!this.verified){
			//console.log(this.hashInput);
			var hexGuess = this.randHex(20);
			var modalTrans = document.getElementById('modalTrans');
			
			if(this.hashInput[this.hashInput.length-1-20] == '!'){
				this.hashInput = this.hashInput.substring(0, this.hashInput.length-21);
				modalTrans.innerHTML = modalTrans.innerHTML.substring(0, modalTrans.innerHTML.length-20);
			}
			this.hashInput += '!' + hexGuess;
			modalTrans.innerHTML += hexGuess;

			var resP = document.getElementById('result');
			var result = SHA(this.hashInput);
			result = result.substring(4, 7);
			resP.innerHTML = result;

			if(this.verifyHash(result)){
				this.hashOn = false;
				document.getElementById('popupfooter').innerHTML = 'Hash Found! Block is pushed to Blockchain.';
				this.verified = true;
				this.rewardAdded = false;
				this.pushTransactionsToBlockchain(result);
			}
		}
	};

	this.verifyHash = function(h){
		if(h[0] == '0'){
			return true;
		}
		else{return false;}
	};

	// This function already exists elsewhere, can I find a way to delete it?
	this.randHex = function(n){
		var s = ''
		for(var i = 0 ; i < n ; i++){
			s += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)];
		}
		return s;
	}

	this.pushTransactionsToBlockchain = function(hash){

		// Miner creates block for now, this may change
		var completedBlock = new Block(this.capturedTransactions.slice(0), '#' + hash);

		// Push to blockchain
		centBlockchain.push(completedBlock);
		addDivCanv(false, hash);

		// Updates master ledger.  This should not be the job of the miner, this will change
		updateLedger();

		// Clear out transaction display
		while(this.trnsContainer.childNodes[1]){
			this.trnsContainer.removeChild(this.trnsContainer.childNodes[1]);
		}

		// Clear captured transactions.  There might be a better way to do this.
		this.capturedTransactions = [];

	};

	this.displayTransDiv = function(){
		// This is the div for the Miner's hub of info
		var minerHUD = document.getElementById('minerHUD');

		// "Temporary Block" div that will store recieved transactions
		this.trnsContainer = document.createElement('div');
		minerHUD.insertBefore(this.trnsContainer, minerHUD.childNodes[0]);

		var header = document.createElement('p');
		header.innerHTML = 'Captured Transactions';
		header.style.fontWeight = 'bold';
		header.style.textAlign = "center";
		this.trnsContainer.appendChild(header);

		this.trnsContainer.style.paddingTop = "5px";
		this.trnsContainer.style.background = '#e19f9d';
		this.trnsContainer.style.borderTopLeftRadius = '10px';
		this.trnsContainer.style.borderTopRightRadius = '10px';
		this.trnsContainer.style.width = 250 + 'px';
		this.trnsContainer.style.height = 300-30+6 + 'px';

		// Verify and Push button, lots of fancy css in styles.css
		this.verifyButton = document.createElement('button');
		minerHUD.appendChild(this.verifyButton);
		this.verifyButton.innerHTML = 'Verify and Push to Blockchain';
		this.verifyButton.onclick = function(){eval('miners[0].openVerification();')};
		this.verifyButton.style.width = this.trnsContainer.style.width;

	};

	this.displayTransDiv();

	// this.updateTransDiv = function(canvPosX, canvPosY){
	// 	var td = document.getElementById('minerHUD');
	// 	td.style.left = canvPosX + 20;
	// 	td.style.top = canvPosY;
	// }


	// Can I combine this into a single function? Is there a utility of keeping separate?
	this.displayTransaction = function(transaction){
		this.displayMessageIntrnsContainer((this.capturedTransactions.length -1) % blockSize + 1 +'. '+ transaction.string() + '<br>', '');
	};

	this.displayMessageIntrnsContainer = function(text, format){
		var p = document.createElement('p');
		p.style.textAlign = "left";
		p.style.margin = "8px";

		if(format == 'alert'){
			p.style.color = 'red';
		}
		if(format == 'ready'){
			p.style.color.fontWeight = 'bold';
		}

		this.trnsContainer.appendChild(p);
		p.innerHTML = text;
	};
}
