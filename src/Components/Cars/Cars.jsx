import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import './cars.css'
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_SINGLE_CAR, SET_USER_CITY } from '../../Redux/carsReducer/actionTypes';
import { addCarToLikes, getCarsByCity } from '../../Redux/carsReducer/action';
import { Grid, GridItem } from '@chakra-ui/react';
import {
    Box,
    Select
  } from '@chakra-ui/react';
import { Button, Modal, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useToast } from '@chakra-ui/react'
const Cars = () => {
const dispatch=useDispatch()
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
  const [start, setstart] = useState(`${day}/${month}/${new Date().getFullYear()}`);
  const [end,setend] = useState(`${day}/${month}/${new Date().getFullYear()}`)
  const [city,setcity]=useState(localStorage.getItem('rentaridecity')) 
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')))
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pricesort,setpricesort]=useState(null)
  const [typeesort,settype]=useState(null)
  const [filtered,setfiltered]=useState([])
  const flag=useRef(false)
  const topTenCities = [
        'Mumbai',
        'Delhi',
        'Bangalore',
        'Kolkata',
        'Chennai',
        'Hyderabad',
        'Pune',
        'Ahmedabad',
        'Jaipur',
        'Lucknow',
      ];
      localStorage.setItem('rentaridedate',start)
      const cars=useSelector((store)=>{return store.carsReducer.cars})
      const navigate=useNavigate()
      useEffect(()=>{
        dispatch(getCarsByCity({city,pricesort,typeesort}))
        setstart(JSON.parse(localStorage.getItem('rentaridestartdate')))
        setend(JSON.parse(localStorage.getItem('rentarideenddate')))
      },[flag])
      const changelocation=(e)=>{
            dispatch({type:SET_USER_CITY,payload:e.target.value})
            localStorage.setItem('rentaridecity',e.target.value)
            setcity(e.target.value)
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
          setstart(`${startday}/${startmonth}/${e.getFullYear()}`)
          localStorage.setItem('rentaridestartdate',JSON.stringify(`${startday}/${startmonth}/${e.getFullYear()}`))
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
          setend(`${endday}/${endmonth}/${e.getFullYear()}`)
          localStorage.setItem('rentarideenddate',JSON.stringify(`${endday}/${endmonth}/${e.getFullYear()}`))
      }
      const handleSubmit=()=>{
        const parts1 = start.split('/')
        const parts2= end.split('/')
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
        if(daysDiff>=0 && daysDiff<=7){
          toast({
            description: "Update successfull",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        dispatch(getCarsByCity({city,pricesort,typeesort}))
        flag.current=!flag
        }
       
      }
      const handleCardClick = (car, index) => {
        setSelectedCar(car);
        dispatch({type:SAVE_SINGLE_CAR,payload:car})
        localStorage.setItem('rentaridesinglecar',JSON.stringify(car))
        navigate('/singlecar')

      };
      const closeModal = () => {
        setIsModalOpen(false);
      };
      const handlesortprice=(e)=>{
        setpricesort(e.target.value)
      }
      const handletype=(e)=>{
        settype(e.target.value)
      }
      const handleLike=(car)=>{
        dispatch(addCarToLikes({car,user}))
        toast({
            description: "Added To Your Favourites",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
      }
      const toast = useToast()
      console.log(start)
  return (
    <div className='main'>
    <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems="center" mb={4}>
      <Select
        onChange={changelocation}
        mr={{ base: 0, md: 2 }}
        mb={{ base: 2, md: 0 }}
      >
        <option value={"Select City"} disabled selected>Select City</option>
        {topTenCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </Select>
      <Select onChange={handlesortprice}>
        <option disabled selected>Sort By Price</option>
        <option value={'asc'}>Ascending</option>
        <option value={'desc'}>Desending</option>
      </Select>
      <Select onChange={handletype}>
      <option disabled selected>Sort By Type</option>
      <option value={'ALL'}>ALL</option>
        <option value={'SUV'}>SUV</option>
        <option value={'Sedan'}>Sedan</option>
        <option value={'Hatchback'}>Hatchback</option>
      </Select>
      <DatePicker
        className='datePicker'
        minDate={new Date()}
        placeholderText={start}
        onChange={changeStartDate}
        mr={{ base: 0, md: 2 }}
      />
      <DatePicker
        className='datePicker'
        minDate={new Date()}
        placeholderText={end}
        onChange={changeEndDate}
        mr={{ base: 0, md: 2 }}
      />
      <Button onClick={handleSubmit} colorScheme="teal">
        Update
      </Button>
    </Box>
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }} gap={4}>
      {cars.Cars&&cars.Cars.map((car,index) => {
        let flag=false
        if(car.dates.length!=0){
          car.dates.forEach((c)=>{
            console.log(c)
            const parseDate = (dateString) => {
              const [day, month, year] = dateString.split('/');
              console.log(day,month,year)
             // return dateString.split('/');
            }
            let start1=parseDate(c.start)
            let end1=parseDate(c.end)
            let start2=parseDate(JSON.parse(localStorage.getItem('rentaridestartdate')))
            let end2=parseDate(JSON.parse(localStorage.getItem('rentarideenddate')))
            if(start1 <= end2 && end1 >= start2){
              flag=true
            }
          })
          if(!flag){
            return <GridItem key={car.id} >
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
                        <strong>Price:</strong> {car.pricePerDay}/Day
                      </p>
                      <p className='card-text'>
                        <strong>Rating:</strong> {car.rating}
                      </p>
                      <button className='btn btn-primary bookbtn' onClick={() => handleCardClick(car, currentIndex + index)}>Book</button>
                      <button onClick={() =>handleLike(car)}><FavoriteIcon/></button>
                      
                    </div>
                        </div>
                      </div>
                    </div>
          </GridItem>
          }
          else{
            // console.log(car)
          }  
        }  
        else{
          return <GridItem key={car.id} >
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
                        <strong>Price:</strong> {car.pricePerDay}/Day
                      </p>
                      <p className='card-text'>
                        <strong>Rating:</strong> {car.rating}
                      </p>
                      <button className='btn btn-primary bookbtn' onClick={() => handleCardClick(car, currentIndex + index)}>Book</button>
                      <button onClick={() =>handleLike(car)}><FavoriteIcon/></button>
                      
                    </div>
                        </div>
                      </div>
                    </div>
          </GridItem>
        }    
})}
    </Grid>
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
  )
}

export default Cars