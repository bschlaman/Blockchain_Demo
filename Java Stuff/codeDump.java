public class codeDump {


    public static void crap() {
        int[] log = new int[1000];
        for (int i = 0; i < 1000; i++) {
            log[i] = (((i + 8) >> 6) + 1) * 16;
        }

        for (int k = 0; k < log[log.length - 1]; k += 16) {
            System.out.println(k + " : " + act(log, k));
        }
    }

    public static int act(int[] array, int item){
        int amt = 0;
        for (int i = 0; i < array.length; i++) {
            if (array[i] == item) {
                amt++;
            }
        }
        return amt;
    }
	
	public static void crap2() {
    
		for(int i = 0 ; i < 100 ; i++){
			int x = (((i + 8) >> 6) + 1) * 16;
			System.out.println(i+": "+x);
		}
    
	}


    public static void moreCrap(){
        System.out.println("Hello World");

        System.out.println(encodeHex(Integer.toString(0x3c570feb141398bb552ef5a0a82be331fea48037b8b5d71f0e332edf93ac3500eb4ddc0decc1a864790c782c76215660dd309791d06bd0af3f98cda4bc4629b1)));

        System.out.println("My Bullshit:");

        String s = "abc";
        byte[] byteArray = s.getBytes();




        //System.out.println(Arrays.toString(byteArray));
        System.out.println();
        int x = (((byteArray.length + 8) >> 6) + 1) * 16;
        System.out.println(x+" : "+byteArray.length);
        System.out.println(Integer.toBinaryString(0b101001110101>>2));
        System.out.println(0x80+" : "+Integer.toBinaryString(0x80));

        crap();


        // for(int z = 0;  z < 130 ; z++){
        //    System.out.println(z + ": "+ (((z-1)>>6)+1)+" : " + (((z+8)>>6)+1));
        // }

        System.out.println(Integer.toBinaryString(125));

        System.out.println(Integer.toBinaryString(125>>3));
        System.out.println(125>>3);
        int z;
        for(z = 0;  z < 130 ; z++){
            System.out.println(z+": "+(z%4)+" -> "+(z%4)*8+" -> "+ (24-(z%4)*8)+" ; "+(z>>2));
        }
        System.out.print(z);
    }


    public static void evenmoreCrap(String []args){


        int a = 66;	/* 60 = 0011 1100 */
        int b = 13;	/* 13 = 0000 1101 */
        int c = 0;

        //AND
        c = a & b;       /* 12 = 0000 1100 */
        System.out.println("a & b = " + c );


        //OR
        c = a | b;       /* 61 = 0011 1101 */
        System.out.println("a | b = " + c );


        //XOR
        c = a ^ b;       /* 49 = 0011 0001 */
        System.out.println("a ^ b = " + c );


        //NEGATION
        c = ~a;          /*-61 = 1100 0011 */
        System.out.println("~a = " + c );


        int num = -87;
        int cnt = 3;
        System.out.println(num+": " +Integer.toBinaryString(num));
        System.out.println((num>>cnt)+": "+ Integer.toBinaryString(num>>cnt));
        System.out.println((num>>>cnt)+": " +Integer.toBinaryString(num>>>cnt));
        System.out.println("11111111111111111111111110101001".length());
        System.out.println(0b101001-Math.pow(2,7));
        System.out.println(0b1111111111111111111111110101001);
        System.out.println(Integer.toBinaryString(4));
        System.out.println(Integer.toBinaryString(-4));
        System.out.println();
        System.out.println(0b10000000000000000000000000000000);
        System.out.println(0b01111111111111111111111111111111);
        System.out.println();
        System.out.println("1111111111111111111111100010011".length());
        System.out.println(Integer.MIN_VALUE);
        System.out.println(Integer.MAX_VALUE);
        System.out.println( Integer.MIN_VALUE - 1);
        System.out.println( Integer.MAX_VALUE + 1);




    }

    public static String print(){return null;}

















}
