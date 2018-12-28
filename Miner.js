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

	}


	this.verify = function(){
		if(this.capturedTransactions.length % blockSize == 0 && this.capturedTransactions.length>0){
			console.log('verify invoked');
			var verified = false;

			var proof = 0;
			verified = true;

			if(verified){
				this.pushTransactionsToBlockchain(proof);
			}
		}
	}

	this.pushTransactionsToBlockchain = function(proof){

		// Miner creates block for now, this may change
		var completedBlock = new Block(this.capturedTransactions.slice(0));

		// Push to blockchain
		centBlockchain.push(completedBlock);
		addDivCanv(true);

		// Clear out transaction display
		while(this.trnsContainer.childNodes[1]){
			this.trnsContainer.removeChild(this.trnsContainer.childNodes[1]);
		}

		// Clear captured transactions.  There might be a better way to do this.
		this.capturedTransactions = [];

	}

	this.displayTransDiv = function(){
		// This is the div for the Miner's hub of info
		var minerHUD = document.getElementById('minerHUD');

		// "Temporary Block" div that will store recieved transactions
		this.trnsContainer = document.createElement('div');
		minerHUD.insertBefore(this.trnsContainer, minerHUD.childNodes[0]);
		this.trnsContainer.innerHTML = 'Temporary Block';
		this.trnsContainer.style.textAlign = "center";
		this.trnsContainer.style.background = 'lightblue';
		this.trnsContainer.style.width = 250 + 'px';
		this.trnsContainer.style.height = 300-30+6 + 'px';

		// Verify and Push button, lots of fancy css in styles.css
		this.verifyButton = document.createElement('button');
		minerHUD.appendChild(this.verifyButton);
		this.verifyButton.innerHTML = 'Verify and Push to Blockchain';
		this.verifyButton.onclick = function(){eval('miners[0].verify();')};
		this.verifyButton.style.width = this.trnsContainer.style.width;

	}

	this.displayTransDiv();

	// this.updateTransDiv = function(canvPosX, canvPosY){
	// 	var td = document.getElementById('minerHUD');
	// 	td.style.left = canvPosX + 20;
	// 	td.style.top = canvPosY;
	// }


	// Can I combine this into a single function? Is there a utility of keeping separate?
	this.displayTransaction = function(transaction){
		this.displayMessageIntrnsContainer((this.capturedTransactions.length -1) % blockSize + 1 +'. '+ transaction.string() + '<br>', '');
	}

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
	}
}
