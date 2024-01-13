import React from 'react';
  import {
    useDisclosure,
    Divider
  } from '@chakra-ui/react';
  import { Box,Flex,Image,Text,Badge,Stack } from '@chakra-ui/react';
  import { StarIcon } from "@chakra-ui/icons";
import { Icon } from '@chakra-ui/react';
import './billing.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BillingPage = () => {
   // const car=useSelector((store)=>{return store.carsReducer.singleCar})
   const {  onOpen } = useDisclosure();
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
    console.log(Math.abs(Math.round(daysDiff)))
    const handlePay=()=>{
        onOpen()
        axios.patch(`https://dark-jade-mite-robe.cyclic.app/cars/updatecar/${car._id}`,
        {dates:[dates]})
        .then((res)=>{
           console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  return (
    <>
     <Box m={"5%"}>
     <Text fontSize={"large"} bg={"blue.800"} color={"white"} padding={"10px"} w={"26%"} textAlign={"start"} borderRadius={"10px"}>Booking Details</Text>
    <Flex direction={{ base: 'column', md: 'row' }} mb={"1%"}>
      <Box textAlign={"start"} >
      <Image
          src={car.photos}
          alt={car.name}
          borderRadius="lg"
          objectFit="cover"
          maxH="200px"
        />
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          {car.name}
        </Text>
        <Stack direction="row" spacing={2} mb={2}>
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
        <Stack direction="row" spacing={2} mb={2}>
        <Badge colorScheme="yellow" fontSize="sm">
        {car.rating}  <Icon as={StarIcon} color="yellow.400" boxSize={4} />
        </Badge>
        <Badge colorScheme="green" fontSize="sm">
          {car.trips} Trips
        </Badge>
        </Stack>
        <Text fontSize="l" fontWeight="bold" color="teal.500" mb={2}>
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
    <Box textAlign={"start"} display={"flex"} flexDirection={"column"} width={"fit-content"} justifyContent={"flex-start"} bg={"purple.400"} borderRadius={"10px"} color={"white"} p={"1%"}>
    <Text fontWeight={"bold"} marginBottom={"0px"}>Start Date: {date1}</Text>
    <Text fontWeight={"bold"} marginBottom={"0px"}>End Date: {date2}</Text>
    <Text fontWeight={"bold"} marginBottom={"0px"}>Total Days: {Math.abs(Math.round(daysDiff))+1}</Text>
    <Text fontWeight={"bold"} marginBottom={"0px"}>Total: {Math.abs(Math.round(daysDiff))+1}*₹{car.pricePerDay}</Text>
    <Text fontWeight={"bold"} marginBottom={"0px"}>To Pay: {(Math.abs(Math.round(daysDiff))+1)*(car.pricePerDay)}</Text>
  </Box>
  </Box>
  <Box m={"5%"}>
    <Text fontSize={"large"} bg={"blue.800"} color={"white"} padding={"10px"} w={"26%"} textAlign={"start"} borderRadius={"10px"}>Enter Your Card Details Below & Click Pay</Text>
  <form class="credit-card">
  <div class="form-body">
    <input type="text" class="card-number" placeholder="Card Number"/>
    <div class="date-field">
      <div class="month">
        <select name="Month">
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
      <div class="year">
        <select name="Year">
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
    </div>
    <div class="card-verification">
      <div class="cvv-input">
        <input type="text" placeholder="CVV"/>
      </div>
      <div class="cvv-details">
        <p>3 or 4 digits usually found <br/> on the signature strip</p>
      </div>
    </div>
    <button type="submit" class="proceed-btn"><a href="#">Proceed</a></button>
    <button type="submit" class="paypal-btn"><a href="#">Pay With</a></button>
  </div>
</form>
  </Box>
    </>
  );
};

export default BillingPage;
