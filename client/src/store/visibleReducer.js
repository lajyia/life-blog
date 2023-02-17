
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



export const trueVisibleAction = () => ({type: TRUE_VISIBLE});
export const falseVisibleAction = () => ({type: FALSE_VISIBLE});