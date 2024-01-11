import React  from 'react';
import {Box,Flex,Heading,Text,Image} from '@chakra-ui/react';
function HoWToBook() {
  
    return (
     <div className="container-fluid bg-light-emphasis rounded-md shadow-md w-90%" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",width:"90%",fontFamily:"monospace",marginTop:"100px"}}>
      <h2 className="text-center text-black m-10 fs-1">How to Book a Car</h2>
      <div className="d-flex justify-content-around align-items-center flex-wrap">
        <div className="text-center bg-white p-4 rounded-md shadow-xl m-2">
          <img src="https://www.zoomcar.com/img/download.png" alt="Step 1" className="img-fluid rounded-full" style={{width:"70%"}}/>
          <p className="mt-5 fs-5 text-info ">Log In</p>
        </div>
        <div className="h-2 bg-gray-400 flex-1 mx-4 d-md-none" />
        <div className="text-center bg-white p-4 rounded-md shadow-xl m-2">
          <img src="https://www.zoomcar.com/img/time-location-select.png" alt="Step 2" className="img-fluid rounded-full" style={{width:"70%"}}/>
          <p className="mt-5 fs-5 text-info">Select City, Dates, Car</p>
        </div>
        <div className="h-2 bg-gray-400 flex-1 mx-4 d-md-none" />
        <div className="text-center bg-white p-4 rounded-md shadow-xl m-2">
          <img src="https://www.zoomcar.com/img/deposit.png" alt="Step 3" className="img-fluid rounded-full" />
          <p className="mt-5 fs-5 text-info">Book The Car</p>
        </div>
        <div className="h-2 bg-gray-400 flex-1 mx-4 d-md-none" />
        <div className="text-center bg-white p-4 rounded-md shadow-xl m-2">
          <img src="https://www.zoomcar.com/img/zoomaway.png" alt="Step 4" className="img-fluid rounded-full" />
          <p className="mt-5 fs-5 text-info">Confirm and Enjoy</p>
        </div>
      </div>
    </div>
    );
  }
  
  export default HoWToBook;