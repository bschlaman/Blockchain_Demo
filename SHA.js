function SHA(message){

    //syslog(coderun+"<br>");

    // Create array containing the base10 chars of message
    var byteArray = [];
    for(var i = 0 ; i < message.length ; i++){
        byteArray.push(message.charCodeAt(i));
    }

    // Create array of 0s, nonzero multiple of 16
    numWords = (((message.length + 8) >> 6) + 1) * 16;
    var wordBlocks = [];
    for(var i = 0 ; i < numWords ; i++){
        wordBlocks[i] = 0;
    }

    // SHA-1 padding standard
    var i;
    for(i = 0; i < byteArray.length; i++) {
        wordBlocks[i >> 2] |= byteArray[i] << (24 - (i % 4) * 8);
    }
    wordBlocks[i >> 2] |= 0x80 << (24 - (i % 4) * 8);
    wordBlocks[wordBlocks.length - 1] = byteArray.length * 8;

    //console.log(wordBlocks);

    // Declaring initial 5 words
    var w = [];
    var A = 0x67452301;
    var B = 0xEFCDAB89;
    var C = 0x98BADCFE;
    var D = 0x10325476;
    var E = 0xC3D2E1F0;


    // Processes the 512 bit blocks (or groups of 16 words) one by one
    for(i = 0; i < wordBlocks.length; i += 16) {
        var oldA = A;
        var oldB = B;
        var oldC = C;
        var oldD = D;
        var oldE = E;

        // Each 512 bit block takes 80 steps
        for(var j = 0; j < 80; j++) {
            w[j] = (j < 16) ? wordBlocks[i + j] : rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);

            var t = rol(A, 5) + E + w[j] +
               ( (j < 20) ?  0x5A827999 + ((B & C) | ((~B) & D))
               : (j < 40) ?  0x6ED9EBA1 + (B ^ C ^ D)
               : (j < 60) ? 0x8F1BBCDC + ((B & C) | (B & D) | (C & D))
               : 0xCA62C1D6 + (B ^ C ^ D) );
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
        hexWord = words[i].toString(16);
        tracker[i] = words[i].toString(16);
        while(hexWord.length < 8){hexWord = '0' + hexWord;}
        result += hexWord;
    }

    console.log(tracker);
    return result;

    // console.log(byteArray);
    // console.log(wordBlocks);
    // console.log(message.length);
    // for(var i = 0 ; i < 140 ; i++){
    //     syslog(i + ': ' + numWord(i));
    // }
    // w = [];
    // i = 0;
    // for(var j = 0; j < 80; j++) {
    //     w[j] = (j < 16) ? wordBlocks[i + j] : rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
    // }
    // console.log(w);
    // w = [];


    function rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }
    function numWord(n){return (((n + 8) >> 6) + 1) * 16;}
    //function syslog(x){document.getElementById('p2').innerHTML+=x+"<br>";}

}

coderun = 'BHA("abc");';
