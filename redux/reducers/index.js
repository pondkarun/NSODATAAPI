import { combineReducers } from "redux";
import Auth from "./Auth";
import Menu from "./Menu";
import Datalist from './Datalist';


const reducers = combineReducers({
  auth: Auth,
  menu: Menu,
  datalist:Datalist,
});

export default reducers;