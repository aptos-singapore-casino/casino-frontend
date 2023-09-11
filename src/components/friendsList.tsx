import { Card } from "@mui/joy";
import { createContext, FC, ReactNode, useContext } from "react";

interface FriendsListContext {}

const initialState = {};

const GlobalContext = createContext<FriendsListContext>(initialState);

export const FriendsListContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const value = {};

  return (
    <GlobalContext.Provider value={value}>
      <Card sx={{ position: "absolute", minHeight: "200px", minWidth: "300px" }}></Card>
      {children}
    </GlobalContext.Provider>
  );
};

export const useFriendsListContext = () => {
  return useContext(GlobalContext);
};
