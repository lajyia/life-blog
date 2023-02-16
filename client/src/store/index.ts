import { combineReducers } from "redux";
import { createStore } from "redux";
import { visibleReducer } from "./visibleReducer";

export type IRootState = ReturnType<typeof rootStore>

const rootStore = combineReducers({
    visible: visibleReducer
})


export const store = createStore(rootStore);