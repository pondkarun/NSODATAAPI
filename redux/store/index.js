import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import { setAccessToken } from "../../util/Utility";
import { GetAPIkeyCloak } from '../../service/API';
import {SET_KEY_CLOAK} from '../actions';


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
  GetAPIkeyCloak().then((data) => {
    console.log('data :>> ', data);
    store.dispatch(SET_KEY_CLOAK(data));
  }).catch((error) => {
    console.log('error :>> ', error);
  })
  store.subscribe(() => {
    // keep track of the previous and current state to compare changesAppLayout/index.j
    let previousState = currentState;
    currentState = store.getState();
    console.log('currentState :>> ', currentState, previousState);
    // if the token changes set the value in localStorage and axios headers
    if (previousState.auth.keycloak?.token !== currentState.auth.keycloak.token) {
      const token = currentState.auth.keycloak.token;
      setAccessToken(token);
    }
  });
  return store;
}

export default configureStore;