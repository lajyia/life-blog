
const stateDefault = {
    comment: {},
}

const ADD_COMMENT = "ADD_COMMENT";
const NULL_COMMENT = "NULL_COMMENT";

export const commentReducer = (state = stateDefault, action) =>{
    switch(action.type){
        case ADD_COMMENT:
            return {...state, comment: action.payload}
        case NULL_COMMENT:
            return {...state, comment: {}}
        default:
            return state
    }
}

export const addCommentAction = (payload) =>({type: ADD_COMMENT, payload});
export const nullCommentAction = () => ({type: NULL_COMMENT});