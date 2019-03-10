package packageA;

import org.aion.avm.api.ABIDecoder;
import org.aion.avm.api.BlockchainRuntime;
import org.aion.avm.api.Address;


public class HelloAvm
{

    public static String storage1;
    private static int testINT = 4;
    private static Address owner;

    static{
      owner = BlockchainRuntime.getCaller();
    }
    public static void sayHello() {
        BlockchainRuntime.println("Hello Avm");
    }

    public static String greet(String name) {
        return "Hello " + name + "!";
    }

    public static void setString(String stringToStore) {
        storage1 = stringToStore;
        BlockchainRuntime.log("NewProposalAdded".getBytes(), Integer.toString(testINT).getBytes(), BlockchainRuntime.getCaller().unwrap());
        BlockchainRuntime.println("Contract owner balance: " + BlockchainRuntime.getBalance(owner));

    }

    public static String getString() {
        return stora1ge1;
    }

    //main should be last function
    public static byte[] main() {
        return ABIDecoder.decodeAndRunWithClass(HelloAvm.class, BlockchainRuntime.getData());
    }
}
