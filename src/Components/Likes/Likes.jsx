import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SAVE_SINGLE_CAR } from '../../Redux/carsReducer/actionTypes'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import { saveUserData } from '../../Redux/authReducer/action'
import { FaRupeeSign } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import { Icon } from '@chakra-ui/react';
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
const Likes = () => {
  const [loading,setloading]=useState(true)
  const [flag,setflag]=useState(false)
  const [error,seterror]=useState(false)
  const [length,setlength]=useState()
  const [userid,setuserid]=useState(localStorage.getItem('userid'))
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')))
  const [fav,setfav]=useState([])
  const [cars,setcars]=useState([])
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [selectedCar, setSelectedCar] = useState(null);
  useEffect(()=>{
  //  console.log(userid)
    axios.get(`https://charming-deer-sari.cyclic.app/users/singleuser/${userid}`)
    .then((res)=>{
     // console.log(res,"useeffect",1)
      setfav(res.data.user.favourite)
      axios.get(`https://charming-deer-sari.cyclic.app/cars/getlikes`,{headers:{"hello":res.data.user.favourite}})
      .then((res)=>{
       // console.log(res,"useEffect",2)
        setcars(res.data.cars)
     })
     .catch((err)=>{
       setloading(false)
       seterror(true)
       console.log(err)
     })
      setloading(false)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  const handleCardClick = (car) => {
    setSelectedCar(car);
    dispatch({type:SAVE_SINGLE_CAR,payload:car})
    localStorage.setItem('rentaridesinglecar',JSON.stringify(car))
    navigate('/singlecar')
  };
  const handleRemove=(car)=>{
   const filteredlikes=[]
   fav.forEach((e)=>{
       if(e!=car._id){
         filteredlikes.push(e)
       }
   })
   setfav(filteredlikes)
   if(filteredlikes.length!=0){
    axios.patch(`https://charming-deer-sari.cyclic.app/users/update/${user._id}`,
    {favourite:filteredlikes})
    .then((res)=>{
    //  console.log(res,filteredlikes,"remove")
      axios.get(`https://charming-deer-sari.cyclic.app/cars/getlikes`,{headers:{"hello":res.data.user.favourite}})
      .then((res)=>{
       // console.log(res,3)
        setcars(res.data.cars)
     })
     .catch((err)=>{
       setloading(false)
       seterror(true)
       console.log(err)
     })
   })
   .catch((err)=>{
    console.log(err)
   })
   }
   else{
    axios.patch(`https://charming-deer-sari.cyclic.app/users/update/${user._id}`,
    {favourite:filteredlikes})
    .then((res)=>{
     // console.log(res,filteredlikes,"remove")
   })
   .catch((err)=>{
    console.log(err)
   })
   }
    
  }
  return (
    <div style={{margin:"5%"}}>
      {loading?<Box paddingTop={"10%"} paddingBottom={"10%"} boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
</Box>: <div>
  {fav.length===0&&!error?<div key={12} style={{margin:"50px",width:"100%",display:"flex",justifyContent:"center",fontFamily:"monospace",height:"300px"}}><WarningIcon/>You Dont Have any favourites</div>:
  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }} key={12} gap={4}>
  {cars&&cars.map((car,index) => (
        <GridItem key={index} >
          <div key={car.name} className="col mb-4">
                    <div className="card h-100">
                    <div className="card-body">
                      <img src={car.photos} alt={car.name} className='card-img-top cardimg' />
                  <div className='card-body cardinfo'>
                    <p className='card-text'>
                      <strong>City:</strong> {car.city}
                    </p>
                    <p className='card-text'>
                      <strong>Car:</strong> {car.name}
                    </p>
                    <p className='card-text'>
                      <strong>Price:</strong> <Icon as={FaRupeeSign} color="green.500" boxSize={4} /> {car.pricePerDay}/Day
                      </p>
                      <p className='card-text'>
                      <strong>Rating:</strong> {car.rating} <Icon as={StarIcon} color="yellow.400" boxSize={4} />
                      </p>
                    <div style={{display:"flex",justifyContent:"space-between",margin:"auto",width:"90%"}}>
                      <button className='btn btn-primary bookbtn' onClick={() => handleCardClick(car)}>Book</button>
                      <button className='btn btn-primary bookbtn' onClick={() => handleRemove(car)}>Remove</button>
                    </div>           
                  </div>
                      </div>
                    </div>
                  </div>
        </GridItem>
      ))}
      </Grid>}
    </div>}
     {error?<Alert status='error'>
  <AlertIcon />
  <AlertTitle>Server Error</AlertTitle>
  <AlertDescription>Your Request could not be resolved, please try agian later</AlertDescription>
</Alert>:""}
    </div>
  )
}

export default Likes