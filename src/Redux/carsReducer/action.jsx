import axios from "axios"
import { GET_CARS_BY_CITY, GET_CARS_FAIL, GET_CARS_REQ, GET_CARS_SUCCESS } from "./actionTypes"

export const getCars=(data)=>(dispatch)=>{
    dispatch({type:GET_CARS_REQ})
    axios.get(`https://mock-server-rentride.onrender.com/cars`)
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
      finalParams._sort="pricePerDay"
      finalParams._order=data.pricesort
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
      finalParams._sort="pricePerDay"
      finalParams._order=data.pricesort
   }
   dispatch({type:GET_CARS_REQ})
   axios.get(`https://mock-server-rentride.onrender.com/cars`,
   {params: finalParams})
   .then((res)=>{
      dispatch({type:GET_CARS_BY_CITY,payload:res.data})
   })
   .catch((err)=>{
      dispatch({type:GET_CARS_FAIL})
      console.log(err)
   })
}