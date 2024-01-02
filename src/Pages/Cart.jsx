import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
    const user=useSelector((store)=>{return store.authReducer.user})
    const auth=useSelector((store)=>{return store.authReducer.isAuth})
    const city=localStorage.getItem('rentaridecity')
  return (
    <div>{`Cars In ${city}`}</div>
  )
}

export default Cart