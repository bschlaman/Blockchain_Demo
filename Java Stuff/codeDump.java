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
}
