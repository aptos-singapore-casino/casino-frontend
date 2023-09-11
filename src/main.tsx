import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DialogProvider } from "./contexts/dialogContext.tsx";
import { GlobalContextProvider } from "./contexts/globalContext.tsx";
import { AppRouter } from "./routers/app.router.tsx";
import { defaultTheme } from "./theme.ts";

import "@fontsource-variable/inter";
import "react-toastify/dist/ReactToastify.css";
import { Web3AuthContextProvider } from "./contexts/web3AuthContext.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider theme={defaultTheme} defaultMode="dark">
      <GlobalContextProvider>
        <QueryClientProvider client={queryClient}>
          <DialogProvider>
            <CssBaseline />
            <ToastContainer theme="dark" position="bottom-right" />
            <Web3AuthContextProvider>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </Web3AuthContextProvider>
          </DialogProvider>
        </QueryClientProvider>
      </GlobalContextProvider>
    </CssVarsProvider>
  </React.StrictMode>
);
