import React from 'react'
import {Box,Image,Grid,Select, GridItem
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
const PopularPlaces = () => {
  const location=useSelector((store)=>{ return store.carsReducer.city})
  const city=localStorage.getItem('rentaridecity') || location
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)', xl: 'repeat(2, 1fr)' }} gap={4}>
    <GridItem>
      <Select
        value="default1"
        icon={<Image src="https://doav52ie4cv60.cloudfront.net/images/renters-ico.svg" boxSize="10px"  fontSize={"50px"}  />}
        placement="bottom-start"
        style={{width:"90%"}}
        onChange={()=>{}}
      >
        <option value="default1" disabled>
          {`Best Places To Visit near ${city}`}
        </option>
        <option value="option1">Shaniwar Wada</option>
        <option value="option2">Aga Khan Palace</option>
        <option value="option3">Rasalgad</option>
      </Select>
    </GridItem>

    <GridItem >
      <Select
        value="default2"
        icon={<Image src="https://doav52ie4cv60.cloudfront.net/images/earn-ico.svg" boxSize="10px"  fontSize={"50px"} />}
        placement="bottom"
        style={{width:"90%"}}
        onChange={()=>{}}
      >
        <option value="default2" disabled>
          Long Drives are better
        </option>
        <option value="option1">Mahabaleshwar</option>
        <option value="option2">Ratnagiri</option>
        <option value="option3">Lonavla</option>
      </Select>
    </GridItem>
    <GridItem>
      <Select
        value="default3"
        icon={<Image src="https://doav52ie4cv60.cloudfront.net/images/get-paid-ico.svg" boxSize="10px"  fontSize={"50px"}  />}
        placement="bottom"
        style={{width:"90%"}}
        onChange={()=>{}}
      >
        <option value="default3" disabled>
          Professional Places
        </option>
        <option value="option1">Kharadi</option>
        <option value="option2">Hinjewadi</option>
        <option value="option3">Baner</option>
      </Select>
    </GridItem>
    <GridItem>
      <Select
        value="default4"
        icon={<Image src="https://doav52ie4cv60.cloudfront.net/images/car-price-ico.svg" boxSize="10px" fontSize={"50px"}  />}
        placement="bottom"
        style={{width:"90%"}}
        onChange={()=>{}}
      >
        <option value="default4" disabled>
          Places of Education
        </option>
        <option value="option1">University</option>
        <option value="option2">Symbiosis</option>
        <option value="option3">COEP</option>
      </Select>
    </GridItem>
  </Grid>

  )
}

export default PopularPlaces