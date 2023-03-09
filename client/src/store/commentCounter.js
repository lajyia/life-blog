const stateDefault = {
    counter: 0  
}

const INCREMENT_COMMENT = "INCREMENT_COMMENT";
const DECREMENT_COMMENT = "DECREMENT_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";


export const commentCounter = (state = stateDefault, action) =>{
    switch(action.type){
        case INCREMENT_COMMENT:
            return {...state, counter: state.counter + 1}
        case DECREMENT_COMMENT:
            return {...state, counter: state.counter - 1}
        case UPDATE_COMMENT:
            return {...state, counter: action.payload}
        default:
            return state
    }
}


export const incrementCommentCounterAction = () => ({type: INCREMENT_COMMENT});
export const decrementCommentCounterAction = () => ({type: DECREMENT_COMMENT});
export const updateCommentCounterAction = (payload) => ({type: UPDATE_COMMENT, payload});