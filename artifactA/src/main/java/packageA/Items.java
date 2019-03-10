package packageA;

import org.aion.avm.api.ABIDecoder;
import org.aion.avm.api.BlockchainRuntime;
import org.aion.avm.api.Address;
import org.aion.avm.api.BlockchainRuntime;
import org.aion.avm.userlib.AionMap;


public class Items
{

  public static final AionMap<Address, Address> allowed = new AionMap<>();

  private static Address owner;
  private static Address contractAddress;
  public static String tokenName;
  public static String tokenSymbol;
  public static Address nullAddress = null;

  static {
    contractAddress = BlockchainRuntime.getAddress();
    owner = BlockchainRuntime.getCaller();
    tokenName = "testToken";
    tokenSymbol = "TST";
    //timestamp = BlockchainRuntime.getBlockTimestamp();
    //blockNumber = BlockchainRuntime.getBlockNumber();
  }

    public static Address getOwner(){
      return owner;
    }

    public static String getName(){
      return tokenName;
    }

    public static void setNameAndSymbol(String _name, String _symbol){
      tokenName = _name;
      tokenSymbol = _symbol;
    }

    public static void transfer(Address _to){
      BlockchainRuntime.require(true);

         owner = _to;

         BlockchainRuntime.log("Transfer".getBytes(), BlockchainRuntime.getCaller().unwrap(), _to.unwrap(),Long.toString(BlockchainRuntime.getBlockTimestamp()).getBytes());

    }

    public static void transferFrom(Address _from, Address _to){
     Address allowedAddress = allowed.get(_from);
     BlockchainRuntime.require(allowedAddress!=nullAddress);
     BlockchainRuntime.require(owner==_from);
     owner = _to;
     allowed.put(_from,null);
     BlockchainRuntime.log("Transfer".getBytes(), _from.unwrap(), _to.unwrap());
    }

    public static boolean isOwnedby(Address _address){
        if(owner == _address){
          return true;
        } else {
          return false;
        }
    }

    public static void approve(Address _spender){

      allowed.put(BlockchainRuntime.getCaller(),_spender);
       BlockchainRuntime.log("Approve".getBytes(), BlockchainRuntime.getCaller().unwrap(), _spender.unwrap());
    }

    public static Address allowedAddress(Address _owner) {
        return allowed.get(_owner);
    }

    public static String storage1;

    public static void sayHello() {
        BlockchainRuntime.println("Hello Avm");
    }

    public static String greet(String name) {
        return "Hello " + name + "!";
    }

    public static void setString(String stringToStore) {
        storage1 = stringToStore;

    }

    public static String getString() {
        return storage1;
    }

    //main should be last function
    public static byte[] main() {
        return ABIDecoder.decodeAndRunWithClass(HelloAvm.class, BlockchainRuntime.getData());
    }
}
