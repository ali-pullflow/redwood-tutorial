import { Box, Flex, Heading, Button, ChakraLink, space, Spacer, ButtonGroup } from '@chakra-ui/react';
import { Link, routes, useLocation } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

const Header = ({ children }) => {
  const { logOut, isAuthenticated, currentUser, hasRole } = useAuth();
  const location = useLocation();
  const isPage = ( page ) => {
    console.log(location.pathname);
    return location.pathname === page;
  };
  return (
    <Box bg="gray.800" color="white" py={4}>
      <Flex maxW="container.xl" mx="auto" justify={'space-between'} px={4}>
        <Link to={routes.home()}>
        <Heading as="h1" size="lg">
          Redwood Blog
        </Heading>
        </Link>
        <Spacer />
        <ButtonGroup>
        {hasRole('admin') && (
          <Link to={routes.users()}>
            <Button colorScheme="teal">Admin Portal</Button>
          </Link>
        )}
        {/* {(isPage('/users') || isPage('/users/new')) && (
          <Link to={routes.newUser()}>
            <Button colorScheme="teal">Create User</Button>
          </Link>
        )} */}
            {hasRole('admin') && (
              <Link to={routes.posts()}>
                <Button colorScheme="teal">Blog Portal</Button>
              </Link>
            )}
        {/* {(isPage('/admin/posts') || isPage('/admin/posts/new')) && (
          <Link to={routes.newPost()}>
            <Button colorScheme="teal">Create Post</Button>
          </Link>
        )} */}
        {(isPage('/') || isPage('/about') || isPage('/contact')) && [(
          <Link to={routes.about()}>
      <Button colorScheme="teal">About</Button>
      </Link>),
          (<Link to={routes.contact()}>
            <Button colorScheme="teal">Contact</Button>
          </Link>
        )]}

        {isAuthenticated ? (
          <Button colorScheme="teal" onClick={logOut}>
            Log Out
          </Button>
        ) : (
          isPage('/login') ? (
            <Link to={routes.signup()}>
              <Button colorScheme="teal">Sign Up</Button>
            </Link>
          ) : (
            <Link to={routes.login()}>
              <Button colorScheme="teal">Sign In</Button>
            </Link>
          )
        )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Header;
