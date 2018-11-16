function Miner(){

    this.capturedTransactions = [];
    this.trnsContainer =  null;



    this.receiveTransaction = function(transaction){

        this.capturedTransactions.push(transaction);

        // Make this logic better.  No need to call so many functions
        if(this.capturedTransactions.length % blockSize == 0){
			
			
            this.verify();
        }

        this.displayTransaction(transaction);

    }


    this.verify = function(){
        console.log('verify invoked');
		var verified = false;

        var proof = 0;
        verified = true;

        if(verified){
            this.pushBlockToBlockchain(proof);
        }
    }

    this.pushBlockToBlockchain = function(proof){

        // Miner creates block for now, this may change
        var completedBlock = new Block(this.capturedTransactions.slice(0));
		
		// Clear out transaction display
		while(this.trnsContainer.firstChild){
			this.trnsContainer.removeChild(this.trnsContainer.firstChild);
		}
        
		// Push to blockchain
		centBlockchain.push(completedBlock);
        updatecentBlockchain();

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
        var p = document.createElement('p');
        p.style.textAlign = "left";
        p.style.margin = "8px";
        this.trnsContainer.appendChild(p);
        p.innerHTML = (this.capturedTransactions.length % blockSize) +'. '+ transaction.string() + '<br>';
    }


}
