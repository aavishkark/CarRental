import axios from "axios"
import { POST_LOGIN_FAILURE, POST_LOGIN_REQ, POST_LOGIN_SUCCESS, POST_LOGOUT_REQ, SAVE_USER_DATA } from "./actionTypes"

export const postLogin=(data)=>(dispatch)=>{
   dispatch({type:POST_LOGIN_REQ})
   return axios.get(`https://mock-server-rentride.onrender.com/users?email=${data.email}&password=${data.password}`)
   .then((res)=>{
    if(res.data.length===1){
        localStorage.setItem('rentaride',true)
        let data=JSON.stringify(res.data)
        localStorage.setItem('user',data)
        localStorage.setItem('rentaridecity',res.data[0].city)
        dispatch(saveUserData({data}))
        dispatch({type:POST_LOGIN_SUCCESS,payload:res.data})
    }
    else{
        localStorage.setItem('rentaride',false)
        console.log("Error")
        dispatch({type:POST_LOGIN_FAILURE,payload:{msg:"Wrong Credentials"}})
    }
   })
   .catch((err)=>{
     localStorage.setItem('rentaride',false)
     dispatch({type:POST_LOGIN_FAILURE,payload:{msg:err}})
   })
}
export const postLogout=(data)=>(dispatch)=>{
    localStorage.removeItem('user')
    localStorage.removeItem('rentaridecity')
    localStorage.setItem('rentaride',false)
    dispatch({type:POST_LOGOUT_REQ})
}
export const saveUserData=(data)=>(dispatch)=>{
     dispatch({type:SAVE_USER_DATA,payload:data})
}
