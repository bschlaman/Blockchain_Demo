function CanvPopUpData(posX, posY, num, color){
    this.width = canvBlockWidth + 100;
    this.height = canvBlockHeight + 100;
    this.x = posX;
    this.y = posY;
    this.mouseoffset = 10;
    this.color = color;

    this.show = function(){
        ctx.fillStyle = 'rgb('+this.color.r+', '+this.color.g+', '+this.color.b+')';
        ctx.fillRect(this.x+this.mouseoffset, this.y+this.mouseoffset, this.width, this.height);

        ctx.fillStyle = 'rgb('+(this.color.r+100)+', '+(this.color.g+100)+', '+(this.color.b+100)+')';
        ctx.font = "20px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        //ctx.fillText('Data for ' + num, this.x+(this.width/2)+this.mouseoffset, this.y+(this.height/2)+this.mouseoffset);

        for(var i = 0 ; i < centBlockchain[num].transactions.length ; i++){
            ctx.fillText(centBlockchain[num].transactions[i].string(), this.x+(this.width/2)+this.mouseoffset, this.y+(i*20+20)+this.mouseoffset);
        }
    }

    this.updatePosition = function(coords){
        this.x = coords.x;
        this.y = coords.y;
    }
}
