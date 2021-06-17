const INIT_STATE = {
    keycloak: null,
  };

  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case "SET_KEYCLOAK": {
        return {
          ...state,
          keycloak: action.payload,
        };
      }

      default:
        return state;
    }
  };
