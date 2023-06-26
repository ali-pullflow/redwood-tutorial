import { Box, Flex, Heading, Button, ChakraLink, space, Spacer, ButtonGroup, Avatar, Breadcrumb, BreadcrumbLink, BreadcrumbItem } from '@chakra-ui/react';
import { Link, routes, useLocation } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

const Header = ({ children }) => {
  const { logOut, isAuthenticated, currentUser, hasRole } = useAuth();
  const location = useLocation();
  const isPage = ( page ) => {
    console.log(location.pathname);
    if (location.pathname.includes('/article'))
      return true;
    return location.pathname === page;
  };
  return (
    <Box bg="gray.800" color="white" py={4}>
      <Flex justify={'space-between'} ml={10} mr={10}>
        <Link to={routes.home()}>
        <Heading as="h1" size="lg">
          Redwood Blog
        </Heading>
        </Link>
          <Spacer />
      <Flex mr={200}>
        <Breadcrumb>
        {hasRole('admin') && (
          <>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={routes.users()}>Admin Portal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={routes.posts()}>Blog Portal</BreadcrumbLink>
          </BreadcrumbItem>
          </>
            )}
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={routes.about()}>About</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={routes.contact()}>Contact</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {/* <ButtonGroup> */}

        {/* {hasRole('admin') && (
          <>
          <Link to={routes.users()}>
            <Button colorScheme="teal">Admin Portal</Button>
          </Link>

              <Link to={routes.posts()}>
                <Button colorScheme="teal">Blog Portal</Button>
              </Link>
              </>
            )} */}
        {/* {(isPage('/') || isPage('/about') || isPage('/contact')) && [(
          <Link to={routes.about()}>
      <Button colorScheme="teal">About</Button>
      </Link>),
          (<Link to={routes.contact()}>
            <Button colorScheme="teal">Contact</Button>
          </Link>
        )]}
        </ButtonGroup> */}
        </Flex>
        {isAuthenticated ? (
          // <Button colorScheme="teal" onClick={logOut}>
          //   Log Out
          // </Button>
          <Avatar name={currentUser.email} onClick={logOut}/>
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
      </Flex>
    </Box>
  );
};

export default Header;
