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

import Header from 'src/components/Header/Header';

import { useAuth } from 'src/auth'

const BlogLayout = ({ children }) => {
  const { logOut, isAuthenticated, currentUser, hasRole } = useAuth();

  return (
    <>
      <Toaster />
        <Header/>
      <Box maxW="8xl" mx="auto" p={12} bg="white" shadow="md" rounded="md" mt={8} mb={8}>
        {children}
            {isAuthenticated && (
              <Text
                fontSize="xs"
                color="blue.300"
                className="absolute bottom-2 text-xs text-blue-300"
              >
                {currentUser.email}
              </Text>
            )}
      </Box>
    </>
  );a
};

export default BlogLayout;
