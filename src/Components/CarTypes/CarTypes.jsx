import React, { useState, useEffect } from 'react';
import { Button, Modal, Image,Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import './cartypes.css';
import axios from 'axios';
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
        .then((data) => {setCars(data)})
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
       console.log(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    const handleprevioussingle=()=>{
        setsinglepage((prev)=>{return prev-1})
        console.log(singlepage)
    }
    const handlenextsingle=()=>{
      setsinglepage((prev)=>{return prev+1})
      console.log(singlepage)
    }
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
                      <strong>Price:</strong> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating}
                    </p>
                    <button className='btn btn-primary bookbtn'>Book</button>
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
  
              <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Car Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedCar && (
                    <div className="d-flex flex-column align-items-center">
                      <Image src={selectedCar.photos[0]} alt={selectedCar.name} />
                      <p>Type: {selectedCar.type2}</p>
                      <p>Name: {selectedCar.name}</p>
                      <p>Rating: {selectedCar.rating}</p>
                      <p>Price per Day: ${selectedCar.pricePerDay}</p>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
          {selectedLabel === 'Hatchback' && (
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
                      <strong>Price:</strong> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating}
                    </p>
                    <button className='btn btn-primary bookbtn'>Book</button>
                  </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Car Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedCar && (
                    <div className="d-flex flex-column align-items-center">
                      <Image src={selectedCar.photos[0]} alt={selectedCar.name} />
                      <p>Type: {selectedCar.type2}</p>
                      <p>Name: {selectedCar.name}</p>
                      <p>Rating: {selectedCar.rating}</p>
                      <p>Price per Day: ${selectedCar.pricePerDay}</p>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
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
                      <strong>Price:</strong> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating}
                    </p>
                    <button className='btn btn-primary bookbtn'>Book</button>
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
  
              <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Car Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedCar && (
                    <div className="d-flex flex-column align-items-center">
                      <Image src={selectedCar.photos[0]} alt={selectedCar.name} />
                      <p>Type: {selectedCar.type2}</p>
                      <p>Name: {selectedCar.name}</p>
                      <p>Rating: {selectedCar.rating}</p>
                      <p>Price per Day: ${selectedCar.pricePerDay}</p>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
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
                      <strong>Price:</strong> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating}
                    </p>
                    <button className='btn btn-primary bookbtn'>Book</button>
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
  
              <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Car Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedCar && (
                    <div className="d-flex flex-column align-items-center">
                      <Image src={selectedCar.photos[0]} alt={selectedCar.name} />
                      <p>Type: {selectedCar.type2}</p>
                      <p>Name: {selectedCar.name}</p>
                      <p>Rating: {selectedCar.rating}</p>
                      <p>Price per Day: ${selectedCar.pricePerDay}</p>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
          {selectedLabel === 'Hatchback' && (
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
                      <strong>Price:</strong> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating}
                    </p>
                    <button className='btn btn-primary bookbtn'>Book</button>
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
  
              <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Car Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedCar && (
                    <div className="d-flex flex-column align-items-center">
                      <Image src={selectedCar.photos[0]} alt={selectedCar.name} />
                      <p>Type: {selectedCar.type2}</p>
                      <p>Name: {selectedCar.name}</p>
                      <p>Rating: {selectedCar.rating}</p>
                      <p>Price per Day: ${selectedCar.pricePerDay}</p>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
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
                      <strong>Price:</strong> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating}
                    </p>
                    <button className='btn btn-primary bookbtn'>Book</button>
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
  
              <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Car Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedCar && (
                    <div className="d-flex flex-column align-items-center">
                      <Image src={selectedCar.photos[0]} alt={selectedCar.name} />
                      <p>Type: {selectedCar.type2}</p>
                      <p>Name: {selectedCar.name}</p>
                      <p>Rating: {selectedCar.rating}</p>
                      <p>Price per Day: ${selectedCar.pricePerDay}</p>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
        </div>
        
      </div>
    );
}

export default CarTypes