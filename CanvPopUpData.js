function CanvPopUpData(posX, posY, num, color){
    this.width = canvBlockWidth;
    this.height = canvBlockHeight;
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
        ctx.fillText('Data for ' + num, this.x+(this.width/2)+this.mouseoffset, this.y+(this.height/2)+this.mouseoffset);
    }

    this.updatePosition = function(coords){
        this.x = coords.x;
        this.y = coords.y;
    }
}
