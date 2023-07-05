import store, { persistor } from "@/redux/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Dashboard from "./dashboard/[slug]";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<h1>Loading...</h1>}>
          <Dashboard>
            <Component {...pageProps} />
          </Dashboard>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
