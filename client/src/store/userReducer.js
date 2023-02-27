const stateDefault = {
    user: {}
}


const ADD_USER = "ADD_USER";

export const userReducer = (state = stateDefault, action) =>{
    switch(action.type){
        case ADD_USER:
            return {...state, user: action.payload}
        default:
            return state
    }
}


export const addUserAction = (payload) =>({type: ADD_USER, payload})