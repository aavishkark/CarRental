import React from 'react'
import { useState } from 'react';
import './searchcars.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_USER_CITY } from '../../Redux/carsReducer/actionTypes';
const SearchCars = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [value, setvalue] = useState(`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`);
  const [city,setcity]=useState(localStorage.getItem('rentaridecity')) 
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
       setvalue(`${e.getDate()}/${e.getMonth()+1}/${e.getFullYear()}`)
       localStorage.setItem('rentaridedate',value)
      }
      const handleSubmit=()=>{

      }
  return (
    <div className='main'>
      <div id="outer-container">
  <div id="main-content">
    <div className="card">
      <h2>Welcome to Our Car Rental Service</h2>
      <form onSubmit={() =>handleSubmit}>
        <select className="form-select mb-3" aria-label="Select Your City" onChange={changelocation}>
          <option disabled value="">Select Your City</option>
          {topTenCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <div>
        <DatePicker
        minDate={new Date()}
        placeholderText={value}
        onChange={changeDate}
      />
        </div>
        <button className="btn btn-primary" type="submit" onClick={()=>{navigate('/cars')}}>Search Cars</button>
      </form>
    </div>
  </div>
</div>
</div>
  )
}

export default SearchCars