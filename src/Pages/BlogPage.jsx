import React from "react";
import {
  Container,
  VStack,
  Heading,
  SimpleGrid,
  Box,
  GridItem,
  Text,
} from "@chakra-ui/react";

const BlogPage = () => {
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
  return (
    <Container maxW="container.lg" p={4} mt={"5%"} mb={"5%"}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl">
          Our Blogs
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
          {blogPosts.map((post, index) => (
            <GridItem key={index}>
              <Box borderWidth="1px" borderRadius="md" p={4} textAlign={"start"}>
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
  );
};

export default BlogPage;
