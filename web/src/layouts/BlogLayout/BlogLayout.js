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
      <header py={4} px={8} bg="blue.700" color="white">
          <Header/>
            {isAuthenticated && (
              <Text
                fontSize="xs"
                color="blue.300"
                className="absolute bottom-1 right-0 mr-12 text-xs text-blue-300"
              >
                {currentUser.email}
              </Text>
            )}
      </header>
      <Box maxW="4xl" mx="auto" p={12} bg="white" shadow="md" rounded="md">
        {children}
      </Box>
    </>
  );
};

export default BlogLayout;
