const INIT_STATE = {
    keycloak: null,
    openid:null,
  };

  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case "SET_KEYCLOAK": {
        return {
          ...state,
          keycloak: action.payload,
        };
      }
      case "SET_OPENID": {
        return {
          ...state,
          openid: action.payload,
        };
      }

      default:
        return state;
    }
  };
