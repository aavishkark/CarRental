import axios from "axios"
import { POST_LOGIN_FAILURE, POST_LOGIN_REQ, POST_LOGIN_SUCCESS, POST_LOGOUT_REQ, SAVE_USER_DATA } from "./actionTypes"
export const postLogin=(data)=>(dispatch)=>{
 
   dispatch({type:POST_LOGIN_REQ})
   return axios.post(`https://charming-deer-sari.cyclic.app/users/login`,{
    email:data.email,
    password:data.password
   })
   .then((res)=>{
    if(res.data.msg==='Login Successfull'){
         localStorage.setItem('rentaride',true)
         let data=JSON.stringify(res.data.user)
         localStorage.setItem('user',data)
         localStorage.setItem('userid',res.data.user._id)
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
    localStorage.removeItem('userid')
    localStorage.setItem('rentaride',false)
    dispatch({type:POST_LOGOUT_REQ})
}
export const saveUserData=(data)=>(dispatch)=>{
     dispatch({type:SAVE_USER_DATA,payload:data})
}
export const getUserData=(data)=>(dispatch)=>{
    const userid=localStorage.getItem('userid')
    axios.get(`https://charming-deer-sari.cyclic.app/users/${userid}`)
   .then((res)=>{
   // console.log(res)
   })
   .catch((err)=>{
    console.log(err)
   })
}
