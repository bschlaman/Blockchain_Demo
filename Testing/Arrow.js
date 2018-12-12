function Arrow(start, end){
    this.start = start;
    this.end = end;
    this.slope = (this.end.y - this.start.y)/(this.end.x - this.start.x);
    this.math = function(x){return (((1-((x+1)/(Math.abs(x)+1)))*(x-1))*-1+(x+1-Math.abs(x+1)))/2;}
    this.angle = Math.atan(this.slope) + Math.PI*this.math((this.end.x-this.start.x));
    console.log(this.slope, this.angle);

    this.barbAngle = Math.PI/6;
    this.barbRadius = 20;

    this.show = function(){
        ctx.beginPath();

        // Shaft
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        // First Barb
        ctx.moveTo(this.end.x, this.end.y);
        ctx.lineTo(this.end.x + this.barbRadius*Math.cos(this.angle+Math.PI-this.barbAngle),
            this.end.y + this.barbRadius*Math.sin(this.angle+Math.PI-this.barbAngle));
        // Second Barb
        this.barbAngle*=-1;
        ctx.moveTo(this.end.x, this.end.y);
        ctx.lineTo(this.end.x + this.barbRadius*Math.cos(this.angle+Math.PI-this.barbAngle),
            this.end.y + this.barbRadius*Math.sin(this.angle+Math.PI-this.barbAngle));

        ctx.lineWidth=5;
        ctx.strokeStyle = '#ef093b';
        ctx.stroke();
    }

    for(var x = -10 ; x < 10 ; x ++){
        console.log(x, this.math(x));
    }
}
