const stateDefault = {
    login: false
}

const TRUE_LOGIN = "TRUE_LOGIN";
const FALSE_LOGIN = "FALSE_LOGIN";


export const loginReducer = (state = stateDefault, action) =>{
    switch(action.type){
        case TRUE_LOGIN:
            return {...state, login: true}
        case FALSE_LOGIN:
            return {...state, login: false}
        default:
            return state 
    }
}


export const trueLoginAction = () => ({type: TRUE_LOGIN});
export const falseLoginAction = () => ({type: FALSE_LOGIN});