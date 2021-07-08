const INIT_STATE = null

  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case "SETDATALIST": {
        return action.payload;
      }

      default:
        return state;
    }
  };