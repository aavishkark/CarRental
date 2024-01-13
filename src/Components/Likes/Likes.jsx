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
  const [error,seterror]=useState(false)
  const [length,setlength]=useState()
  const user=JSON.parse(localStorage.getItem('user'))
  const [fav,setfav]=useState([])
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [selectedCar, setSelectedCar] = useState(null);
  useEffect(()=>{
  axios.get(`https://dark-jade-mite-robe.cyclic.app/users/singleuser/${user._id}`)
  .then((res)=>{
    if(res.data.user.favourite.length!=0){
      axios.get(`https://dark-jade-mite-robe.cyclic.app/cars/getlikes`,{headers:{"hello":res.data.user.favourite}})
      .then((res)=>{
        setfav(res.data.cars)
        setloading(false)
        seterror(false)
      })
      .catch((err)=>{
        setloading(false)
        seterror(true)
        console.log(err)
      })
    }
    else{
      setloading(false)
      setlength(true)
    }
  })
  .catch((err)=>{
    setloading(false)
    seterror(true)
    console.log(err)
  })
  },[user])
  const handleCardClick = (car) => {
    setSelectedCar(car);
    dispatch({type:SAVE_SINGLE_CAR,payload:car})
    localStorage.setItem('rentaridesinglecar',JSON.stringify(car))
    navigate('/singlecar')
  };
  const handleRemove=(car)=>{
    setloading(true)
  const filteredlikes=[]
  console.log(car._id)
  console.log(user.favourite)
  user.favourite.forEach((e)=>{
      if(e!=car._id){
        filteredlikes.push(e)
      }
  })
   
   axios.patch(`https://dark-jade-mite-robe.cyclic.app/users/update/${user._id}`,
   {favourite:filteredlikes})
   .then((res)=>{
    setloading(false)
    seterror(false)
    if(res.data.user.favourite.length){
     setlength(true)
    }
    dispatch(saveUserData(res.data.user))
    setfav(res.data.user.favourite)
   })
   .catch((err)=>{
    setloading(false)
    seterror(true)
    console.log(err)
   })
  }
  return (
    <div style={{margin:"5%"}}>
      {loading?<Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
</Box>: <div>
  {length&&!error?<div style={{fontSize:"75px",margin:"50px",width:"100%",display:"flex",justifyContent:"center",fontFamily:"monospace"}}><WarningIcon/>You Dont Have any favourites yet</div>:
  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }} gap={4}>
  {fav&&fav.map((car,index) => (
        <GridItem key={car.id} >
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