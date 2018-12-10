function CanvasBlock(posX, posY, num){
    this.margins = canvBlockMargin;
    this.width = canvBlockWidth-2*this.margins;
    this.height = canvBlockHeight-2*this.margins;
    this.x = posX;
    this.y = posY;
    this.color = {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255
    };

    this.show = function(){
        ctx.fillStyle = 'rgb('+this.color.r+', '+this.color.g+', '+this.color.b+')';
        ctx.fillRect(this.x+this.margins, this.y+this.margins, this.width, this.height);
        ctx.fillStyle = 'rgb('+(this.color.r+100)+', '+(this.color.g+100)+', '+(this.color.b+100)+')';
        ctx.font = "30px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(num, this.x+(this.width/2)+this.margins, this.y+(this.height/2)+this.margins);
    }

    this.updatePosition = function(coords){
        this.x = coords.x;
        this.y = coords.y;
    }
}
