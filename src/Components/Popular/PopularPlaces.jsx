import React from 'react'
import {Box,Image,Grid,Select
} from '@chakra-ui/react';
const PopularPlaces = () => {
  let location="Pune"
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="2" h="100px">
    <Box>
      <Select
        defaultValue="default1"
        icon={<Image src="https://doav52ie4cv60.cloudfront.net/images/renters-ico.svg" boxSize="20px"  fontSize={"150%"}  />}
        placement="bottom-start"
        style={{width:"90%"}}
      >
        <option value="default1" disabled>
          {`Best Places To Visit near ${location}`}
        </option>
        <option value="option1">Shaniwar Wada</option>
        <option value="option2">Aga Khan Palace</option>
        <option value="option3">Rasalgad</option>
      </Select>
    </Box>

    <Box >
      <Select
        defaultValue="default2"
        icon={<Image src="https://doav52ie4cv60.cloudfront.net/images/earn-ico.svg" boxSize="20px"  fontSize={"150%"} />}
        placement="bottom"
        style={{width:"90%"}}
      >
        <option value="default2" disabled>
          Long Drives are better
        </option>
        <option value="option1">Mahabaleshwar</option>
        <option value="option2">Ratnagiri</option>
        <option value="option3">Lonavla</option>
      </Select>
    </Box>
    <Box>
      <Select
        defaultValue="default3"
        icon={<Image src="https://doav52ie4cv60.cloudfront.net/images/get-paid-ico.svg" boxSize="20px"  fontSize={"150%"}  />}
        placement="bottom"
        style={{width:"90%"}}
      >
        <option value="default3" disabled>
          Professional Places
        </option>
        <option value="option1">Kharadi</option>
        <option value="option2">Hinjewadi</option>
        <option value="option3">Baner</option>
      </Select>
    </Box>
    <Box>
      <Select
        defaultValue="default4"
        icon={<Image src="https://doav52ie4cv60.cloudfront.net/images/car-price-ico.svg" boxSize="20px" fontSize={"150%"}  />}
        placement="bottom"
        style={{width:"90%"}}
      >
        <option value="default4" disabled>
          Places of Education
        </option>
        <option value="option1">University</option>
        <option value="option2">Symbiosis</option>
        <option value="option3">COEP</option>
      </Select>
    </Box>
  </Grid>

  )
}

export default PopularPlaces