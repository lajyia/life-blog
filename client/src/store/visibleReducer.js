
const stateDefault = {
    visible: false
}


const TRUE_VISIBLE = "TRUE_VISIBLE";
const FALSE_VISIBLE = "FALSE_VISIBLE";


export const visibleReducer = (state = stateDefault, action) =>{
    switch(action.type){
        case TRUE_VISIBLE:
            return {...state, visible: true}
        case FALSE_VISIBLE:
            return {...state, visible: false}
        default:
            return state
    }
}



export const trueVisibleAction = (payload) => ({type: TRUE_VISIBLE, payload});
export const falseVisibleAction = (payload) => ({type: FALSE_VISIBLE, payload});