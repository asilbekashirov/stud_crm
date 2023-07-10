import store, { persistor } from "@/redux/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Dashboard from "./dashboard/[slug]";
import { PersistGate } from "redux-persist/integration/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<h1>Loading...</h1>}>
            <Dashboard>
              <Component {...pageProps} />
            </Dashboard>
          </PersistGate>
        </Provider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
