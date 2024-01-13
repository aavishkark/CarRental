import axios from "axios"
import { GET_CARS_BY_CITY, GET_CARS_FAIL, GET_CARS_REQ, GET_CARS_SUCCESS } from "./actionTypes"
export const getCars=(data)=>(dispatch)=>{
    dispatch({type:GET_CARS_REQ})
    axios.get(`https://dark-jade-mite-robe.cyclic.app/cars/allcars`)
     .then((res)=>{
        dispatch({type:GET_CARS_SUCCESS,payload:res.data})
     })
     .catch((err)=>{
        dispatch({type:GET_CARS_FAIL})
        console.log(err)
     })
}
export const getCarsByCity=(data)=>(dispatch)=>{
   const finalParams = {}
   finalParams.city=data.city
   if(data.pricesort!=null &&  data.typeesort==null){
      finalParams.order=data.pricesort
   }
   else if(data.pricesort==null &&  data.typeesort!=null){
      if(data.typeesort!="ALL"){
         finalParams.type2=data.typeesort
      } 
   }
   else if(data.pricesort!=null &&  data.typeesort!=null){
      if(data.typeesort!="ALL"){
         finalParams.type2=data.typeesort
      }
      finalParams.order=data.pricesort
   }
   dispatch({type:GET_CARS_REQ})
   axios.get(`https://dark-jade-mite-robe.cyclic.app/cars/filtercars`,
   {headers:finalParams})
   .then((res)=>{
      dispatch({type:GET_CARS_BY_CITY,payload:res.data})
   })
   .catch((err)=>{
      dispatch({type:GET_CARS_FAIL})
      console.log(err)
   })
}

export const addCarToLikes=(data)=>(dispatch)=>{
    axios.get(`https://dark-jade-mite-robe.cyclic.app/users/singleuser/${data.user._id}`)
    .then((res)=>{
      const fav=res.data.user.favourite
      let flag=false
      fav.forEach((e)=>{
         if(e==data.car._id){
          flag=true
         } 
      })
      if(!flag){
         fav.push(data.car._id)
         axios.patch(`https://dark-jade-mite-robe.cyclic.app/users/update/${data.user._id}`,{favourite:fav})
         .then((res)=>{
            console.log(res)
         })
         .catch((err)=>{
            console.log(err)
         })
      }
    })
    .catch((err)=>{
      console.log(err)
    })
}