import { FaucetClient, Network, Provider } from "aptos";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { useWeb3Auth } from "../contexts/web3AuthContext";
import { APTOS_FAUCET_URL, APTOS_NODE_URL, CASINO_ADDRESS, CASINO_EVENTS_ADDRESS } from "../utils/constants";
import { unknwonErrorToString } from "../utils/utils";
import { RouletteEventEnum } from "./useAptosEventsListener";

export const useAptosTx = () => {
  const { aptosAccount, aptosClient, address, refetchInfo } = useWeb3Auth();
  const aptosProvider = useMemo(() => new Provider(Network.TESTNET), []);

  const getAirdrop = async () => {
    if (!address) {
      toast.error("not logged in");
      return;
    }
    const toastId = toast("requesting funds from faucet ...", { isLoading: true });
    try {
      const faucetClient = new FaucetClient(APTOS_NODE_URL, APTOS_FAUCET_URL);
      const response = await faucetClient.fundAccount(address, 100_000_000);
      toast.update(toastId, { render: "funds received", type: "success", autoClose: 3000, isLoading: false });
      return response;
    } catch (error: unknown) {
      return toast.update(toastId, {
        render: `error while requesting funds: ${unknwonErrorToString(error)}`,
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    } finally {
      await refetchInfo();
    }
  };

  const requestEvents = async (event: RouletteEventEnum, start: number, limit: number) => {
    const eventsMap = {
      [RouletteEventEnum.result]: `result_events`,
      [RouletteEventEnum.payout]: `payout_events`,
    };
    const res = await aptosClient?.getEventsByEventHandle(
      CASINO_EVENTS_ADDRESS,
      `${CASINO_ADDRESS}::casino::State`,
      eventsMap[event],
      { start, limit }
    );
    return res;
  };

  async function getRouletteEvents(eventName: RouletteEventEnum): Promise<any> {
    const rouletteEvents = `
    query MyQuery {
      events(
        where: {account_address: {_eq: "${CASINO_EVENTS_ADDRESS}"}, type: {_like: "${CASINO_ADDRESS}::casino::${eventName}"}}
        order_by: {transaction_version: desc}
        limit: 1
      ) {
        data
        event_index
        transaction_version
        type
        transaction_block_height
        sequence_number
      }
    }
    `;

    const response: any = await aptosProvider.queryIndexer({
      query: rouletteEvents,
    });
    return response.events;
  }

  const viewRequest = async (payload: { function: string; type_arguments: string[]; arguments: any[] }) => {
    if (!aptosAccount || !aptosClient) {
      toast.error("not logged in");
      return;
    }
    try {
      const res = await aptosClient.view(payload);
      return res;
    } catch (error) {
      console.error(error);
      return error as string;
    }
  };

  const sendTransaction = async (payload: {
    type?: string;
    function: string;
    type_arguments: string[];
    arguments: any[];
  }) => {
    if (!aptosAccount || !aptosClient) {
      toast.error("not logged in");
      return;
    }
    try {
      const txnRequest = await aptosClient.generateTransaction(aptosAccount.address(), payload);
      const signedTxn = await aptosClient.signTransaction(aptosAccount, txnRequest);
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
      console.log(transactionRes);
      return transactionRes.payload;
    } catch (error) {
      console.error(error);
      toast(`error while submitting transaction: ${unknwonErrorToString(error)}`, {
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
      return error as string;
    }
  };

  return { getAirdrop, sendTransaction, viewRequest, requestEvents, getRouletteEvents };
};
