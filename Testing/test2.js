window.onload = function(){
    //setInterval(colorchg,1000/5);
    // With of actual block + border
    margins = 20;
    blockwidth = 100;
    totBlockwidth = blockwidth + margins*2;
    blockheight = 100;
}

blockcount = 0;
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
