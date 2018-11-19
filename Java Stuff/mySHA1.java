import java.util.ArrayList;
import java.util.Arrays;

public class mySHA1 {
    public static void myBullshit(String str) {
        System.out.println("My Bullshit:");

        String s = "abc";
        byte[] byteArray = s.getBytes();




        System.out.println(Arrays.toString(byteArray));
        System.out.println();
        int x = (((byteArray.length + 8) >> 6) + 1) * 16;
        System.out.println(x+" : "+byteArray.length);
        System.out.println(0x80+" : "+Integer.toBinaryString(0x80));


    }

    public static void encodeHex(String str) {
        System.out.println("\nActual:");
        byte[] x = str.getBytes();
        int[] blks = new int[(((x.length + 8) >> 6) + 1) * 16];
    }



}
