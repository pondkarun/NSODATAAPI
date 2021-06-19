const INIT_STATE = {
    munu: null,
  };

  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case "SETMENU": {
        return {
          ...state,
          munu: action.payload,
        };
      }

      default:
        return state;
    }
  };