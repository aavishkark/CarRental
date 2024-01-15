import React, { useState, useEffect } from 'react';
import {Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './cartypes.css';
import axios from 'axios';
import { FaRupeeSign } from "react-icons/fa";
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
  Icon,
  Grid,
  Stack
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { GET_CARS_FAIL, GET_CARS_REQ, GET_CARS_SUCCESS } from '../../Redux/carsReducer/actionTypes';
const CarTypes = () => {
    const [selectedLabel, setSelectedLabel] = useState('Sedan');
    const [labelCars,setlabelcars]=useState([])
    const [from,setFrom]=useState(0)
    const [totalPages,setTotalPages]=useState(1)
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isLoading=useSelector((store)=>{return store.carsReducer.isLoading})
    const isError=useSelector((store)=>{return store.carsReducer.isError})
    const dispatch=useDispatch()
    useEffect(() => {
      dispatch({type:GET_CARS_REQ})
      axios.get(`https://dark-jade-mite-robe.cyclic.app/cars/allcars`)
      .then((res)=>{
        const labledcars=res.data.Cars.filter((e)=>{
          return e.type2===selectedLabel
        })
        setTotalPages(Math.ceil(labledcars.length/3))
        let paginateCars=[]
        paginateCars=labledcars.slice(from,from+3)
        setlabelcars(paginateCars)
        dispatch({type:GET_CARS_SUCCESS})
      })
      .catch((err)=>{
        dispatch({type:GET_CARS_FAIL})
        console.log(err)
      })
    }, [selectedLabel,from]);

    const handleLabelClick = (label) => {
      setSelectedLabel(label);
      setFrom(0)
    };
    const handleCardClick = (car, index) => {
      setSelectedCar(car);
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const nextCards = () => {
      setFrom((prev)=>{return prev+3})
    };
    const prevCards = () => {
      setFrom((prev)=>{return prev-3})
    };
    return (
        <div className="container-fluid">
          <Nav variant="tabs" className="justify-content-around align-items-center py-4">
        <Nav.Item>
          <Nav.Link
            className={`nav-link ${selectedLabel === 'Sedan' ? 'active' : ''}`}
            onClick={() => handleLabelClick('Sedan')}
          >
            Sedan
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={`nav-link ${selectedLabel === 'Hatchback' ? 'active' : ''}`}
            onClick={() => handleLabelClick('Hatchback')}
          >
            Hatchback
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={`nav-link ${selectedLabel === 'SUV' ? 'active' : ''}`}
            onClick={() => handleLabelClick('SUV')}
          >
            SUV
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {isLoading?<Stack style={{marginTop:"100px",width:"90%",margin:"auto"}}>
      <Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
</Box>
</Stack>:

<div className='row' style={{display:"flex",margin:"auto",width:"90%",justifyContent:"center"}}>
        {isError?<Alert status='error'>
  <AlertIcon />
  <AlertTitle>Server Error</AlertTitle>
  <AlertDescription>Your Request could not be resolved, please try agian later</AlertDescription>
</Alert>:""}
      {labelCars&&labelCars.map((car) => (
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
      }
     <div>
            {from===0? <button className={`btn btn-primary prevbtn disabled`}>
              <ArrowBackIcon />
            </button>:
             <button className={`btn btn-primary prevbtn`} onClick={prevCards}>
             <ArrowBackIcon />
           </button>}
           {((from+3)/3)>=totalPages?<button className={`btn btn-primary nextbtn disabled`}>
              <ArrowForwardIcon />
            </button>:
            <button className={`btn btn-primary nextbtn`} onClick={nextCards}>
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
      
    );
}

export default CarTypes