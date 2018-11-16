function Miner(){

    this.capturedTransactions = [];
    this.trnsContainer =  null;



    this.receiveTransaction = function(transaction){

        this.capturedTransactions.push(transaction);
        //console.log(this.capturedTransactions);

        // Make this logic better.  No need to call so many functions
    //    if(this.capturedTransactions.length % 2 == 0){

            //this.verify();
        //}

        //this.displayTransaction(transaction);
this.pushBlockToBlockchain('proof');
console.log(this.capturedTransactions);
    }


    // this.verify = function(){
    //     var verified = false;
    //
    //     var proof = 0;
    //     verified = true;
    //
    //     if(verified){
    //         this.pushBlockToBlockchain(proof);
    //     }
    // }

    this.pushBlockToBlockchain = function(proof){

        // Miner creates block for now, this may change
        //var completedBlock = new Block(this.capturedTransactions);
        //this.capturedTransactions = [];
        centBlockchain.push(new Block(this.capturedTransactions.slice(0)));
        console.log(centBlockchain);
        //updatecentBlockchain();

    }

    // this.displayTransDiv = function(){
    //     if (!this.trnsContainer){
    //         this.trnsContainer = document.createElement('div');
    //         var rcvdTrans = document.getElementById('rcvdTrans');
    //         rcvdTrans.appendChild(this.trnsContainer);
    //         this.trnsContainer.innerHTML = 'Temporary Block';
    //         this.trnsContainer.style.textAlign = "center";
    //         this.trnsContainer.style.background = 'lightblue';
    //         this.trnsContainer.style.width = '200px';
    //         this.trnsContainer.style.height = '300px';
    //     }
    // }
    //
    // this.displayTransDiv();
    //
    // this.displayTransaction = function(transaction){
    //     var p = document.createElement('p');
    //     p.style.textAlign = "left";
    //     p.style.margin = "8px";
    //     this.trnsContainer.appendChild(p);
    //     p.innerHTML = this.capturedTransactions.length +'. '+ transaction.string() + '<br>';
    // }


}
