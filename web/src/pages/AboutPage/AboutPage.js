import { MetaTags } from '@redwoodjs/web'
import { Box, Heading, Text } from '@chakra-ui/react'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />

      {/* <Box> */}
      <Heading as="h1" size="xl" mb={4}>
        About Us
      </Heading>
      <Text fontSize="lg">
        Welcome to our website! We are a team of passionate individuals dedicated to providing high-quality products
        and services to our customers. With years of experience in the industry, we strive to deliver innovative solutions
        and exceed customer expectations.
      </Text>
      <Text fontSize="lg" mt={4}>
        Our mission is to empower individuals and businesses with cutting-edge technology, enabling them to achieve their
        goals and succeed in a rapidly evolving digital world.
      </Text>
      <Text fontSize="lg" mt={4}>
        We value collaboration, integrity, and continuous learning. Our team is committed to delivering exceptional
        results and building long-lasting relationships with our clients.
      </Text>
    {/* </Box> */}
    </>
  )
}

export default AboutPage
