package packageA;

import org.aion.avm.api.ABIDecoder;
import org.aion.avm.api.BlockchainRuntime;

public class HelloAvm
{

  public static final AionMap<Address, AionMap<Address,Bool>> allowed = new AionMap<>();


  private static Address owner;


  static {
    contractAddress = BlockchainRuntime.getAddress();
    owner = BlockchainRuntime.getCaller();
    tokenName = _tokenName
    tokenSymbol = _tokenSymbol
    timestamp = BlockchainRuntime.getBlockTimestamp();
    blockNumber = BlockchainRuntime.getBlockNumber();
  }

    public static void transfer(Address _to){
         BlockchainRuntime.require(owner==BlockchainRu.getCaller());
         owner = _to;
         BlockchainRuntime.log("Transfer".getBytes(), BlockchainRuntime.getCaller().unwrap(), _to.unwrap());

    }

    public static void transferFrom(Address _from, Address _to){
      boolean isallowed = allowed[_from][msg.sender];
     require(owner == _from && isallowed);
     BlockchainRuntime.require(owner==_from);
     owner = _to;
     allowed[_from][msg.sender] = false;
     BlockchainRuntime.log("Transfer".getBytes(), _from.unwrap(), _to.unwrap());
    }

    public static boolean isOwnedby(Address _address){
        if(owner = _address){
          return true;
        } else {
          return false;
        }
    }

    public static void approve(Address _spender){

      allowed[BlockchainRuntime.getCaller()][_spender] = true;
       BlockchainRuntime.log("Transfer".getBytes(), BlockchainRuntime.getCaller().unwrap(), _spender.unwrap());
    }

    public static boolean isAllowed(Address _owner, Address _spender) {
        return allowed[_owner][_spender];
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
