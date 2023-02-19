import { combineReducers } from "redux";
import { createStore } from "redux";
import { visibleReducer } from "./visibleReducer";
import { visibleNotificationReducer } from "./visibleNotification";
import { loginReducer } from "./loginReducer";

export type IRootState = ReturnType<typeof rootStore>

const rootStore = combineReducers({
    login: loginReducer,
    visible: visibleReducer,
    visibleNotification: visibleNotificationReducer,
})


export const store = createStore(rootStore);