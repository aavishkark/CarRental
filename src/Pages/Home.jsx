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
import Footer from '../Components/Footer/Footer';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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

