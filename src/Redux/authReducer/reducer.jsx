import { POST_LOGIN_REQ, POST_LOGIN_SUCCESS, POST_LOGIN_FAILURE, SAVE_USER_DATA, POST_LOGOUT_REQ } from "./actionTypes"

const initialState={
    iAuth:false,
    isLoading:false,
    isError:false,
    errorMessage:"",
    user:{}
}
export const authReducer=(state=initialState,{type,payload})=>{
  switch(type){
    case POST_LOGIN_REQ:
        return {...state,isLoading:true}
    case POST_LOGIN_SUCCESS:
        return {...state,isLoading:false,isError:false,isAuth:true,user:payload}    
    case POST_LOGIN_FAILURE:
        return {...state,isLoading:false,isError:true,errorMessage:payload.msg}
    case SAVE_USER_DATA:
        return {...state,user:payload.user,isAuth:payload.auth}
    case POST_LOGOUT_REQ:
        return {...state,user:{},isAuth:false}
    default:
        return state
  }
}