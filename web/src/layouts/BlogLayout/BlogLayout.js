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

const BlogLayout = ({ children }) => {
  const { logOut, isAuthenticated, currentUser, hasRole } = useAuth();

  return (
    <>
      <Toaster />
      <header py={4} px={8} bg="blue.700" color="white">
        <Flex justify="space-between" items="center">
          <Heading as="h1" size="xl" fontWeight="semibold" tracking="tight">
            <ChakraLink
              color="blue.400"
              _hover={{ color: 'blue.100' }}
              transition="color 0.1s"
              to={routes.home()}
              as={Link}
            >
              Redwood Blog
            </ChakraLink>
          </Heading>
          <nav>
            <Flex alignItems="center" fontWeight="light">
              <Box>
              {hasRole('admin') && (

                <ChakraLink
                as={Link}
                to={routes.newPost()}
                px={4}
                py={2}
                _hover={{ bg: 'blue.600' }}
                transition="background-color 0.1s"
                rounded="md"
                >
                  Create Post
                </ChakraLink>
                  )}
              </Box>
            <Box>
                <ChakraLink
                  as={Link}
                  to={routes.about()}
                  px={4}
                  py={2}
                  _hover={{ bg: 'blue.600' }}
                  transition="background-color 0.1s"
                  rounded="md"
                >
                  About
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink
                  as={Link}
                  to={routes.contact()}
                  px={4}
                  py={2}
                  _hover={{ bg: 'blue.600' }}
                  transition="background-color 0.1s"
                  rounded="md"
                >
                  Contact
                </ChakraLink>
              </Box>
              <Box>
                {isAuthenticated ? (
                  <Button type="button" onClick={logOut} py={2} px={4}>
                    Logout
                  </Button>
                ) : (
                  <ChakraLink as={Link} to={routes.login()} py={2} px={4}>
                    Login
                  </ChakraLink>
                )}
              </Box>
            </Flex>
            {isAuthenticated && (
              <Text
                fontSize="xs"
                color="blue.300"
                className="absolute bottom-1 right-0 mr-12 text-xs text-blue-300"
              >
                {currentUser.email}
              </Text>
            )}
          </nav>
        </Flex>
      </header>
      <Box maxW="4xl" mx="auto" p={12} bg="white" shadow="md" rounded="md">
        {children}
      </Box>
    </>
  );
};

export default BlogLayout;
