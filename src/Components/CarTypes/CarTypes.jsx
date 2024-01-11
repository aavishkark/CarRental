import React, { useState, useEffect } from 'react';
import {Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
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
  Grid
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
const CarTypes = () => {
    const [selectedLabel, setSelectedLabel] = useState('Sedan');
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerPage = 3;
    const [singlecar,setsinglecar]=useState([])
    const [singlepage,setsinglepage]=useState(1)
    const [totalcars,settotalcars]=useState()
  
    const handleLabelClick = (label) => {
      setSelectedLabel(label);
      setCurrentIndex(0)
    };
  
    useEffect(() => {
      axios.get(`https://mock-server-rentride.onrender.com/cars`)
      .then((res)=>{
        settotalcars(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
      fetch(`${"https://mock-server-rentride.onrender.com/cars"}?type2=${selectedLabel}`)
        .then((response) => response.json())
        .then((data) => {setCars(data);})
        .catch((error) => console.error('Error fetching data:', error));
        getSinglecar()
    }, [selectedLabel,singlepage]);
    const handleCardClick = (car, index) => {
      setSelectedCar(car);
      setCurrentIndex(index);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const nextCards = () => {
      if (currentIndex < cars.length - cardsPerPage) {
        setCurrentIndex(currentIndex + cardsPerPage);
      }
    };
  
    const prevCards = () => {
      if (currentIndex >= cardsPerPage) {
        setCurrentIndex(currentIndex - cardsPerPage);
      }
    };
    const getSinglecar=()=>{
      axios.get(`https://mock-server-rentride.onrender.com/cars?type2=${selectedLabel}&_page=${singlepage}&_limit=1`)
      .then((res)=>{
       setsinglecar(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    const handleprevioussingle=()=>{
        setsinglepage((prev)=>{return prev-1})
    }
    const handlenextsingle=()=>{
      setsinglepage((prev)=>{return prev+1})
    }
    console.log(cars)
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
  
        <div className="text-center p-1 container d-none d-md-block">
          {selectedLabel === 'Sedan' && (
            <div className="p-1">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {cars.slice(currentIndex, currentIndex + cardsPerPage).map((car, index) => (
                  <div
                    key={car.name}
                    className="col mb-4"
                    onClick={() => handleCardClick(car, currentIndex + index)}
                  >
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
                      <strong>Price:</strong> <Icon as={FaRupeeSign} color="green.500" boxSize={4} />  {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating} <Icon as={StarIcon} color="yellow.400" boxSize={4} />
                    </p>                  
                  </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              <div className="mt-4 text-center">
                <button
                  className="btn btn-light me-2"
                  onClick={prevCards}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft />
                </button>
                <button
                  className="btn btn-light"
                  onClick={nextCards}
                  disabled={currentIndex >= cars.length - cardsPerPage}
                >
                  <ChevronRight />
                </button>
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
          )}
          {selectedLabel === 'Hatchback' && (
           <div className="p-1">
           <div className="row row-cols-1 row-cols-md-3 g-4">
             {cars.slice(currentIndex, currentIndex + cardsPerPage).map((car, index) => (
               <div
                 key={car.name}
                 className="col mb-4"
                 onClick={() => handleCardClick(car, currentIndex + index)}
               >
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
                   <strong>Price:</strong> <Icon as={FaRupeeSign} color="green.500" boxSize={4} />  {car.pricePerDay}/Day
                 </p>
                 <p className='card-text'>
                   <strong>Rating:</strong> {car.rating} <Icon as={StarIcon} color="yellow.400" boxSize={4} />
                 </p>                  
               </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>

           <div className="mt-4 text-center">
             <button
               className="btn btn-light me-2"
               onClick={prevCards}
               disabled={currentIndex === 0}
             >
               <ChevronLeft />
             </button>
             <button
               className="btn btn-light"
               onClick={nextCards}
               disabled={currentIndex >= cars.length - cardsPerPage}
             >
               <ChevronRight />
             </button>
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
          )}
          {selectedLabel === 'SUV' && (
            <div className="p-4">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {cars.slice(currentIndex, currentIndex + cardsPerPage).map((car, index) => (
                  <div
                    key={car.name}
                    className="col mb-4"
                    onClick={() => handleCardClick(car, currentIndex + index)}
                  >
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
                      <strong>Price:</strong><Icon as={FaRupeeSign} color="green.500" boxSize={4} /> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating} <Icon as={StarIcon} color="yellow.400" boxSize={4} />
                    </p>
                
                  </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              <div className="mt-4 text-center">
                <button
                  className="btn btn-light me-2"
                  onClick={prevCards}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft />
                </button>
                <button
                  className="btn btn-light"
                  onClick={nextCards}
                  disabled={currentIndex >= cars.length - cardsPerPage}
                >
                  <ChevronRight />
                </button>
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
          )}
        </div>
        <div className="text-center p-1 containertwo d-md-none">
          {selectedLabel === 'Sedan' && (
            <div className="p-1">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {singlecar&&singlecar.slice(currentIndex, currentIndex + cardsPerPage).map((car, index) => (
                  <div
                    key={car.name}
                    className="col mb-4"
                    onClick={() => handleCardClick(car, currentIndex + index)}
                  >
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
                      <strong>Price:</strong><Icon as={FaRupeeSign} color="green.500" boxSize={4} /> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating} <Icon as={StarIcon} color="yellow.400" boxSize={4} />
                    </p>
                   
                  </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              <div className="mt-4 text-center">
                <button
                  className="btn btn-light me-2"
                  onClick={handleprevioussingle}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft />
                </button>
                <button
                  className="btn btn-light"
                  onClick={handlenextsingle}
                  disabled={currentIndex >= cars.length - cardsPerPage}
                >
                  <ChevronRight />
                </button>
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
          )}
          {selectedLabel === 'Hatchback' && (
            <div className="p-1">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {cars.slice(currentIndex, currentIndex + cardsPerPage).map((car, index) => (
                <div
                  key={car.name}
                  className="col mb-4"
                  onClick={() => handleCardClick(car, currentIndex + index)}
                >
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
                    <strong>Price:</strong> <Icon as={FaRupeeSign} color="green.500" boxSize={4} />  {car.pricePerDay}/Day
                  </p>
                  <p className='card-text'>
                    <strong>Rating:</strong> {car.rating} <Icon as={StarIcon} color="yellow.400" boxSize={4} />
                  </p>                  
                </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button
                className="btn btn-light me-2"
                onClick={prevCards}
                disabled={currentIndex === 0}
              >
                <ChevronLeft />
              </button>
              <button
                className="btn btn-light"
                onClick={nextCards}
                disabled={currentIndex >= cars.length - cardsPerPage}
              >
                <ChevronRight />
              </button>
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
          )}
          {selectedLabel === 'SUV' && (
            <div className="p-4">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {singlecar&&singlecar.slice(currentIndex, currentIndex + cardsPerPage).map((car, index) => (
                  <div
                    key={car.name}
                    className="col mb-4"
                    onClick={() => handleCardClick(car, currentIndex + index)}
                  >
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
                      <strong>Price:</strong><Icon as={FaRupeeSign} color="green.500" boxSize={4} /> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating} <Icon as={StarIcon} color="yellow.400" boxSize={4} />
                    </p>
             
                  </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              <div className="mt-4 text-center">
                <button
                  className="btn btn-light me-2"
                  onClick={handleprevioussingle}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft />
                </button>
                <button
                  className="btn btn-light"
                  onClick={handlenextsingle}
                  disabled={currentIndex >= cars.length - cardsPerPage}
                >
                  <ChevronRight />
                </button>
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
          )}
        </div>
        
      </div>
    );
}

export default CarTypes