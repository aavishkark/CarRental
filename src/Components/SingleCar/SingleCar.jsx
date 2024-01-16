import React, { useState } from 'react'
import {
    Box,
    Image,
    Flex,
    Text,
    Badge,
    Button,
    Stack,
  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
  } from '@chakra-ui/react';
  import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { StarIcon } from "@chakra-ui/icons";
import { Icon } from '@chakra-ui/react';
const SingleCar = () => {
  let month
if(new Date().getMonth()+1>9){
  month=new Date().getMonth()+1
}
else{
  month=""+new Date().getMonth()+1
}
let day
if(new Date().getDate()>9){
day=new Date().getDate()
}
else{
  day="0"+new Date().getDate()
}
    const product=JSON.parse(localStorage.getItem('rentaridesinglecar'))
    const [startday,setstartdate]=useState(`${day}/${month}/${new Date().getFullYear()}`)
    const [endday,setenddate]=useState(`${day}/${month}/${new Date().getFullYear()}`)
    const toast=useToast()
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
                end:endday,
                car:product
            } 
            let newDates=JSON.stringify(dates)
            localStorage.setItem('startenddates',newDates)
            localStorage.setItem('rentaridebillinginfo',newDates)
            navigate('/billing')  
        }
        
    }
    const changeStartDate=(e)=>{
      let startmonth
      if(e.getMonth()+1>9){
        startmonth=e.getMonth()+1
      }
      else{
        startmonth=""+e.getMonth()+1
      }
      let startday
      if(e.getDate()>9){
        startday=e.getDate()
      }
      else{
        startday="0"+e.getDate()
      }
      const parts1 = [startday,startmonth,e.getFullYear()]
      const parts2= endday.split('/')
      
      const dateObject1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
      const dateObject2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
      const timeDiff = dateObject2 - dateObject1;
      const daysDiff = (timeDiff / (1000 * 3600 * 24));
     
      if(daysDiff<0){
        toast({
          description: "Start Day Should be Less Then End Day",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      if(daysDiff>7){
        toast({
          description: "You Can Rent A Car For Maximum One Week",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      if(daysDiff>0 && daysDiff<=7){
        setstartdate(`${startday}/${startmonth}/${e.getFullYear()}`)
        localStorage.setItem('rentaridestartdate',JSON.stringify(`${startday}/${startmonth}/${e.getFullYear()}`))
      }
    }
    const changeEndDate=(e)=>{
      let endmonth
      if(e.getMonth()+1>9){
        endmonth=e.getMonth()+1
      }
      else{
        endmonth=""+e.getMonth()+1
      }
      let endday
      if(e.getDate()>9){
        endday=e.getDate()
      }
      else{
        endday="0"+e.getDate()
      }
      const parts1 = startday.split('/')
      const parts2= [endday,endmonth,e.getFullYear()]
      const dateObject1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
      const dateObject2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
      const timeDiff = dateObject2 - dateObject1;
      const daysDiff = (timeDiff / (1000 * 3600 * 24));
      if(daysDiff<0){
        toast({
          description: "End Day should be Greater Than Start Day",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      if(daysDiff>7){
        toast({
          description: "You Can Rent A Car For Maximum One Week",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      if(daysDiff>0 && daysDiff<=7){
        setenddate(`${endday}/${endmonth}/${e.getFullYear()}`)
        localStorage.setItem('rentarideenddate',JSON.stringify(`${endday}/${endmonth}/${e.getFullYear()}`))
      }
    }
  return (
    <Box p={4} maxW="xl" m={"5%"} display={"flex"} margin={"auto"} width={"100%"} justifyContent={"center"}  mt={"3%"} mb={"3%"}>
    <Flex direction={{ base: 'column', md: 'row' }}>
      <Box flex="1" pl={{ base: 0, md: 4 }} textAlign={"start"} >
      <Image
          src={product.photos}
          alt={product.name}
          borderRadius="lg"
          objectFit="cover"
          maxH="200px"
        />
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
        <Badge colorScheme="yellow" fontSize="sm">
        {product.rating}  <Icon as={StarIcon} color="yellow.400" boxSize={4} />
        </Badge>
        <Badge colorScheme="green" fontSize="sm">
          {product.trips} Trips
        </Badge>
        </Stack>
        <Text fontSize="l" fontWeight="bold" color="teal.500" mb={2}>
          ₹{product.pricePerDay}/Day
        </Text>
        <Flex align="center" >
          {product.fastag && (
            <Badge colorScheme="green" mb={{ base: 2, md: 0, mr: 2 }}>
              FASTag
            </Badge>
          )}
          <Badge colorScheme={product.avialable === 'true' ? 'green' : 'red'}>
            {product.avialable === 'true' ? 'Available' : 'Not Available'}
          </Badge>
        </Flex>
        <Box p={0}>
        <label style={{fontWeight:"bold"}}>Start</label>
   <div style={{border:"1px solid black",width:"max-content"}}>
   <DatePicker
        minDate={new Date()}
        placeholderText={startday}
        onChange={changeStartDate}
        />
   </div>
   <label style={{fontWeight:"bold"}}>End</label>
   <br/>
   <div style={{border:"1px solid black",width:"max-content"}}>
   <DatePicker
        minDate={new Date()}
        placeholderText={endday}
        onChange={changeEndDate}
      />
   </div>
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
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </Box>
        <Button color="blue.400"  mt={4} onClick={handleBook}>
          Book Now
        </Button>
      </Box>
    </Flex>
  </Box>
    
  )
}

export default SingleCar