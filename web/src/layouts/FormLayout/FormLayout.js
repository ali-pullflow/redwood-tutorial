import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import {
  Link as ChakraLink,
  Box,
  Flex,
  Heading,
  Button,
  Text,
} from '@chakra-ui/react';

import { useAuth } from 'src/auth'
import Header from 'src/components/Header/Header';

import { Container } from '@chakra-ui/react';

const FormLayout = (props) => {
  const { logOut, isAuthenticated, currentUser, hasRole } = useAuth();

  return (

    <>
      <Toaster />
      <header py={4} px={8} bg="blue.700" color="white">
        <Header/>

      </header>
      <Container maxW="container.xl" my={'100'}>
        {props.children}
      </Container>
      </>
  )
}

export default FormLayout
