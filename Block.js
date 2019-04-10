function Block(transactions, hash, nonce, num){

    this.num = num;
	this.hash = hash;
    this.nonce = nonce;
    this.transactions = transactions;
    // Not sure if this should even be here.  Depends on how this project scales
    this.canvBlock = new CanvasBlock(this.hash, this.nonce, this.num);

    this.pushTransaction = function(transaction){
        this.transactions.push(transaction);
    }
}
