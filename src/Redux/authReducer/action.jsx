import axios from "axios"
import { POST_LOGIN_FAILURE, POST_LOGIN_REQ, POST_LOGIN_SUCCESS, POST_LOGOUT_REQ, SAVE_USER_DATA } from "./actionTypes"

export const postLogin=(data)=>(dispatch)=>{
   dispatch({type:POST_LOGIN_REQ})
   return axios.post(`https://erin-tasty-barnacle.cyclic.app/users/login`,{
    email:data.email,
    password:data.password
   })
   .then((res)=>{
    if(res.data.msg==='Login Successfull'){
        console.log(res.data)
         localStorage.setItem('rentaride',true)
         let data=JSON.stringify(res.data.user)
         localStorage.setItem('user',data)
         localStorage.setItem('rentaridecity',res.data.user.city)
         dispatch(saveUserData({data}))
        dispatch({type:POST_LOGIN_SUCCESS,payload:res.data.user})
    }
    else{
        localStorage.setItem('rentaride',false)
        console.log("Error")
        dispatch({type:POST_LOGIN_FAILURE,payload:{msg:"Wrong Credentials"}})
    }
   })
   .catch((err)=>{
    console.log(err)
     localStorage.setItem('rentaride',false)
     dispatch({type:POST_LOGIN_FAILURE,payload:{msg:err}})
   })
}
export const postLogout=(data)=>(dispatch)=>{
    localStorage.removeItem('user')
    localStorage.removeItem('rentaridecity')
    localStorage.removeItem('rentaridedate')
    localStorage.removeItem('rentaridesinglecar')
    localStorage.removeItem('rentaridestartdate')
    localStorage.removeItem('rentarideenddate')
    localStorage.removeItem('startenddates')
    localStorage.setItem('rentaride',false)
    dispatch({type:POST_LOGOUT_REQ})
}
export const saveUserData=(data)=>(dispatch)=>{
    console.log(data)
     dispatch({type:SAVE_USER_DATA,payload:data})
}
