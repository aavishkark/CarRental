import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
const BillingPrivateRoute = ({children}) => {
    const location=useLocation()
    const dates=JSON.parse(localStorage.getItem('rentaridebillinginfo'))
    const auth=localStorage.getItem('rentaride')
  return (
    auth=='true'&&dates!=undefined ? children : <Navigate state={location.pathname} to={'/'} replace={true}/>
  )
}

export default BillingPrivateRoute