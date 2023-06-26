import { Box, Flex, Heading, Button, ChakraLink, space, Spacer, ButtonGroup, Avatar, Breadcrumb, BreadcrumbLink, BreadcrumbItem, Tooltip, Menu, MenuButton, MenuList, MenuItem, useBreakpointValue } from '@chakra-ui/react';
import { Link, routes, useLocation } from '@redwoodjs/router';
import { render } from 'react-dom';

import { useAuth } from 'src/auth';

import { CloseIcon } from '@chakra-ui/icons';

const Header = ({ children }) => {
  const { logOut, isAuthenticated, currentUser, hasRole } = useAuth();
  const location = useLocation();
  const isPage = ( page ) => {
    console.log(location.pathname);
    if (location.pathname.includes('/article') || location.pathname.includes('/post') || location.pathname.includes('/user'))
      return true;
    return location.pathname === page;
  };

  const renderAvatar = () => {
    if (isAuthenticated) {
      return (
        <Menu>
          <MenuButton>
            <Avatar size="sm" mt={-1} />
          </MenuButton>
          <MenuList color={'gray'}>
            <MenuItem as={Link} to={routes.users()}>
              Admin Portal
            </MenuItem>
            <MenuItem as={Link} to={routes.posts()}>
              Blog Portal
            </MenuItem>
            <MenuItem as={Link} to={routes.about()}>
              About
            </MenuItem>
            <MenuItem as={Link} to={routes.contact()}>
              Contact
            </MenuItem>
            <MenuItem color={'red.500'} onClick={logOut} icon={<CloseIcon/>}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      );
    } else if (isPage('/login')) {
      return (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={routes.signup()}>
            Sign Up
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    } else {
      return (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={routes.login()}>
            Sign In
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    }
  };

  // Check the breakpoint value to determine whether to show or hide the breadcrumbs
  const showBreadcrumbs = useBreakpointValue({ base: false, md: true });

  return (
    <Box position="fixed"
    top="0"
    left="0"
    right="0"
    bg="gray.800"
    color="white"
    p={2}
    zIndex={10}>
      <Flex justify={'space-between'} ml={10} mr={10}>
        <Link to={routes.home()}>
          <Heading as="h1" size="lg" mt={1}>
            Redwood Blog
          </Heading>
        </Link>
        <Spacer />
        <Flex mr={200}>
          {showBreadcrumbs && (
            <Breadcrumb mt={3}>
              {hasRole('admin') && [
                <BreadcrumbItem key="admin-portal">
                  <BreadcrumbLink as={Link} to={routes.users()}>
                    Admin Portal
                  </BreadcrumbLink>
                </BreadcrumbItem>,
                <BreadcrumbItem key="blog-portal">
                  <BreadcrumbLink as={Link} to={routes.posts()}>
                    Blog Portal
                  </BreadcrumbLink>
                </BreadcrumbItem>,
              ]}
              {(isPage('/') || isPage('/about') || isPage('/contact')) && [
                <BreadcrumbItem key="about">
                  <BreadcrumbLink as={Link} to={routes.about()}>
                    About
                  </BreadcrumbLink>
                </BreadcrumbItem>,
                <BreadcrumbItem key="contact">
                  <BreadcrumbLink as={Link} to={routes.contact()}>
                    Contact
                  </BreadcrumbLink>
                </BreadcrumbItem>,
              ]}
            </Breadcrumb>
          )}
        </Flex>
        <Breadcrumb mt={3}>
          {renderAvatar()}
        </Breadcrumb>
      </Flex>
    </Box>
  );
};

export default Header;
