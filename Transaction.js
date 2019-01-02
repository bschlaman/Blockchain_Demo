function Transaction(sender, receiver, amount){
    this.s = sender;
    this.r = receiver;
    this.a = parseInt(amount);

    this.string = function(){
        return this.s+' -> '+this.r+' : '+this.a;
    }
}
