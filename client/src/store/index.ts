import { combineReducers } from "redux";
import { createStore } from "redux";
import { visibleReducer } from "./visibleReducer";
import { visibleNotificationReducer } from "./visibleNotification";

export type IRootState = ReturnType<typeof rootStore>

const rootStore = combineReducers({
    visible: visibleReducer,
    visibleNotification: visibleNotificationReducer,
})


export const store = createStore(rootStore);