import {combineReducers,applyMiddleware} from "redux";
import { legacy_createStore as createStore} from 'redux' ;
import thunk from "redux-thunk";
import reducer from "./reducers";

const rootReducer = combineReducers({reducer});
export const Store = createStore(rootReducer,applyMiddleware(thunk));
