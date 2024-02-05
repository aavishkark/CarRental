import React, { useEffect, useState } from 'react'
import {
    Box,
    Container,
    Avatar,
    Heading,
    Text,
    VStack,
    Grid,
    GridItem,
    Divider,
  } from '@chakra-ui/react';
import axios from 'axios';
import { FaRupeeSign } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import { Icon } from '@chakra-ui/react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
const Profile = () => {
   const toast = useToast();
    const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')))
    const [likes,setlikes]=useState([])
    const [active,setactives]=useState([])
    const [dates,setdates]=useState([])
    const [past,setpast]=useState([])
    useEffect(()=>{
        axios.get(`https://charming-deer-sari.cyclic.app/users/singleuser/${user._id}`)
        .then((res)=>{
          let activecars=[]
          let activedates=[]
          let pastrides=[]
          res.data.user.activeRides.forEach((e)=>{
            activecars.push(e.car)
            activedates.push([e.start,e.end])
          })
          res.data.user.pastRides.forEach((e)=>{
            pastrides.push(e)
          })
          setpast(pastrides)
          setdates(activedates)
          setactives(activecars)
        if(res.data.user.favourite.length>0){
      axios.get(`https://charming-deer-sari.cyclic.app/cars/getlikes`,
        {headers:{"hello":res.data.user.favourite}})
        .then((res)=>{
          console.log(res.data)
          setlikes(res.data.cars)
        })
        .catch((err)=>{
          console.log(err)
        })
        }
        else{
          setlikes([])
        }
        
        })
        .catch((err)=>{
          console.log(err)
        })
    },[])
    const handleCancel=(car)=>{
      const filteredrides=[]
      active.forEach((e)=>{
        if(car._id!=e._id){
          filteredrides.push(e)
        }
      })
      axios.patch(`https://charming-deer-sari.cyclic.app/users/update/${user._id}`,
      {activeRides:filteredrides})
      .then((res)=>{
        toast({
          title: 'Cancellation Successfull',
          description: "Your ride is Successfully Canceled",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
         setactives(res.data.user.activeRides)
     })
     .catch((err)=>{
      console.log(err)
     })
    }

  return (
user?<Container maxW="container.lg" mt={8}>
<Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={4}>
  <GridItem colSpan={{ base: 'auto', md: 1 }} display={"flex"} alignSelf={"start"}>
    <Avatar size="2xl" name={user.username} src="https://placekitten.com/200/200" />
  </GridItem>
  <GridItem colSpan={{ base: 'auto', md: 2 }}>
    <VStack align="start" spacing={4}>
      <Text>
        Name: {user.username}
      </Text>
      <Text>Email: {user.email}</Text>
      <Text>City: {user.city}</Text>
    </VStack>
  </GridItem>
</Grid>
<Divider my={8} />
<Box textAlign={"start"}>
  <Heading as="h2" size="lg" mb={4}>
    Past Rides
  </Heading>
  {past.length>0 ? (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }} gap={4}>
      {past.map((car, index) => (
        //  console.log(car)
           <GridItem key={index} >
           <div key={car.car.name} className="col mb-4">
                     <div className="card h-100">
                     <div className="card-body">
                       <img src={car.car.photos} alt={car.car.name} className='card-img-top cardimg' />
                   <div className='card-body cardinfo'>
                     <p className='card-text'>
                       <strong>City:</strong> {car.car.city}
                     </p>
                     <p className='card-text'>
                       <strong>Car:</strong> {car.car.name}
                     </p>
                     <p className='card-text'>
                     <strong>Price:</strong> <Icon as={FaRupeeSign} color="green.500" boxSize={4} /> {car.car.pricePerDay}/Day
                     </p>
                     <p className='card-text'>
                     <strong>Rating:</strong> {car.car.rating} <Icon as={StarIcon} color="yellow.400" boxSize={4} />
                     </p>
                     <p className='card-text'>
                     <strong>Start:</strong> {car.start}
                     </p>
                     <p className='card-text'>
                     <strong>End:</strong> {car.end}
                     </p>
                   </div>
                       </div>
                     </div>
                   </div>
         </GridItem>
      ))}
      </Grid>
  ) : (
    <Alert status='info'>
    <AlertIcon />
    <AlertTitle>Empty</AlertTitle>
    <AlertDescription>You dont have any past rides</AlertDescription>
  </Alert>
  )}
</Box>
<Divider my={8} />
<Box textAlign={"start"}>
  <Heading as="h2" size="lg" mb={4}>
    Active Rides
  </Heading>
  {active.length>0 ? (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }} gap={4}>
      {active.map((car, index) => (
       //console.log(car)
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
                     <p className='card-text'>
                     <strong>Start:</strong> {dates[index][0]}
                     </p>
                     <p className='card-text'>
                     <strong>End:</strong> {dates[index][1]}
                     </p>
                     <button onClick={()=>{handleCancel(car)}} style={{backgroundColor:"black",borderRadius:"10px",padding:"10px",color:"white"}}>Cancel Ride</button>
                   </div>
                       </div>
                     </div>
                   </div>
         </GridItem>
      ))}
      </Grid>
  ) : (
    <Alert status='info'>
    <AlertIcon />
    <AlertTitle>Empty</AlertTitle>
    <AlertDescription>You dont have any active rides</AlertDescription>
  </Alert>
  )}
</Box>
<Divider my={8} />
<Box textAlign={"start"} mb={"5%"}>
  <Heading as="h2" size="lg" mb={4}>
    Your Likes
  </Heading>
  {likes.length > 0 ? 
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }} gap={4}>
      {likes&&likes.length>0&&likes.map((car, index) => (
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
                </div>
                    </div>
                  </div>
                </div>
      </GridItem>
      ))}
   </Grid>
   : (
    <Alert status='info'>
    <AlertIcon />
    <AlertTitle>Empty</AlertTitle>
    <AlertDescription>You dont have any favourite rides</AlertDescription>
  </Alert>
  )}
</Box>
</Container>:"Nothing Here"
  )
}

export default Profile