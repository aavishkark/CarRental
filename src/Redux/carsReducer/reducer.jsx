import { GET_CARS_BY_CITY, GET_CARS_FAIL, GET_CARS_REQ, GET_CARS_SUCCESS, SAVE_SINGLE_CAR, SET_USER_CITY } from "./actionTypes"

const initialState={
  isLoading:false,
  isError:false,
  cars:[],
  city:"Mumbai",
  singleCar:{}
}
export const carsReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case GET_CARS_REQ:
            return {...state,isLoading:true}
        case GET_CARS_SUCCESS:
            return {...state,isLoading:false,cars:payload,isError:false}
        case GET_CARS_FAIL:
            return {...state,isLoading:false,isError:{msg:"Error In fetching data",isError:true}}
        case SET_USER_CITY:
            return {...state,city:payload}
        case GET_CARS_BY_CITY:
            return {...state,cars:payload}
        case SAVE_SINGLE_CAR:
            return {...state,singleCar:payload}
        default:
            return state
    }
}