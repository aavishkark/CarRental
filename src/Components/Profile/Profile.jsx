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
const Profile = () => {
    const [user,setuser]=useState()
    useEffect(()=>{
        const user1=JSON.parse(localStorage.getItem('user'))
        console.log(user1)
        setuser(user1[0])
    },[])
  return (
user?<Container maxW="container.lg" mt={8}>
<Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={4}>
  <GridItem colSpan={{ base: 'auto', md: 1 }}>
    <Avatar size="2xl" name={user.username} src="https://placekitten.com/200/200" />
  </GridItem>
  <GridItem colSpan={{ base: 'auto', md: 2 }}>
    <VStack align="start" spacing={4}>
      <Heading as="h1" size="xl">
        {user.username}
      </Heading>
      <Text>Email: {user.email}</Text>
      <Text>City: {user.city}</Text>
    </VStack>
  </GridItem>
</Grid>

<Divider my={8} />

<Box>
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
    <Text>No past rides available.</Text>
  )}
</Box>
<Box>
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
    <Text>No Active rides.</Text>
  )}
</Box>
<Box>
  <Heading as="h2" size="lg" mb={4}>
    Your Likes
  </Heading>
  {user.cart.length > 0 ? (
    <ul>
      {user.cart.map((ride, index) => (
        <li key={index}>{ride}</li>
      ))}
    </ul>
  ) : (
    <Text>You havent liked any ride yet.</Text>
  )}
</Box>
</Container>:""
  )
}

export default Profile