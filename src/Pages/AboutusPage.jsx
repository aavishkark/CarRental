import React from "react";
import {
  Container,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

const AboutUsPage = () => {
  return (
 
      <VStack spacing={4} align="start" p={8} borderRadius="md" mt={"5%"} mb={"5%"} w={"70%"}>
        <Heading as="h1" size="xl" fontWeight="bold" color="black.500">
          About Our Car Rental Service
        </Heading>
        <Text fontSize="lg" textAlign="start" color="black">
          At Our Car Rental, we strive to provide the best car rental experience to our customers. With a wide range of vehicles to choose from and convenient booking options, we make it easy for you to get on the road.{' '}
          
          Our mission is to offer affordable and reliable car rental services to travelers and locals alike. Whether you need a compact car for a quick city trip or a spacious SUV for a family vacation, we have the right vehicle for you.{' '}
          
          We take pride in our commitment to customer satisfaction, safety, and transparency. Our team is dedicated to ensuring that your rental experience is smooth and hassle-free.{' '}
          
          Thank you for choosing Our Car Rental. We look forward to serving you on your next journey!
        </Text>
      </VStack>
  );
};

export default AboutUsPage;
