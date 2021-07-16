import '../styles/globals.scss'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper';
import initStore from '../redux/store';
import { Provider } from "react-redux";
import AuthRoutes from "../util/AuthProvider";
import { ConfigProvider } from 'antd';
import thTH from 'antd/lib/locale/th_TH';

import 'antd/dist/antd.css';

function MyApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <ConfigProvider direction="ltr" locale={thTH} >
        <AuthRoutes>
          <Component {...pageProps} />
        </AuthRoutes>
      </ConfigProvider>
    </Provider>
  )
}

export default withRedux(initStore)(MyApp)
