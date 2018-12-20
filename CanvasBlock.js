function CanvasBlock(posX, posY, num){
    this.margins = canvBlockMargin;
    this.width = canvBlockWidth-2*this.margins;
    this.height = canvBlockHeight-2*this.margins;
    this.x = posX;
    this.y = posY;
	
	this.randHex = function(n){
		var s = ''
		for(var i = 0 ; i < n ; i++){
			s += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)];
		}
		return s;
	}
	this.hash = '#' + this.randHex(3);
    this.arrowFromPrev = new Arrow({x: null},{y: null});
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
		ctx.font = "15px Arial";
		ctx.fillText('Hash: ' + this.hash, this.x+(this.width/2)+this.margins, this.y+3*(this.height/4)+this.margins);
    }

	this.showArrow = function(){
		if(num > 0){
            this.arrowFromPrev.show();
		}
	}

    this.updatePosition = function(coords){
        // Update Block coordinates
        this.x = coords.x;
        this.y = coords.y;

        // Update arrow coordinates
        var start = getPosition(num-1);
        var end = {x: this.x, y: this.y};
        if(num%canvBlocksPerLine == 0){
            start.x += canvBlockWidth/2;
            start.y += canvBlockHeight - canvBlockMargin;
            end.x = start.x;
            end.y += canvBlockMargin;
        }
        else if((num + (canvBlocksPerLine - 1))%(2*canvBlocksPerLine) < canvBlocksPerLine - 1){
            start.x += canvBlockMargin;
            start.y += canvBlockHeight - canvBlockMargin - (canvBlockHeight-2*canvBlockMargin)/4;
            end.x += canvBlockWidth - canvBlockMargin;
            end.y += canvBlockMargin + (canvBlockHeight-2*canvBlockMargin)/4;
        }
        else{
            start.x += canvBlockWidth - canvBlockMargin;
            start.y += canvBlockHeight - canvBlockMargin - (canvBlockHeight-2*canvBlockMargin)/4;
            end.x += canvBlockMargin;
            end.y += canvBlockMargin + (canvBlockHeight-2*canvBlockMargin)/4;
        }
        this.arrowFromPrev.setStartEnd(start, end);
    }
	

}
