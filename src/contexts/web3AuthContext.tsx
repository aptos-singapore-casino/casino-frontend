import { CHAIN_NAMESPACES, SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { AptosAccount, AptosClient } from "aptos";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AptosRpc from "../utils/aptosRPC";
import { APTOS_NODE_URL, APTOS_RPC_URL } from "../utils/constants";

interface Web3AuthContextType {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  provider?: SafeEventEmitterProvider;
  userInfo: Partial<UserInfo> | undefined;
  isLoading: boolean;
  address?: string;
  balance?: number;
  aptosAccount?: AptosAccount;
  aptosClient?: AptosClient;
  refetchInfo: () => Promise<void>;
}

const initialState = {
  login: async () => {},
  logout: async () => {},
  provider: undefined,
  userInfo: undefined,
  isLoading: false,
  refetchInfo: async () => {},
};

const Web3AuthContext = createContext<Web3AuthContextType>(initialState);

export const Web3AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth>();
  const [provider, setProvider] = useState<SafeEventEmitterProvider>();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>();
  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState<number>(0);
  const [aptosAccount, setAptosAccount] = useState<AptosAccount>();
  const [aptosClient, setAptosClient] = useState<AptosClient>();

  const updateUserInfo = async (web3auth: Web3Auth, web3authProvider: SafeEventEmitterProvider | null) => {
    if (!web3authProvider) web3authProvider = await web3auth.connect();
    if (!web3authProvider) {
      toast.error("web3authProvider not found");
      return;
    }

    const rpc = new AptosRpc(web3authProvider);
    setAddress((await rpc.getAccounts()).hexString);
    const balance = await rpc.getBalance();
    setBalance(balance && typeof balance === "number" ? balance : 0);

    setUserInfo(await web3auth.getUserInfo());

    const key: any = await web3authProvider.request({
      method: "private_key",
    });

    if (!key) return undefined;

    const privateKeyUint8Array = new Uint8Array(key.match(/.{1,2}/g)!.map((byte: any) => parseInt(byte, 16)));
    setAptosAccount(new AptosAccount(privateKeyUint8Array));
    setAptosClient(new AptosClient(APTOS_NODE_URL));
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const web3auth = new Web3Auth({
          clientId: "BEsU2mh3zqlrwVG8JkFsUvcfM0memwEhNWoj8TyCk5dvsarHa17xW414wwjDxpA_sOaodXLDKP56EtDbZBUCxwU",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.OTHER,
            chainId: "1",
            rpcTarget: APTOS_RPC_URL, // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          uiConfig: {
            theme: "dark",
            defaultLanguage: "en",
            appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
          },
          web3AuthNetwork: "testnet",
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();
        if (web3auth.connected) {
          updateUserInfo(web3auth, web3auth.provider);
          setProvider(web3auth.provider || undefined);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      toast.error("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    if (!web3authProvider) {
      toast.error("web3authProvider not found");
      return;
    }
    setProvider(web3authProvider);
    setUserInfo(await web3auth.getUserInfo());
    updateUserInfo(web3auth, web3authProvider);
  };

  const logout = async () => {
    if (!web3auth) {
      toast.error("not logged in");
      return;
    }
    await web3auth.logout();
    setProvider(undefined);
    setUserInfo(undefined);
  };

  const refetch = async () => {
    if (!web3auth || !provider) {
      toast.error("not logged in");
      return;
    }
    updateUserInfo(web3auth, provider);
  };

  const value = {
    login,
    provider,
    userInfo,
    isLoading,
    logout,
    balance,
    address,
    aptosAccount,
    aptosClient,
    refetchInfo: refetch,
  };

  return <Web3AuthContext.Provider value={value}>{children}</Web3AuthContext.Provider>;
};

export const useWeb3Auth = () => {
  return useContext(Web3AuthContext);
};
