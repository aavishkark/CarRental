import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SAVE_SINGLE_CAR } from '../../Redux/carsReducer/actionTypes'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { saveUserData } from '../../Redux/authReducer/action'
const Likes = () => {
  const user=JSON.parse(localStorage.getItem('user'))
  const [fav,setfav]=useState([])
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [selectedCar, setSelectedCar] = useState(null);
  useEffect(()=>{
  axios.get(`https://erin-tasty-barnacle.cyclic.app/users/singleuser/${user._id}`)
  .then((res)=>{
    axios.get(`https://erin-tasty-barnacle.cyclic.app/cars/getlikes`,{headers:{"hello":res.data.user.favourite}})
    .then((res)=>{
      setfav(res.data.cars)
    })
    .catch((err)=>{
      console.log(err)
    })
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
  //console.log(car._id)
  user.favourite.forEach((e)=>{
      if(e!=car._id){
        filteredlikes.push(e)
      }
  })
   axios.patch(`https://erin-tasty-barnacle.cyclic.app/users/update/${user._id}`,
   {favourite:filteredlikes})
   .then((res)=>{
    dispatch(saveUserData(res.data.user))
    console.log(res.data.user.favourite)
    setfav(res.data.user.favourite)
   })
   .catch((err)=>{
    console.log(err)
   })
  }
 // console.log(user)
  return (
    <div>
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
                      <strong>Price:</strong> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating}
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
    </Grid>
    </div>
  )
}

export default Likes