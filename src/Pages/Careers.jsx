import React from 'react'
import {
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Box,
  GridItem,
  Button,
} from "@chakra-ui/react";
const Careers = () => {
    const jobOpenings = [
        {
          title: 'Car Rental Agent',
          location: 'Multiple Locations',
          description: 'We are looking for enthusiastic Car Rental Agents to join our team. As a Car Rental Agent, you will assist customers in renting the perfect vehicle for their needs.',
        },
        {
          title: 'Customer Support Specialist',
          location: 'Remote',
          description: 'Join our Customer Support team and help our customers have a smooth and enjoyable rental experience. If you have excellent communication skills and love helping people, this role is for you.',
        },
        {
          title: 'Fleet Maintenance Technician',
          location: 'Kolkata, India',
          description: 'Our fleet is the heart of our business, and we need skilled Fleet Maintenance Technicians to keep our vehicles in top condition. If you are experienced in automotive maintenance, apply today.',
        },
        {
          title: 'Marketing Manager',
          location: 'Mumbai, India',
          description: 'As a Marketing Manager, you will lead our marketing efforts to attract and engage customers. If you have a passion for marketing and a creative mindset, we want you on our team.',
        },
      ];
  return (
    <Container maxW="container.lg" p={4} textAlign={"start"} mt={"5%"} mb={"5%"}>
    <VStack spacing={4} align="center">
      <Heading as="h1" size="xl">
        Join Our Team
      </Heading>
      <Text fontSize="lg">
        We're always on the lookout for talented individuals to join our team and help us provide exceptional car rental services. Explore our current job openings below.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
        {jobOpenings.map((job, index) => (
          <GridItem key={index}>
            <Box borderWidth="1px" borderRadius="md" p={4} textAlign={"start"}>
              <Heading as="h2" size="lg" mb={2}>
                {job.title}
              </Heading>
              <Text fontSize="md" fontWeight="bold">
                Location: {job.location}
              </Text>
              <Text fontSize="md">
                {job.description}
              </Text>
              <Button
                colorScheme="teal"
                variant="outline"
                mt={2}
                onClick={() => window.location.href = '#'}
              >
                Apply Now
              </Button>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
      <Text fontSize="lg" mt={4} color={"blue.500"} fontWeight={"bold"}> 
        To apply, please send your resume and cover letter to careers@rentaride.com with the job title in the subject line.
      </Text>
    </VStack>
  </Container>
  )
}

export default Careers