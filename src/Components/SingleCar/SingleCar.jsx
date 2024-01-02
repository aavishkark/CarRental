import React, { useState } from 'react'
import {
    Box,
    Image,
    Flex,
    Text,
    Badge,
    Spacer,
    Button,
    Stack,
  } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
  } from '@chakra-ui/react';
const SingleCar = () => {
    const product=JSON.parse(localStorage.getItem('rentaridesinglecar'))
    const [startday,setstartdate]=useState(null)
    const [endday,setenddate]=useState(null)
    const navigate=useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const handleBook=()=>{
        if(startday == null || endday==null){
           onOpen()
        }
        else{
            const start = new Date(startday);
            const end = new Date(endday);
            const differenceInMs = end - start;
            const differenceInDays = Math.ceil(differenceInMs / (24 * 60 * 60 * 1000));
            const dates={
                start:startday,
                end:endday
            } 
            let newDates=JSON.stringify(dates)
            localStorage.setItem('startenddates',newDates)
            navigate('/billing')  
        }
        
    }
  return (
    <Box p={4} maxW="xl" borderWidth="1px" borderRadius="lg">
    <Flex direction={{ base: 'column', md: 'row' }}>
      <Box>
        <Image
          src={product.photos}
          alt={product.name}
          borderRadius="lg"
          objectFit="cover"
          maxH="200px"
        />
      </Box>
      <Spacer />
      <Box flex="1" pl={{ base: 0, md: 4 }}>
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          {product.name}
        </Text>
        <Stack direction="row" spacing={2} mb={2}>
          <Badge colorScheme="teal" fontSize="sm">
            {product.type1}
          </Badge>
          <Badge colorScheme="blue" fontSize="sm">
            {product.fuel}
          </Badge>
          <Badge colorScheme="purple" fontSize="sm">
            {product.seats} Seats
          </Badge>
        </Stack>
        <Stack direction="row" spacing={2} mb={2}>
          <Text fontSize="md">
            Rating: {product.rating} ({product.trips} trips)
          </Text>
        </Stack>
        <Text fontSize="xl" fontWeight="bold" color="teal.500" mb={2}>
          ₹{product.pricePerDay}/Day
        </Text>
        <Flex direction={{ base: 'column', md: 'row' }} align="center">
          {product.fastag && (
            <Badge colorScheme="green" mb={{ base: 2, md: 0, mr: 2 }}>
              FASTag Available
            </Badge>
          )}
          <Badge colorScheme={product.avialable === 'true' ? 'green' : 'red'}>
            {product.avialable === 'true' ? 'Available' : 'Not Available'}
          </Badge>
        </Flex>
        <Button colorScheme="teal" mt={4} onClick={handleBook}>
          Book Now
        </Button>
      </Box>
    </Flex>
   <label>Start</label>
   <br/>
   <input value={startday} type='date' onChange={(e)=>{setstartdate(e.target.value)}}></input>
   <br/>
   <label>End</label>
   <br/>
   <input value={endday} type='date' onChange={(e)=>{setenddate(e.target.value)}}></input>
   <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogBody>
            Please Select start date and end date
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>
            {/* Additional buttons or actions can be added here */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  </Box>
    
  )
}

export default SingleCar