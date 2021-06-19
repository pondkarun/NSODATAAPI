import '../styles/globals.css'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper';
import initStore from '../redux/store';
import { Provider } from "react-redux";
import AuthRoutes from "../util/AuthProvider";
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <AuthRoutes>
        <Component {...pageProps} />
      </AuthRoutes>
    </Provider>
  )
}

export default withRedux(initStore)(MyApp)
