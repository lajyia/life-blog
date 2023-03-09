import { combineReducers } from "redux";
import { createStore } from "redux";
import { visibleReducer } from "./visibleReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { commentReducer } from "./commentReducer";
import { commentCounter } from "./commentCounter";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

export type IRootState = ReturnType<typeof rootStore>

const rootStore = combineReducers({
    login: loginReducer,
    visible: visibleReducer,
    user: userReducer,
    comment: commentReducer,
    counter: commentCounter
})

export type AppDispatch = typeof store.dispatch;


export const store = createStore(rootStore, composeWithDevTools(applyMiddleware(thunk)));