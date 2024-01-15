import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const PrivateRoutes = ({children}) => {
    const location=useLocation()
    const auth=localStorage.getItem('rentaride')
  return (
     auth=='true' ? children : <Navigate state={location.pathname} to={'/login'} replace={true}/>
  )
}