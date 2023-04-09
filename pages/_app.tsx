import { store } from '@/redux/store/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Dashboard from './dashboard/[slug]'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Dashboard>
        <Component {...pageProps} />
      </Dashboard>
    </Provider>
  )
}
