import React from 'react';
import {Box,Text,
  Link,
  Button,
  Stack,SimpleGrid} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
function Footer() {
    const indianCities = [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Kolkata",
      "Chennai",
      "Pune",
      "Ahmedabad",
      "Jaipur",
      "Lucknow",
    ];
    return (
     <Box bg="gray.900" color="white" py="8">
       <Stack
      direction={{ base: "column", md: "row" }}
      spacing={{ base: 2, md: 2 }}
      align="center"
      justifyContent={"space-around"}
    >
      <Link to="/about" as={RouterLink} _hover={{color:"blue.400"}}>
        <Button colorScheme="teal" variant="soft-rounded">
          About Us
        </Button>
      </Link>
      <Link to="/careers"as={RouterLink} _hover={{color:"blue.400"}}>
        <Button colorScheme="teal" variant="soft-rounded">
          CAREERS
        </Button>
      </Link>
      <Link to="/blogs" as={RouterLink} _hover={{color:"blue.400"}}>
        <Button colorScheme="teal" variant="soft-rounded">
          BLOGS
        </Button>
      </Link>
      <Link to="/help" as={RouterLink} _hover={{color:"blue.400"}}>
        <Button colorScheme="teal" variant="soft-rounded">
          HELP & SUPPORT
        </Button>
      </Link>
    </Stack>
      <Stack mt="10">
        <Text fontSize="lg" fontWeight="bold">
          Cities We Serve
        </Text>
        <SimpleGrid columns={{ base: 3, md: 5 }} gap="2">
          {indianCities.map((city, index) => (
            <Text key={index} cursor={"pointer"}  _hover={{color:"blue.100"}}>{city}</Text>
          ))}
        </SimpleGrid>
      </Stack>
      <SimpleGrid columns={{ base: 3, md: 5 }} gap="4" mt="10" >
        <Link href="#" fontSize="2xl" display={"flex"} justifyContent={"center"} _hover={{fontSize:"210%"}}>
          <FaFacebook />
        </Link>
        <Link href="#" fontSize="2xl" display={"flex"} justifyContent={"center"} _hover={{fontSize:"210%"}}>
          <FaInstagram />
        </Link>
        <Link href="#" fontSize="2xl" display={"flex"} justifyContent={"center"} _hover={{fontSize:"210%"}}>
          <FaTwitter />
        </Link>
        <Link href="#" fontSize="2xl" display={"flex"} justifyContent={"center"} _hover={{fontSize:"210%"}}>
          <FaYoutube />
        </Link>
        <Link href="#" fontSize="2xl" display={"flex"} justifyContent={"center"} _hover={{fontSize:"210%"}}>
          <FaLinkedin />
        </Link>
      </SimpleGrid>
    </Box>
    );
  }
  
  export default Footer;
  