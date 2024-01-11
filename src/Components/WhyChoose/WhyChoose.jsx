import React from 'react'
import { Container, Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
const WhyChoose = () => {
  return (
   
      <Flex flexWrap={["wrap", "wrap", "nowrap"]} mt={"100px"} mb={"50px"} ml={"10%"} >
        <Box p={4} flexBasis={["100%", "100%", "30%"]} textAlign={"start"}>
          <Heading as="h2" fontSize="2xl" mb={4}>
            Why Choose Our Website?
          </Heading>
          <Text fontSize="lg" w={"70%"}>
            We offer a variety of compelling reasons why you should choose our car rental service.
          </Text>
        </Box>
        <Flex p={4} flexBasis={["100%", "100%", "70%"]} justifyContent={"center"}>
          <Box textAlign="start" mb={4} flexBasis={["100%", "100%", "30%"]}>
            <Image src="https://doav52ie4cv60.cloudfront.net/images/repair.svg" alt="Icon 1" boxSize="40px" mb={2} />
            <Heading as="strong" fontSize="lg" mb={2} textAlign={"start"}>
              Accessible
            </Heading>
            <Text>Competitive rates for all types of vehicles.</Text>
          </Box>

          <Box textAlign="start" mb={4} flexBasis={["100%", "100%", "30%"]}>
            <Image src="https://doav52ie4cv60.cloudfront.net/images/earning.svg" alt="Icon 2" boxSize="40px" mb={2} />
            <Heading as="strong" fontSize="lg" mb={2}>
              Secure
            </Heading>
            <Text>Pay 0 security deposit, get unlimited KMs</Text>
          </Box>

          <Box textAlign="start" flexBasis={["100%", "100%", "30%"]}>
            <Image src="https://doav52ie4cv60.cloudfront.net/images/flexibility.svg" alt="Icon 3" boxSize="40px" mb={2} />
            <Heading as="strong" fontSize="lg" mb={2}>
              Convenient
            </Heading>
            <Text>From Hatchbacks to SUVs, choose from 25,000+ cars</Text>
          </Box>
        </Flex>
      </Flex>
 

  )
}

export default WhyChoose