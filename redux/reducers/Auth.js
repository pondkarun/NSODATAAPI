const INIT_STATE = {
    authUser: null,
    loadUser: true,
    token: null
  };

  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case "SET_TOKEN": {
        return {
          ...state,
          authUser: action.payload, token: false,
        };
      }

      default:
        return state;
    }
  };
