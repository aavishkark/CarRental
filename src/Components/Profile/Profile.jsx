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
const Profile = () => {
    const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')))
    const [likes,setlikes]=useState()
    useEffect(()=>{
        axios.get(`https://dark-jade-mite-robe.cyclic.app/cars/getlikes`,
        {headers:{"hello":user.favourite}})
        .then((res)=>{
          console.log(res.data.cars)
          setlikes(res.data.cars)
        })
        .catch((err)=>{
          console.log(err)
        }) 
    },[])
    console.log(user,likes)
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
  {user.pastRides.length > 0 ? (
    <ul>
      {user.pastRides.map((ride, index) => (
        <li key={index}>{ride}</li>
      ))}
    </ul>
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
  {user.activeRides.length > 0 ? (
    <ul>
      {user.activeRides.map((ride, index) => (
        <li key={index}>{ride}</li>
      ))}
    </ul>
  ) : (
    <Alert status='info'>
    <AlertIcon />
    <AlertTitle>Empty</AlertTitle>
    <AlertDescription>You dont have any active rides</AlertDescription>
  </Alert>
  )}
</Box>
<Divider my={8} />
<Box textAlign={"start"}>
  <Heading as="h2" size="lg" mb={4}>
    Your Likes
  </Heading>
  {user.favourite.length > 0 ? 
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
    <Text>You havent liked any ride yet.</Text>
  )}
</Box>
</Container>:"Nothing Here"
  )
}

export default Profile