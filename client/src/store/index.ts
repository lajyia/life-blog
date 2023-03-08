import { combineReducers } from "redux";
import { createStore } from "redux";
import { visibleReducer } from "./visibleReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { commentReducer } from "./commentReducer";

export type IRootState = ReturnType<typeof rootStore>

const rootStore = combineReducers({
    login: loginReducer,
    visible: visibleReducer,
    user: userReducer,
    comment: commentReducer
})


export const store = createStore(rootStore);