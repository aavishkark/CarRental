import React from 'react'
import { useState } from 'react';
import './searchcars.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_USER_CITY } from '../../Redux/carsReducer/actionTypes';
import { useToast } from '@chakra-ui/react';
import { Flex,Text,Box } from '@chakra-ui/react';
const SearchCars = () => {
  const toast = useToast()
  const navigate=useNavigate()
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
  const [start,setstartDate]=useState(new Date())
  const [value, setvalue] = useState(`${day}/${month}/${new Date().getFullYear()}`);
  const [endDate, setEndDate] = useState(`${day}/${month}/${new Date().getFullYear()}`);
  const [city1,setcity]=useState(localStorage.getItem('rentaridecity')) 
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
      localStorage.setItem('rentaridedate',value)
const changelocation=(e)=>{
        setcity(e.target.value)
        dispatch({type:SET_USER_CITY,payload:e.target.value})
        localStorage.setItem('rentaridecity',e.target.value)
      }
const changeDate=(e)=>{
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
        setvalue(`${startday}/${startmonth}/${e.getFullYear()}`)
        localStorage.setItem('rentaridestartdate',JSON.stringify(`${startday}/${startmonth}/${e.getFullYear()}`))
      }
  const changeDateEnd=(e)=>{
  
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
         
         const parts1 = value.split('/');
         const parts2=[endday,endmonth,e.getFullYear()]
         const dateObject1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
         const dateObject2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
         const timeDiff = dateObject2 - dateObject1;
         const daysDiff = (timeDiff / (1000 * 3600 * 24));
         if(Math.abs(Math.round(daysDiff))+1>7){
          toast({
            description: "You can Book a Car for max 1 Week",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
         }
         else{
          if (dateObject2 < dateObject1) {
            toast({
              description: "Please Select a valid date",
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          } else if (dateObject2 > dateObject1) {
            setEndDate(`${endday}/${endmonth}/${e.getFullYear()}`)
            setstartDate(e)
            localStorage.setItem('rentarideenddate',JSON.stringify(`${endday}/${endmonth}/${e.getFullYear()}`))
          } else {
            setEndDate(`${endday}/${endmonth}/${e.getFullYear()}`)
            setstartDate(e)
            localStorage.setItem('rentarideenddate',JSON.stringify(`${endday}/${endmonth}/${e.getFullYear()}`))
          }
          localStorage.setItem('rentarideenddate',JSON.stringify(`${endday}/${endmonth}/${e.getFullYear()}`))
         }
       }
      const handleSubmit=()=>{
        localStorage.setItem('rentaridecity',city1)
        localStorage.setItem('rentaridestartdate',JSON.stringify(value))
        localStorage.setItem('rentarideenddate',JSON.stringify(endDate))
        navigate('/cars')
      }
  return (
    <div className='main'>
      <div id="outer-container">
  <div id="main-content">
    <div className="card">
      <h2>Welcome to Our Car Rental Service</h2>
      <form onSubmit={() =>handleSubmit}>
        <select className="form-select mb-3" aria-label="Select Your City" onChange={changelocation}>
          {topTenCities.map((city) => (
            city==city1? <option key={city} value={city} selected>
            {city}
          </option>:
           <option key={city} value={city}>
           {city}
         </option>
          ))}
        </select>
        <Flex
      direction={{ base: "column", lg: "row" }}
      justify={{ base: "center", lg: "space-evenly" }}
      align={{ base: "center", lg: "flex-start" }}
      p={4}
    >
      <Box mb={{ base: 4, lg: 0 }} mr={{ base: 0, lg: 4 }}>
        <Text fontSize="lg">Start</Text>
        <DatePicker
          minDate={new Date()}
          placeholderText={value}
          onChange={changeDate}
        />
      </Box>
      <Box>
        <Text fontSize="lg">End</Text>
        <DatePicker
          minDate={new Date()}
          placeholderText={endDate}
          onChange={changeDateEnd}
        />
      </Box>
    </Flex>
        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Search Cars</button>
      </form>
    </div>
  </div>
</div>
</div>
  )
}

export default SearchCars