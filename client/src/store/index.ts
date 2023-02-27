import { combineReducers } from "redux";
import { createStore } from "redux";
import { visibleReducer } from "./visibleReducer";
import { visibleNotificationReducer } from "./visibleNotification";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";

export type IRootState = ReturnType<typeof rootStore>

const rootStore = combineReducers({
    login: loginReducer,
    visible: visibleReducer,
    visibleNotification: visibleNotificationReducer,
    user: userReducer
})


export const store = createStore(rootStore);