import { SupraClient, SupraAccount, HexString } from "supra-l1-sdk";

// Initialize Supra Client
const initializeClient = async () => {
  return await SupraClient.init("https://rpc-testnet.supra.com/");
};

// Two-By-Two Transfer Function
export const twoByTwo = async (
  senderPrivateKey,
  amount,
  dstFirst,
  dstSecond
) => {
  try {
    const supraClient = await initializeClient();

    const senderAccount = new SupraAccount(
      Buffer.from(senderPrivateKey, "hex")
    );

    const payload = {
      type: "entry_function_payload",
      function:
        "f7ca15dcdd2d272282acdf33b1103d4ed7661ea5035e751686d30bcdc953e399::transfer::two_by_two",
      type_arguments: [],
      arguments: [amount, dstFirst, dstSecond],
    };

    const txResData = await supraClient.submitTransaction(
      senderAccount,
      payload,
      {
        enableTransactionWaitAndSimulationArgs: {
          enableWaitForTransaction: true,
          enableTransactionSimulation: true,
        },
      }
    );

    return txResData;
  } catch (error) {
    console.error("Error in twoByTwo:", error);
    throw error;
  }
};

export const getBalance = async (address) => {
  try {
    // Initialize the Supra client
    const supraClient = await SupraClient.init(
      "https://rpc-testnet.supra.com/"
    );
    console.log("Supra Client Initialized");

    // Check if the account exists
    const accountExists = await supraClient.isAccountExists(address);
    if (!accountExists) {
      console.error("Account does not exist:", address);
      throw new Error("Account does not exist.");
    }

    // Fetch the balance
    const balance = await supraClient.getAccountSupraCoinBalance(address);
    console.log("Account Balance:", balance);

    return balance;
  } catch (error) {
    console.error("Error in getBalance:", error);
    throw error;
  }
};
