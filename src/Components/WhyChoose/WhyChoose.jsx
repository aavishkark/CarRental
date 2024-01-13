import React from 'react'
import { Heading, Text, Image, Grid, GridItem } from "@chakra-ui/react";
const WhyChoose = () => {
  return (
      <Grid w={"80%"} m="auto" mt={"8%"} mb={"7%"} templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(4, 1fr)' }} gap={4} color={"white"}>
        <GridItem textAlign={"start"} bg={"blue.500"} p={"5%"} borderRadius={"10px"}>
          <Heading as="h2" fontSize="2xl" mb={4} w={'80%'}>
            Why Choose Our Website?
          </Heading>
          <Text fontSize="lg" w={'80%'}>
            We offer a variety of compelling reasons why you should choose our car rental service.
          </Text>
        </GridItem>
          <GridItem textAlign={"start"} bg={"blue.400"} p={"5%"} borderRadius={"10px"}>
            <Image src="https://doav52ie4cv60.cloudfront.net/images/repair.svg" alt="Icon 1" mb={2} />
            <Heading as="strong" fontSize="lg" mb={2}>
              Accessible
            </Heading>
            <Text w={'80%'}>Competitive rates for all types of vehicles.</Text>
          </GridItem>

          <GridItem textAlign={"start"} bg={"blue.400"} p={"5%"} borderRadius={"10px"}>
            <Image src="https://doav52ie4cv60.cloudfront.net/images/earning.svg" alt="Icon 2" boxSize="40px" mb={2} />
            <Heading as="strong" fontSize="lg" mb={2}>
              Secure
            </Heading>
            <Text w={'80%'}>Pay 0 security deposit, get unlimited KMs</Text>
          </GridItem>

          <GridItem textAlign={"start"} bg={"blue.400"} p={"5%"} borderRadius={"10px"}>
            <Image src="https://doav52ie4cv60.cloudfront.net/images/flexibility.svg" alt="Icon 3" boxSize="40px" mb={2} />
            <Heading as="strong" fontSize="lg" mb={2}>
              Convenient
            </Heading>
            <Text w={'80%'}>From Hatchbacks to SUVs, choose from 25,000+ cars</Text>
          </GridItem>
      </Grid>
 

  )
}

export default WhyChoose