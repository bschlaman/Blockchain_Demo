window.onload = function(){
    //setInterval(colorchg,1000/5);
    // With of actual block + border
    margins = 20;
    blockwidth = 100;
    totBlockwidth = blockwidth + margins*2;
    blockheight = 100;

    canvasOnload();
}

var blockcount = 0;
function addDiv(float, firtRight, amt){
    blockcount++;
    createBlockDiv(float, firtRight, amt);
    reorganizeDivs();
}

function createBlockDiv(float, firstRight, amt){
    var div = document.createElement('div');
    div.className = 'block';
    div.innerHTML = blockcount;
    div.style.margin = margins + ' ' + margins + ' ' + margins + ' ' + margins+' ';
    div.style.width = blockwidth;
    div.style.height = blockheight;
    div.onmouseenter = function(){eval('showDiv(event, this);');};
    div.onmouseleave = function(){eval('hideDiv(event, this);');};
    div.onmousemove = function(){eval('updatecoord(event);');};
    if(float == 'right'){
        div.style.float = 'right';
    }
    if(firstRight){
        var marstr = div.style.marginRight;
        var newmar = parseInt(marstr.substring(0, marstr.length-2)) + amt;
        div.style.marginRight = newmar;
    }
    document.getElementById('testdiv2').appendChild(div);
}

function manyDivs(n){
    for(var i = 0 ; i < n ; i++){
        addDiv(null, null, null);
    }
}

function reorganizeDivs(){
    oldblockcount = blockcount;
    blockcount = 0;
    var bc = document.getElementById('testdiv2');
    while(bc.firstChild){
        bc.removeChild(bc.firstChild);
    }
    var w = bc.clientWidth;
    blocksPerLine = Math.floor(w/totBlockwidth);

    // First try it where I use float left and right, with appropriate padding
    // based on the leftover from blocksPerLine
    for(var i = 0 ; i < oldblockcount ; i++){
        if(Math.floor(i/blocksPerLine)%2 == 1){
            rl = 'right';
        }
        else{
            rl = 'left';
        }
        if((i+blocksPerLine)%(2*blocksPerLine) == 0){
            firstRight = true;
        }
        else{
            firstRight = false;
        }
        blockcount++;
        createBlockDiv(rl, firstRight, bc.clientWidth%totBlockwidth);
    }
    updateScroll();

}

function updateScroll(){
    var element = document.getElementById('testdiv2');
    element.scrollTop = element.scrollHeight;
}

// Mouseover functionality

inside = false;
function showDiv(e, callDiv){
    inside = true;
    floatdiv = document.createElement('div');
    floatdiv.id = 'floatdiv';
    floatdiv.className = 'block';
    floatdiv.style.width = 50;
    floatdiv.style.height = 50;
    floatdiv.innerHTML = callDiv.innerHTML;
    callDiv.appendChild(floatdiv);
}
function hideDiv(e, callDiv){
    inside = false;
    callDiv.removeChild(document.getElementById('floatdiv'));
}
function updatecoord(e){
    var fd = document.getElementById('floatdiv');
    if(fd){
        fd.style.left = e.clientX + 10;
        fd.style.top = e.clientY - 10;
    }
}

// Canvas Functions
function canvasOnload(){
    ctx = document.getElementById('canv').getContext("2d");
    ctx.canvas.addEventListener('mousemove', function(event){trackmouse(event)});

    fitToContainer(canv);

    setInterval(update, 1000/10);
}
function update(){
    fitToContainer(canv);
    reorganizeCanvDivs();
    for(var i = 0 ; i < canvBlocks.length ; i++){
        canvBlocks[i].show();
    }
    if(popup){popup.show();}
}
function fitToContainer(canvas){
    parentDiv = document.getElementById('testdiv1');
    canvas.width  = parentDiv.clientWidth;
    canvas.height = parentDiv.clientHeight;
}


canvBlocks = [];
canvBlockWidth = 100;
canvBlockHeight = 100;
canvBlocksPerLine = 0;

function addDivCanv(){
    var pos = getPosition(canvBlocks.length);
    canvBlocks.push(new CanvasBlock(pos.x, pos.y, canvBlocks.length));
}
function reorganizeCanvDivs(){
    var len = canvBlocks.length;
    //canvBlocks = [];
    for(var i = 0 ; i < len ; i++){
        canvBlocks[i].updatePosition(getPosition(i));
    }
}
function getPosition(blkNum){
    canvBlocksPerLine = Math.floor(ctx.canvas.width/canvBlockWidth);
    //var x = canvBlocks.length%canvBlocksPerLine * canvBlockWidth;
    var getWidth = function(num, width, bpl){
        return (num%bpl)*width + width * (bpl-1-2*(num%bpl)) * (Math.floor(num/bpl)%2);
    }
    var w = getWidth(blkNum, canvBlockWidth, canvBlocksPerLine);
    var h = Math.floor(blkNum/canvBlocksPerLine) * canvBlockHeight;
    return {x: w, y: h};
}
currentBlock = null;
popup = null;
function trackmouse(event){
    var mouseX = event.clientX - ctx.canvas.offsetLeft;
    var mouseY = event.clientY - ctx.canvas.offsetTop;
    var b = blockfromCoord(mouseX,mouseY);
    if(canvBlocks[b]){
        var mouseblock = canvBlocks[b];
        if(mouseblock != currentBlock){
            currentBlock = mouseblock;
            popup = new CanvasPopUp(mouseX,mouseY,b,currentBlock.color);
        }
        if(popup){
            popup.updatePosition({x: mouseX, y: mouseY});
        }
    }
    else{currentBlock = null; popup = null;}
}
function blockfromCoord(x,y){
    var row = Math.floor(y/canvBlockHeight);
    var col = Math.floor(x/canvBlockWidth);
    return row%2 == 0 ? (col + row*canvBlocksPerLine):((row+1)*canvBlocksPerLine-1-col);
}

function manyDivsCanv(x){
    for (var i = 0 ; i <x ; i++){
        addDivCanv();
    }
}

// function mathy(x){
//     //return (x%6)*100 - (2*x-11) * 100 * (Math.floor(x/6)%2);
//     return (x%6)*100 + 100 * (5-2*(x%6)) * (Math.floor(x/6)%2) ;
// }
