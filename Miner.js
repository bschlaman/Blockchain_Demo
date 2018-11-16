function Miner(){

    this.capturedTransactions = [];
    
	this.trnsContainer = null;



    this.receiveTransaction = function(transaction){
		
		// Could be a possible reworking of logic here.  Current logic: if we are on a non-0 multiple of blocksize,
		// then don't accept message.  Otherwise process the trans. and if afterwards its a multiple of 4 then append
		// ready message
		if(this.capturedTransactions.length % blockSize == 0 && this.capturedTransactions.length>0){
			if(!this.trnsContainer.lastChild.innerHTML.startsWith('C')){
				this.displayMessageIntrnsContainer('Can\'t accept, full! Push.');
			}
		}
		else{
			this.capturedTransactions.push(transaction);
			this.displayTransaction(transaction);
			if(this.capturedTransactions.length % blockSize == 0){
				this.displayMessageIntrnsContainer('Ready to Verify and Push');
			}
		}

		console.log(this.capturedTransactions.length%blockSize);

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
		
		// Clear out transaction display
		while(this.trnsContainer.childNodes[1]){
			this.trnsContainer.removeChild(this.trnsContainer.childNodes[1]);
		}
        
		// Push to blockchain
		centBlockchain.push(completedBlock);
        updatecentBlockchain();
		
		// Clear captured transactions.  There might be a better way to do this.
		this.capturedTransactions = [];

    }

    this.displayTransDiv = function(){
		this.trnsContainer = document.createElement('div');
		var rcvdTrans = document.getElementById('rcvdTrans');
		rcvdTrans.insertBefore(this.trnsContainer, rcvdTrans.childNodes[0]);
		this.trnsContainer.innerHTML = 'Temporary Block';
		this.trnsContainer.style.textAlign = "center";
		this.trnsContainer.style.background = 'lightblue';
		this.trnsContainer.style.width = '200px';
		this.trnsContainer.style.height = '300px';
    }

    this.displayTransDiv();

    this.displayTransaction = function(transaction){
       this.displayMessageIntrnsContainer((this.capturedTransactions.length -1) % blockSize + 1 +'. '+ transaction.string() + '<br>');
    }

	this.displayMessageIntrnsContainer = function(text){
		 var p = document.createElement('p');
        p.style.textAlign = "left";
        p.style.margin = "8px";
        this.trnsContainer.appendChild(p);
        p.innerHTML = text;
	}
}
