// src/utils/supraSdk.js
import { SupraClient, SupraAccount } from "supra-l1-sdk";
import { Buffer } from "buffer";

const SUPRA_RPC_URL = "https://rpc-testnet.supra.com/";
const MODULE_ADDRESS =
  "b29ec903259f02d5abac73db83ed72f96a1124d9e1eec350cac69c998b92256b"; // Replace with your module address

const initializeClient = async () => {
  return await SupraClient.init(SUPRA_RPC_URL);
};

// Create management system
export const createManagement = async (senderPrivateKey) => {
  try {
    const supraClient = await initializeClient();
    const senderAccount = new SupraAccount(
      Buffer.from(senderPrivateKey, "hex")
    );

    const payload = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::relief_center_management::create_management`,
      type_arguments: [],
      arguments: [],
    };

    const txResData = await supraClient.createRawTxObject(
      senderAccount,
      payload,
      {
        enableTransactionWaitAndSimulationArgs: {
          enableWaitForTransaction: true,
          enableTransactionSimulation: true,
        },
      }
    );

    console.log("Management system created:", txResData);
    return txResData;
  } catch (error) {
    console.error("Error creating management system:", error);
    throw error;
  }
};

// Add a relief center
export const addCenter = async (
  senderPrivateKey,
  name,
  location,
  city,
  state
) => {
  try {
    const supraClient = await initializeClient();
    const senderAccount = new SupraAccount(
      Buffer.from(senderPrivateKey, "hex")
    );

    const payload = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::relief_center_management::add_center`,
      type_arguments: [],
      arguments: [name, location, city, state],
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

    console.log("Relief center added:", txResData);
    return txResData;
  } catch (error) {
    console.error("Error adding center:", error);
    throw error;
  }
};

// Donate to a relief center
export const donateToCenter = async (senderPrivateKey, centerId, amount) => {
  try {
    const supraClient = await initializeClient();
    const senderAccount = new SupraAccount(
      Buffer.from(senderPrivateKey, "hex")
    );

    const payload = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::relief_center_management::donate_to_center`,
      type_arguments: [],
      arguments: [centerId, amount],
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

    console.log("Donation successful:", txResData);
    return txResData;
  } catch (error) {
    console.error("Error donating to center:", error);
    throw error;
  }
};

// View the balance of an account
export const getBalance = async (address) => {
  try {
    const supraClient = await initializeClient();
    const accountExists = await supraClient.isAccountExists(address);

    if (!accountExists) {
      throw new Error("Account does not exist.");
    }

    const balance = await supraClient.getAccountSupraCoinBalance(address);
    console.log("Account Balance:", balance);
    return balance;
  } catch (error) {
    console.error("Error retrieving balance:", error);
    throw error;
  }
};
