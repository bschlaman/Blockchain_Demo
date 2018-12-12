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
        
		// Solid Color
		/* ctx.fillStyle = 'rgb('+this.color.r+', '+this.color.g+', '+this.color.b+')';
        ctx.fillRect(this.x+this.margins, this.y+this.margins, this.width, this.height);
        
		ctx.fillStyle = 'rgb('+(this.color.r+100)+', '+(this.color.g+100)+', '+(this.color.b+100)+')';
        ctx.font = "30px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(num, this.x+(this.width/2)+this.margins, this.y+(this.height/2)+this.margins); */
		
		ctx.fillStyle = 'rgb('+(this.color.r+100)+', '+(this.color.g+100)+', '+(this.color.b+100)+')';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
		
		// Top Half
		ctx.fillStyle = 'rgb('+this.color.r+', '+this.color.g+', '+this.color.b+')';
        ctx.fillRect(this.x+this.margins, this.y+this.margins, this.width, this.height/2);
        ctx.fillStyle = 'rgb('+(this.color.r+100)+', '+(this.color.g+100)+', '+(this.color.b+100)+')';
		ctx.font = "15px Arial";
		ctx.fillText('Block '+num, this.x+(this.width/2)+this.margins, this.y+(this.height/4)+this.margins);
		
		// Bottom Half
		ctx.fillStyle = 'rgb('+(this.color.r+25)+', '+(this.color.g-25)+', '+(this.color.b-25)+')';
        ctx.fillRect(this.x+this.margins, this.y+this.margins+this.height/2, this.width, this.height/2);
		ctx.fillStyle = 'rgb('+(this.color.r+100)+', '+(this.color.g+100)+', '+(this.color.b+100)+')';
		ctx.font = "20px Arial";
		ctx.fillText('Hash', this.x+(this.width/2)+this.margins, this.y+3*(this.height/4)+this.margins);
    }
	
	this.showArrow = function(){
		if(num > 0){
			var prev = getPosition(num-1);
			prev.x += canvBlockWidth - canvBlockMargin;
			prev.y += canvBlockHeight - canvBlockMargin - (canvBlockHeight-2*canvBlockMargin)/4;
			
			ctx.beginPath();
			ctx.moveTo(prev.x, prev.y);
			ctx.lineTo(this.x + canvBlockMargin, this.y + canvBlockMargin + (canvBlockHeight-2*canvBlockMargin)/4);
			ctx.lineWidth = 5;
			ctx.strokeStyle = '#ff0000';
			ctx.stroke();
		}
	}

    this.updatePosition = function(coords){
        this.x = coords.x;
        this.y = coords.y;
    }
}
