function CanvPopUpData(posX, posY, num, color){
    this.width = canvBlockWidth + 100;
    this.height = canvBlockHeight + 100 + (hasReward(centBlockchain[num]) ? 22 : 0);
    this.x = posX;
    this.y = posY;
    this.mouseoffset = 10;
    this.color = color;

    this.show = function(){
		ctx.fillStyle = 'rgb('+this.color.r+', '+this.color.g+', '+this.color.b+')';
		var xpos = this.x;
		var ypos = this.y;
        if(this.x + this.mouseoffset + this.width < ctx.canvas.width){
			xpos += this.mouseoffset;
		}
		else{
			xpos -= (this.mouseoffset + this.width);
		}
		
		var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
		if(this.y + this.mouseoffset + this.height > ctx.canvas.parentElement.clientHeight && this.y - this.mouseoffset - this.height > scrollTop + ctx.canvas.parentElement.scrollTop){
			ypos -= (this.mouseoffset + this.height);
		}
		else{
			ypos += this.mouseoffset;
		}
		ctx.fillRect(xpos, ypos, this.width, this.height);

        ctx.fillStyle = 'rgb('+(this.color.r+200)+', '+(this.color.g+200)+', '+(this.color.b+200)+')';
        ctx.font = "20px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

		ctx.fillText('Hash of', xpos+(this.width/2), ypos+(20));
		ctx.fillText('Previous Block: ' + '#' + (centBlockchain[num-1] ? centBlockchain[num-1].hash : 'NULL'), xpos+(this.width/2), ypos+(40));

		ctx.fillStyle = 'rgb('+(this.color.r+150)+', '+(this.color.g+150)+', '+(this.color.b+150)+')';
		// This is declared outside so that it can be used to show nonce in the right place
		var i;
		for(i = 0 ; i < centBlockchain[num].transactions.length ; i++){
            ctx.fillText(centBlockchain[num].transactions[i].string(), xpos+(this.width/2), ypos+((i+3)*20+20));
        }
        ctx.fillStyle = 'rgb('+(this.color.r+200)+', '+(this.color.g+200)+', '+(this.color.b+200)+')';
        ctx.fillText('Nonce:', xpos+(this.width/2), ypos+((i+4)*20+20));
        ctx.fillText(centBlockchain[num].nonce, xpos+(this.width/2), ypos+((i+5)*20+20));
    }

    this.updatePosition = function(coords){
        this.x = coords.x;
        this.y = coords.y;
    }
}
