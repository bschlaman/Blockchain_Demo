function Arrow(start, end){
    this.start = start;
    this.end = end;
    this.setStartEnd = function(s, e){
        this.start = s;
        this.end = e;
        this.slope = (this.end.y - this.start.y)/(this.end.x - this.start.x);
        this.math = function(x){return (((1-((x+1)/(Math.abs(x)+1)))*(1-x))+(x+1-Math.abs(x+1)))/2;}
        this.angle = Math.atan(this.slope) + Math.PI*this.math((this.end.x-this.start.x));
    }


    this.barbAngle = Math.PI/6;
    this.barbRadius = 10;

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

        ctx.lineWidth=3;
        ctx.strokeStyle = '#ef093b';
        ctx.stroke();
    }
}
