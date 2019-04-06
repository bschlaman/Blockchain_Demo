function Block(transactions, hash, nonce, num){

    this.num = num;
	this.hash = hash;
    this.nonce = nonce;
    this.transactions = transactions;
    this.canvBlock = new CanvasBlock(this.hash, this.nonce, this.num);

    this.pushTransaction = function(transaction){
        this.transactions.push(transaction);


    }
}
