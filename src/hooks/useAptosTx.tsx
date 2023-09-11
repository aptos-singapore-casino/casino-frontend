import { FaucetClient } from "aptos";
import { toast } from "react-toastify";
import { useWeb3Auth } from "../contexts/web3AuthContext";
import { APTOS_FAUCET_URL, APTOS_NODE_URL } from "../utils/contants";

export const useAptosTx = () => {
  const { aptosAccount, aptosClient, address, refetchInfo } = useWeb3Auth();

  const getAirdrop = async () => {
    if (!address) {
      toast.error("not logged in");
      return;
    }
    const faucetClient = new FaucetClient(APTOS_NODE_URL, APTOS_FAUCET_URL);
    const toastId = toast("requesting funds from faucet ...", { isLoading: true });
    const response = await faucetClient.fundAccount(address, 100_000_000);
    toast.update(toastId, { render: "funds received", type: "success", autoClose: 3000, isLoading: false });
    await refetchInfo();
    return response;
  };

  const sendTransaction = async () => {
    if (!aptosAccount || !aptosClient) {
      toast.error("not logged in");
      return;
    }
    try {
      const payload = {
        type: "entry_function_payload",
        function: "0x1::coin::transfer",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
        arguments: [aptosAccount.address().hex(), 717], // sending funds to self
      };
      const txnRequest = await aptosClient.generateTransaction(aptosAccount.address(), payload);
      const signedTxn = await aptosClient.signTransaction(aptosAccount, txnRequest);
      console.log(signedTxn);
      const toastId = toast("Sending transaction ...", { isLoading: true });
      const transactionRes = await aptosClient.submitTransaction(signedTxn);
      await aptosClient.waitForTransaction(transactionRes.hash);
      console.log(transactionRes.hash);
      toast.update(toastId, {
        render: "Transaction complete: " + transactionRes.hash,
        type: "success",
        autoClose: 3000,
        isLoading: false,
      });
      await refetchInfo();
      return transactionRes.hash;
    } catch (error) {
      return error as string;
    }
  };

  return { getAirdrop, sendTransaction };
};
