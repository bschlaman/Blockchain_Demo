function bHA(message){

    //syslog(coderun+"<br>");

    // Create array containing the base10 chars of message
    var byteArray = [];
    for(var i = 0 ; i < message.length ; i++){
        byteArray.push(message.charCodeAt(i));
    }

    // My bins are of size 2 bytes, or 2 letters.  8 bins total,
    // so 128 bits per block.  Message size is 2 bytes, with 1 byte padding.
    // function numWord(n){return (((n + 2) >> 4) + 1) * 8;}
    for(var i = 0 ; i < 50 ; i++){
        //console.log(i + ' : ' + (i>>1) + ' : ' + (8-(i%2)*8));
    }


    // Create array of 0s, nonzero multiple of 8
    numWords = (((message.length + 2) >> 4) + 1) * 8;
    var wordBlocks = [];
    for(var i = 0 ; i < numWords ; i++){
        wordBlocks[i] = 0;
    }

    // SHA-1 padding standard
    var i;
    for(i = 0; i < byteArray.length; i++) {
        wordBlocks[i >> 1] |= byteArray[i] << (8 - (i % 2) * 8);
    }
    wordBlocks[i >> 1] |= 0x80 << (8 - (i % 2) * 8);
    wordBlocks[wordBlocks.length - 1] = byteArray.length * 8;

    //console.log(wordBlocks);

    // Declaring initial 5 words
    var w = [];
    var A = 0xBBBB;
    var B = 0x1337;
    var C = 0xA5DF;
    var D = 0x1235;
    var E = 0x15D0;


    // Processes the 512 bit blocks (or groups of 16 words) one by one
    for(i = 0; i < wordBlocks.length; i += 8) {
        var oldA = A;
        var oldB = B;
        var oldC = C;
        var oldD = D;
        var oldE = E;

        // Each 512 bit block takes 80 steps
        for(var j = 0; j < 20; j++) {
            w[j] = (j < 8) ? wordBlocks[i + j] : rol(w[j-1] ^ w[j-4] ^ w[j-5] ^ w[j-7], 1);

            var t = rol(A, 5) + E + w[j] +
               ( (j < 5) ?  0xABCD + ((B & C) | ((~B) & D))
               : (j < 10) ?  0xDEF6 + (B ^ C ^ D)
               : (j < 15) ? 0xACE6 + ((B & C) | (B & D) | (C & D))
               : 0x6660 + (B ^ C ^ D) );
            E = D;
            D = C;
            C = rol(B, 30);
            B = A;
            A = t;
        }
        A = A + oldA;
        B = B + oldB;
        C = C + oldC;
        D = D + oldD;
        E = E + oldE;
    }

    var words = [A, B, C, D, E];
    var result = '';
    var tracker = [];
    for(var i = 0 ; i < words.length ; i++){
        hexWord = bit32(words[i].toString(16));
        tracker[i] = bit32(words[i].toString(16));
        while(hexWord.length < 8){hexWord = '0' + hexWord;}
        result += hexWord;
    }

    // console.log(tracker);
    return result;


    function rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    function bit32(hexString){
		var signed32MAXINT = 2147483647;
		var dec = parseInt(hexString, 16);
		var dec32;
		if(dec < 0){
			dec32 = (dec-signed32MAXINT-1)%(2*(signed32MAXINT+1)) + signed32MAXINT + 1;
		}
		else{
			dec32 = (dec+signed32MAXINT+1)%(2*(signed32MAXINT+1)) - signed32MAXINT - 1;
		}
		
		if(dec32 < 0){
			dec32 += Math.pow(2, 32)
		}
		return dec32.toString(16);
	}

}

coderun = 'BHA("abc");';
