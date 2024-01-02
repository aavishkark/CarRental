import React, { useState} from 'react';
import {Box,Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Link,
  Stack,VStack,Heading,Container,SimpleGrid,GridItem,Button,Accordion,AccordionItem,AccordionButton,AccordionPanel } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
function Footer() {

    const [selectedTab, setSelectedTab] = useState("aboutUs");

    const handleTabChange = (tabId) => {
      setSelectedTab(tabId);
    };
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

    const blogPosts = [
      {
        title: 'Tips for a Smooth Car Rental Experience',
        date: 'August 15, 2023',
        author: 'John Doe',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac justo id elit vehicula posuere.',
      },
      {
        title: 'Exploring the Best Road Trip Destinations',
        date: 'July 25, 2023',
        author: 'Jane Smith',
        content: 'Vestibulum faucibus libero eget justo vestibulum, eget euismod turpis ultrices. Sed ultrices sagittis augue.',
      },
      {
        title: 'Choosing the Right Rental Vehicle for Your Trip',
        date: 'June 10, 2023',
        author: 'Michael Johnson',
        content: 'Pellentesque et mi eu erat volutpat euismod. Sed nec ex ut purus auctor varius vel et eros.',
      },
    ];
    const faqs = [
      {
        question: 'How do I make a reservation?',
        answer: 'You can make a reservation by logging into your customer account and selecting the desired car, location, and rental dates. Follow the on-screen instructions to complete your reservation.',
      },
      {
        question: 'What is the cancellation policy?',
        answer: 'Our cancellation policy allows for free cancellations up to 24 hours before your rental start time. After that, a cancellation fee may apply.',
      },
      {
        question: 'How can I contact customer support?',
        answer: 'You can reach our customer support team by phone at (123) 456-7890 or via email at support@ourcarrental.com. Our team is available 24/7 to assist you.',
      },
    ];
    return (
      <div>
     <Box bg="gray.900" color="white" py="8">
      <Tabs colorScheme="teal" variant="soft-rounded" isFitted>
        <TabList>
          <Tab onClick={() => handleTabChange("aboutUs")}>About Us</Tab>
          <Tab onClick={() => handleTabChange("careers")}>CAREERS</Tab>
          <Tab onClick={() => handleTabChange("blogs")}>BLOGS</Tab>
          <Tab onClick={() => handleTabChange("helpSupport")}>HELP & SUPPORT</Tab>
        </TabList>
        <TabPanels>
        <TabPanel>
            <Text> <Container maxW="container.lg" p={4}>
            <VStack spacing={4} align="center" p={8} bg="gray.900" borderRadius="md">
  <Heading as="h1" size="xl" fontWeight="bold" color="teal.500">
    About Our Car Rental Service
  </Heading>
  <Text fontSize="lg" textAlign="center" color="white" >
    At Our Car Rental, we strive to provide the best car rental experience to our customers. With a wide range of vehicles to choose from and convenient booking options, we make it easy for you to get on the road.{' '}
    
    Our mission is to offer affordable and reliable car rental services to travelers and locals alike. Whether you need a compact car for a quick city trip or a spacious SUV for a family vacation, we have the right vehicle for you.{' '}
    
    We take pride in our commitment to customer satisfaction, safety, and transparency. Our team is dedicated to ensuring that your rental experience is smooth and hassle-free.{' '}
    
    Thank you for choosing Our Car Rental. We look forward to serving you on your next journey!
  </Text>
</VStack>


    </Container></Text>
          </TabPanel>
          <TabPanel>
            <Text>    <Container maxW="container.lg" p={4}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl">
          Join Our Team
        </Heading>
        <Text fontSize="lg">
          We're always on the lookout for talented individuals to join our team and help us provide exceptional car rental services. Explore our current job openings below.
        </Text>
        <SimpleGrid columns={1} spacing={4} width="100%">
          {jobOpenings.map((job, index) => (
            <GridItem key={index}>
              <Box borderWidth="1px" borderRadius="md" p={4}>
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
                  onClick={() => window.location.href = '/apply'}
                >
                  Apply Now
                </Button>
              </Box>
            </GridItem>
          ))}
        </SimpleGrid>
        <Text fontSize="lg" mt={4}>
          To apply, please send your resume and cover letter to careers@carrentalwebsite.com with the job title in the subject line.
        </Text>
        <Text fontSize="lg">
          We look forward to welcoming you to our team!
        </Text>
      </VStack>
    </Container></Text>
          </TabPanel>
          <TabPanel>
            <Text>
            <Container maxW="container.lg" p={4}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl">
          Our Blog
        </Heading>
        <SimpleGrid columns={1} spacing={4} width="100%">
          {blogPosts.map((post, index) => (
            <GridItem key={index}>
              <Box borderWidth="1px" borderRadius="md" p={4}>
                <Heading as="h2" size="lg" mb={2}>
                  {post.title}
                </Heading>
                <Text fontSize="md" fontWeight="bold">
                  Date: {post.date}
                </Text>
                <Text fontSize="md" fontWeight="bold">
                  Author: {post.author}
                </Text>
                <Text fontSize="md">
                  {post.content}
                </Text>
              </Box>
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
            </Text>
          </TabPanel>
          <TabPanel>
            <Text> <Container maxW="container.lg" p={4}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl">
          Help and Support
        </Heading>
        <Accordion width="100%" allowMultiple>
          {faqs.map((faq, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {faq.question}
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {faq.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Container></Text>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Social Media Links */}
      <SimpleGrid columns={{ base: 1, md: 5 }} gap="4" mt="4" ml={{ base: 0, md: 150 }}>
        <Link href="#" fontSize="2xl">
          <FaFacebook />
        </Link>
        <Link href="#" fontSize="2xl">
          <FaInstagram />
        </Link>
        <Link href="#" fontSize="2xl">
          <FaTwitter />
        </Link>
        <Link href="#" fontSize="2xl">
          <FaYoutube />
        </Link>
        <Link href="#" fontSize="2xl">
          <FaLinkedin />
        </Link>
      </SimpleGrid>

      {/* Cities Section */}
      <Stack mt="4">
        <Text fontSize="lg" fontWeight="bold">
          Cities
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="2">
          {indianCities.map((city, index) => (
            <Text key={index}>{city}</Text>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
      </div>
    );
  }
  
  export default Footer;
  