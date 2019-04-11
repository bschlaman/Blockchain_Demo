public class Main {

    public static void main(String[] args) {
        System.out.println("Hello World!");
        System.out.println(SHA1.encodeHex("abc"));
        System.out.println(SHA1.encodeBase64("abc"));
        System.out.println('\n');

        // System.out.println(mySHA1.encodeHex("abc"));
        mySHA1.myBullshit("abc");
        mySHA1.encodeHex("abc");
    }
}
