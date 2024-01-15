import React from 'react'
import { useState } from 'react';
import {Box,Flex,Text,Image,Grid,IconButton,} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@chakra-ui/react";
const Reviews = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const reviews = [
      {
        id: 1,
        name: "Rohit",
        image: "https://www.zoomcar.com/img/guest_one.png",
        review: "Great service! I had an amazing experience renting a car from this website.",
      },
      {
        id: 2,
        name: "Shyam",
        image: "https://www.zoomcar.com/img/guest_two.png",
        review: "Excellent car rental platform. I highly recommend it!",
      },
      {
        id: 3,
        name: "Badri",
        image: "https://www.zoomcar.com/img/guest_three.png",
        review: "Smooth and hassle-free car rental process. Will use again.",
      },
      {
        id: 4,
        name: "Esha",
        image: "https://www.zoomcar.com/img/guest_two.png",
        review: "The cars were clean and well-maintained. Top-notch service!",
      },
      {
        id: 5,
        name: "Manish",
        image: "https://www.zoomcar.com/img/guest_three.png",
        review: "Affordable prices and a wide range of car options. Loved it!",
      },
      {
        id: 6,
        name: "Sanjana",
        image: "https://www.zoomcar.com/img/guest_three.png",
        review: "Booking a car was so easy, and the staff was friendly.",
      },
      {
        id: 7,
        name: "Danish",
        image: "/daniel-clark.jpg",
        review: "Great selection of cars for every occasion. Impressed!",
      },
      {
        id: 8,
        name: "Omkar",
        image: "/olivia-davis.jpg",
        review: "I got a fantastic deal on a rental. It made my trip memorable.",
      },
      {
        id: 9,
        name: "Vansh",
        image: "/william-garcia.jpg",
        review: "A reliable car rental service that I can always count on.",
      },
      {
        id: 10,
        name: "Amit",
        image: "/ava-martinez.jpg",
        review: "The car was delivered on time, and it was in great condition.",
      },
      {
        id: 11,
        name: "Jamshed",
        image: "/james-anderson.jpg",
        review: "This is my go-to car rental platform. Never disappoints.",
      },
      {
        id: 12,
        name: "Esha",
        image: "/ella-harris.jpg",
        review: "I love the convenience of booking online. Great service!",
      },
    
    ];

    const totalSlides = Math.ceil(reviews.length / 3);
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };
    const displayReviews = reviews.slice(currentSlide * 3, (currentSlide + 1) * 3);
  return (
    <Box p="8" mt={"100px"} mb={"100px"}>
      <h2>What Our Users Have To Say</h2>
    <Flex justifyContent="space-between" alignItems="center">
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Previous"
        onClick={prevSlide}
        bg="teal.500"
        color="white"
        borderRadius="full"
        _hover={{ bg: "teal.600" }}
        _active={{ bg: "teal.700" }}
      />
      <Grid
       templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
       gap={6}
      >
        {displayReviews.map((review) => (
          <Card key={review.id} boxShadow="md">
            <CardHeader>
              <Image
                src={review.image}
                boxSize="80px"
                borderRadius="full"
                alt={`${review.name}'s profile`}
              />
            </CardHeader>
            <CardBody textAlign={"start"}>
              <Text fontWeight="bold" fontSize="lg" mb="2">
                {review.name}
              </Text>
              <Text>{review.review}</Text>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        ))}
      </Grid>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="Next"
        onClick={nextSlide}
        bg="teal.500"
        color="white"
        borderRadius="full"
        _hover={{ bg: "teal.600" }}
        _active={{ bg: "teal.700" }}
      />
    </Flex>
  </Box>  
  )
}

export default Reviews