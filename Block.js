function Block(transactions, hash, num){

    this.blockID = null;
    this.num = num;
	this.hash = hash;
	if(this.hash == 'inherit'){
		this.hash = canvBlocks[num].hash;
	}
    this.transactions = transactions;
    this.show = function(){


    }

    this.pushTransaction = function(transaction){
        this.transactions.push(transaction);


    }
}
