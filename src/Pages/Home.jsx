import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { getCars } from '../Redux/carsReducer/action';
import CarCarousal from '../Components/carCarousal';
import SearchCars from '../Components/SearchCars/SearchCars';
import CarTypes from '../Components/CarTypes/CarTypes';
import HoWToBook from '../Components/HowToBook/HowToBook';
import WhyChoose from '../Components/WhyChoose/WhyChoose';
import PopularPlaces from '../Components/Popular/PopularPlaces';
import Reviews from '../Components/Reviews/Reviews';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const user=JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    if(user){
      axios.get(`https://dark-jade-mite-robe.cyclic.app/users/singleuser/${user._id}`)
    .then((res)=>{
      const pastrides=[...res.data.user.pastRides]
      const activerides=[]
      res.data.user.activeRides.forEach((e)=>{
        const parts = e.end.split('/');
        const date = new Date(parts[2], parts[1] - 1, parts[0]); 
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const hasPassed = date < currentDate;
        if(hasPassed){
          pastrides.push(e)
        }
        else{
          activerides.push(e)
        }
      })
      if(activerides.length>0 || pastrides.length>0){
        axios.patch(`https://dark-jade-mite-robe.cyclic.app/users/update/${user._id}`,
      {activeRides:activerides,pastRides:pastrides})
      .then((res)=>{
        // console.log(res)
     })
     .catch((err)=>{
     // console.log(err)
     })
      }
      
    })
    .catch((err)=>{
     // console.log(err)
    })
    }
     axios.get(`https://dark-jade-mite-robe.cyclic.app/cars/allcars`)
     .then((res)=>{
      // console.log(res)
      res.data.Cars.forEach((e)=>{
        const newdates=[]
        e.dates.forEach((d)=>{
          const parts = d.end.split('/');
          const date = new Date(parts[2], parts[1] - 1, parts[0]); 
          const currentDate = new Date();
          const hasPassed = date  <= currentDate;
          if(!hasPassed){
            newdates.push(d)
          }
          
        })
        axios.patch(`https://dark-jade-mite-robe.cyclic.app/cars/updatecar/${e._id}`,
            {dates:newdates})
            .then((res)=>{
            //  console.log(res)
            })
            .catch((err)=>{
            // console.log(err)
            })
      })
     })
     .catch((err)=>{
     // console.log(err)
     })
     dispatch(getCars());
  }, []);
  return (
    <div>
      <SearchCars></SearchCars>
      <CarCarousal></CarCarousal>
      <CarTypes/>
      <HoWToBook/>
      <WhyChoose/>
      <PopularPlaces/>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;

