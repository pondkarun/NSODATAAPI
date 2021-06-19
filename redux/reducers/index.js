import { combineReducers } from "redux";
import Auth from "./Auth";
import Menu from "./Menu";


const reducers = combineReducers({
  auth: Auth,
  menu: Menu
});

export default reducers;