import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./authReducer/reducer";
import { thunk } from "redux-thunk";
import { carsReducer } from "./carsReducer/reducer";
const rootreducer=combineReducers({
    authReducer,
    carsReducer
})
export const store=legacy_createStore(rootreducer,applyMiddleware(thunk))