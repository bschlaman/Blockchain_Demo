function Transaction(sender, receiver, amount){
    this.s = sender;
    this.r = receiver;
    this.a = amount;

    this.string = function(){
        return this.s+':'+this.r+':'+this.a;
    }
}
