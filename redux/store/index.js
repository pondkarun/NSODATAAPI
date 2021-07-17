import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import { setAccessToken } from "../../util/Utility";
import { GetAPIkeyCloak } from '../../service/API';
import {SET_KEY_CLOAK,SET_OPENID} from '../actions';
import { Cookies } from 'react-cookie'


const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    bindMiddleware([thunk])
  );
  let currentState = store.getState();
  const cookies = new Cookies();
  const openidcookie = cookies.get('openid');
  // console.log('openidcookie :>> ', openidcookie);
  if(openidcookie){
    store.dispatch(SET_OPENID(openidcookie));

  }
  GetAPIkeyCloak().then(async(data) => {
    console.log('datainstore :>> ', data);
    store.dispatch(SET_KEY_CLOAK(data));
    setAccessToken(JSON.stringify(data.token));

  }).catch((error) => {
    console.log('error :>> ', error);
  })
  store.subscribe(() => {
    // keep track of the previous and current state to compare changesAppLayout/index.j
    let previousState = currentState;
    currentState = store.getState();
    // console.log('currentState :>> ', currentState, previousState);
    // if the token changes set the value in localStorage and axios headers
    if (previousState.auth.keycloak&&previousState.auth.keycloak.token !== currentState.auth.keycloak.token) {
      const token = currentState.auth.keycloak.token;
      console.log('tokenstore :>> ', token);
      setAccessToken(token);
    }
  });
  return store;
}

export default configureStore;