import '../styles/globals.css'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper';
import initStore from '../redux/store';
import { Provider } from "react-redux";

function MyApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default withRedux(initStore)(MyApp)
