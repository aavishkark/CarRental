import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './carcarousal.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FaRupeeSign } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import { Icon } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Button,
  Box,
  Grid,
  Stack
} from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { Skeleton } from '@chakra-ui/react'
const CarCarousal = () => {
    const [totalcars,settotalcars]=useState([])
    const [totalpagesthree,settotalpagesthree]=useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [from,setfrom]=useState(0)
    const isLoading=useSelector((store)=>{return store.carsReducer.isLoading})
    
    useEffect(()=>{
      axios.get(`https://dark-jade-mite-robe.cyclic.app/cars/allcars`)
      .then((res)=>{
        const paginatedArray = res.data.Cars.slice(from,from+3);
        settotalcars(paginatedArray)
        settotalpagesthree(Math.ceil(res.data.Cars.length/3))
      })
      .catch((err)=>{
        console.log(err)
      })
    },[from])
    const handleprevious=()=>{
        setfrom((prev)=>{return prev-3})
    }
    const handlenext=()=>{
      setfrom((prev)=>{return prev+3})
    }
    const handleCardClick=(car)=>{
      setSelectedCar(car);
      setIsModalOpen(true);
    }
    const closeModal = () => {
      setIsModalOpen(false);
    };
  return (
    isLoading?<Stack style={{marginTop:"100px",width:"90%",margin:"auto"}}>
  <Skeleton height='150px' />
  <Skeleton height='150px' />
  <Skeleton height='150px' />
</Stack>:
<div>
<div className='row' style={{display:"flex",margin:"auto",width:"90%",justifyContent:"center"}}>
            {totalcars&&totalcars.map((car) => (
              <div className='col-md-4 mb-4' key={car._id} onClick={() => handleCardClick(car)}>
                <div className='card'>
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
                      <strong>Type:</strong> {car.type2}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
     <div>
            {from===0? <button className={`btn btn-primary prevbtn disabled`}>
              <ArrowBackIcon />
            </button>:
             <button className={`btn btn-primary prevbtn`} onClick={handleprevious}>
             <ArrowBackIcon />
           </button>}
           {((from+3)/3)>=totalpagesthree?<button className={`btn btn-primary nextbtn disabled`}>
              <ArrowForwardIcon />
            </button>:
            <button className={`btn btn-primary nextbtn`} onClick={handlenext}>
            <ArrowForwardIcon />
          </button>}
            
          </div>
  <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedCar ? (
            <Text fontSize="xl">{selectedCar.name} Details</Text>
          ) : (
            <Text fontSize="xl">Car Details</Text>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedCar && (
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                 <Image src={selectedCar.photos} alt={selectedCar.name} borderRadius="lg" mb={4} />
              <Box p={1} borderWidth="1px" borderRadius="lg">
               
                <Text fontSize="xl" fontWeight="bold">
                  {selectedCar.name}
                </Text>
                <Text fontSize="md" color="gray.500" mb={4}>
                  <strong>City:</strong> {selectedCar.city}
                </Text>
                <Text>
                  <strong>Type:</strong> {selectedCar.type2}
                </Text>
                <Text>
                  <strong>Fuel:</strong> {selectedCar.fuel}
                </Text>
                <Text>
                  <strong>Seats:</strong> {selectedCar.seats}
                </Text>
                <Text>
                  <strong>Trips:</strong> {selectedCar.trips}
                </Text>
              </Box>
        
              <Box p={1} borderWidth="1px" borderRadius="lg">
                <Text>
                  <strong>Rating:</strong>{" "}
                  {Array.from({ length: selectedCar.rating }, (_, index) => (
                    <Icon key={index} as={StarIcon} color="yellow.400" boxSize={4} />
                  ))}
                </Text>
                <Text>
                  <strong>Price per Day:</strong>{" "}
                  <Icon as={FaRupeeSign} color="green.500" boxSize={4} /> {selectedCar.pricePerDay}
                </Text>
              </Box>
            </Grid>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
</div>
     )
}
export default CarCarousal