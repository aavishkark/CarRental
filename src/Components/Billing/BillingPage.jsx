import React, { useState } from 'react';
  import {
    Grid,
    GridItem
  } from '@chakra-ui/react';
  import { Box,Flex,Image,Text,Badge,Stack } from '@chakra-ui/react';
  import { StarIcon } from "@chakra-ui/icons";
import { Icon } from '@chakra-ui/react';
import './billing.css';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
const BillingPage = () => {
   const toast = useToast();
   const [cardnum,setcardnum]=useState("")
   const [cvv,setcvv]=useState("")
   const [year,setyear]=useState("")
   const [month,setmonth]=useState("")
   const nav=useNavigate()
    const user=JSON.parse(localStorage.getItem('user'))
    const car=JSON.parse(localStorage.getItem('rentaridesinglecar'))
    const dates=JSON.parse(localStorage.getItem('startenddates'))
    const date1 = dates.start
    const date2 = dates.end
    const parts1 = date1.split('/');
    const parts2 = date2.split('/');
    const dateObject1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    const dateObject2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
    const timeDiff = dateObject2 - dateObject1;
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    console.log(user.activeRides)
    const handlePay=(e)=>{
      e.preventDefault()
     
        if(cardnum.length<16 || cvv.length<3 || year.length<2){
          console.log("Hiii")
          toast({
            title: 'Wrong Details',
            description: "Please Enter Correct Card Detals.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
        else{ 
        axios.patch(`https://dark-jade-mite-robe.cyclic.app/cars/updatecar/${car._id}`,
        {dates:[...car.dates,dates]})
        .then((res)=>{
         console.log(res)
        })
        .catch((err)=>{
          console.log(err)
          toast({
            title: 'Server Error',
            description: `${err}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        })
        axios.patch(`https://dark-jade-mite-robe.cyclic.app/users/update/${user._id}`,
        {activeRides:[...user.activeRides]})
        .then((res)=>{
          console.log(res)
          toast({
            title: 'Payment Successfull',
            description: "You Will Be Redirected To Home Page",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          localStorage.removeItem('rentaridebillinginfo')
          localStorage.removeItem('startenddates')
          nav('/')
        })
        .catch((err)=>{
          console.log(err)
          toast({
            title: 'Server Error',
            description: `${err}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        })
         
        }
        
    }
  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }} gap={4}>
     <GridItem m={"5%"}>
     <Text fontSize={"large"} bg={"blue.800"} color={"white"} padding={"10px"} w={"100%"} textAlign={"start"} borderRadius={"10px"}>Booking Details</Text>
     <Flex direction={{ base: 'column', md: 'row' }} mb={"2%"}>
      <Box textAlign={"start"} >
      <Image
          src={car.photos}
          alt={car.name}
          borderRadius="lg"
          objectFit="cover"
          maxH="200px"
        />
        <Text fontSize="2xl" fontWeight="bold" mb={5}>
          {car.name}
        </Text>
        <Stack direction="row" spacing={2} mb={5}>
          <Badge colorScheme="teal" fontSize="sm">
            {car.type1}
          </Badge>
          <Badge colorScheme="blue" fontSize="sm">
            {car.fuel}
          </Badge>
          <Badge colorScheme="purple" fontSize="sm">
            {car.seats} Seats
          </Badge>
        </Stack>
        <Stack direction="row" spacing={2} mb={5}>
        <Badge colorScheme="yellow" fontSize="sm">
        {car.rating}  <Icon as={StarIcon} color="yellow.400" boxSize={4} />
        </Badge>
        <Badge colorScheme="green" fontSize="sm">
          {car.trips} Trips
        </Badge>
        </Stack>
        <Text fontSize="l" fontWeight="bold" color="teal.500" mb={5}>
          ₹{car.pricePerDay}/Day
        </Text>
        <Flex align="center" >
          {car.fastag && (
            <Badge colorScheme="green" mb={{ base: 2, md: 0, mr: 2 }}>
              FASTag
            </Badge>
          )}
          <Badge colorScheme={car.avialable === 'true' ? 'green' : 'red'}>
            {car.avialable === 'true' ? 'Available' : 'Not Available'}
          </Badge>
        </Flex>
      </Box>
    </Flex>
    <Box textAlign={"start"} display={"flex"} flexDirection={"column"} width={"fit-content"} justifyContent={"flex-start"} borderRadius={"10px"}>
    <Text fontWeight={"bold"} marginBottom={"10px"}>Start Date: {date1}</Text>
    <Text fontWeight={"bold"} marginBottom={"10px"}>End Date: {date2}</Text>
    <Text fontWeight={"bold"} marginBottom={"10px"}>Total Days: {Math.abs(Math.round(daysDiff))+1}</Text>
    <Text fontWeight={"bold"} marginBottom={"10px"}>Total: {Math.abs(Math.round(daysDiff))+1}*₹ {car.pricePerDay}</Text>
    <Text fontWeight={"bold"} marginBottom={"10px"}>To Pay: ₹ {(Math.abs(Math.round(daysDiff))+1)*(car.pricePerDay)}</Text>
  </Box>
  </GridItem>
  <GridItem m={"5%"}>
    <Text fontSize={"large"} bg={"blue.800"} color={"white"} padding={"10px"} w={"100%"} textAlign={"start"} borderRadius={"10px"}>Enter Your Card Details Below & Click Pay</Text>
  <form className="credit-card">
  <div className="form-body">
    <input type="text" className="card-number" required placeholder="Card Number" maxLength={16} style={{border:"1px solid black",padding:"1%",marginBottom:"3%"}} value={cardnum} onChange={(e)=>{setcardnum(e.target.value)}}/>
    <div className="date-field" style={{marginBottom:"3%"}}>
      <div className="month">
        <select name="Month" style={{border:"1px solid black",padding:"1%",marginRight:"10px"}} value={month} onChange={(e)=>{setmonth(e.target.value)}}>
          <option disabled selected>Month</option>
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">October</option>
          <option value="november">November</option>
          <option value="december">December</option>
        </select>
      </div>
       <input placeholder='yy' style={{width:"10%",border:'1px solid black',paddingLeft:"1%"}} value={year} maxLength={2} onChange={(e)=>{setyear(e.target.value)}}/>
       <p style={{fontSize:"x-small",marginLeft:'5px'}}>Expiry Date</p>
    </div>
    <div className="card-verification" >
      <div className="cvv-input">
        <input type="text" placeholder="CVV" required style={{border:"1px solid black",padding:"1%",marginBottom:"3%"}} maxLength={3} value={cvv} onChange={(e)=>{setcvv(e.target.value)}}/>
      </div>
      <div className="cvv-details"  style={{fontSize:"x-small",marginBottom:"3%"}}>
        <p>3 digits usually found on the signature strip</p>
      </div>
    </div>
    <button className="pay-btn" onClick={handlePay}>Pay</button>
  </div>
</form>
  </GridItem>
    </Grid>
  );
};

export default BillingPage;
