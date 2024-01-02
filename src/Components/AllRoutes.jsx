import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Cart from '../Pages/Cart'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import { PrivateRoutes } from './PrivateRoutes'
import Profile from './Profile/Profile'
import Cars from './Cars/Cars'
import Likes from './Likes/Likes'
import SingleCar from './SingleCar/SingleCar'
import BillingPage from './Billing/BillingPage'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<PrivateRoutes><Cart/></PrivateRoutes>}></Route>
        <Route path='/cars' element={<PrivateRoutes><Cars/></PrivateRoutes>}></Route>
        <Route path='/likes' element={<PrivateRoutes><Likes/></PrivateRoutes>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<PrivateRoutes><SignUp/></PrivateRoutes>}></Route>
        <Route path='/profile' element={<PrivateRoutes><Profile/></PrivateRoutes>}></Route>
        <Route path='/singlecar' element={<PrivateRoutes><SingleCar/></PrivateRoutes>}></Route>
        <Route path='/billing' element={<PrivateRoutes><BillingPage/></PrivateRoutes>}></Route>
    </Routes>
  )
}

export default AllRoutes