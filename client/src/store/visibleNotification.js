const stateDefault = {
    visible: false
}

const TRUE_VISIBLE_NOTIFICATION = "TRUE_VISIBLE_NOTIFICATION";
const FALSE_VISIBLE_NOTIFICATION = "FALSE_VISIBLE_NOTIFICATION";


export const visibleNotificationReducer = (state = stateDefault ,action) =>{
    switch(action.type){
        case TRUE_VISIBLE_NOTIFICATION:
            return {...state, visible: true}
        case FALSE_VISIBLE_NOTIFICATION:
            return {...state, visible: false}
        default: 
            return state
    }
}


export const trueVisibleNotificationAction = () => ({type: TRUE_VISIBLE_NOTIFICATION});
export const falseVisibleNotificationAction = () => ({type: FALSE_VISIBLE_NOTIFICATION});