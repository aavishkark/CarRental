import React from "react";
import {
  Container,
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";

const HelpPage = () => {
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
    {
      question: 'How can I extend my rental period?',
      answer: 'To extend your rental period, please log into your customer account or contact our customer support team. Extensions are subject to vehicle availability.',
    },
    {
      question: 'Are there any age restrictions for renting a car?',
      answer: 'Yes, renters must be at least 21 years old and possess a valid driver\'s license. Additional age-related charges may apply for drivers under 25.',
    },
    {
      question: 'What documents do I need to provide when picking up the rental car?',
      answer: 'You\'ll need to present a valid driver\'s license, a credit card in the renter\'s name, and any additional documents specified during the reservation process.',
    },
    {
      question: 'Can I add an additional driver to the reservation?',
      answer: 'Yes, additional drivers can be added to the reservation during the booking process or at the rental counter. Additional driver fees may apply.',
    },
    {
      question: 'What happens if the rental car breaks down?',
      answer: 'In the case of a breakdown, please contact our roadside assistance hotline provided in your rental agreement. We\'ll arrange for assistance and, if necessary, provide a replacement vehicle.',
    },
    {
      question: 'Is insurance included in the rental price?',
      answer: 'Basic insurance coverage is usually included, but you may choose to purchase additional coverage options during the reservation process. Review the terms carefully for details.',
    },
    {
      question: 'Can I pick up and return the car at different locations?',
      answer: 'One-way rentals are available, allowing you to pick up the car at one location and return it to another. Additional fees may apply, depending on the drop-off location.',
    },
  ];

  
  return (
    <Container maxW="container.lg" p={4} mt={"5%"} mb={"5%"}>
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
    </Container>
  );
};

export default HelpPage;
