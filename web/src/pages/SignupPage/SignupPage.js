import { useRef } from 'react'
import { useEffect } from 'react'

import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  InputGroup,
  InputRightElement,
  Heading,
  Container,
  Box,
} from '@chakra-ui/react';
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Header from 'src/components/Header/Header'
import { Field, Form, Formik } from 'formik';

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  function validateEmail(value) {
    let error
    if (!value) {
      error = 'Email is required'
    }
    else if (!value.match(/[^@]+@[^.]+\..+/)) {
      error = 'Please enter a valid email address'
    }
    return error
  }
  function validateName(value) {
    let error
    if (!value) {
      error = 'Name is required'
    }
    return error
  }

  function validatePassword(value) {
    let error
    if (!value) {
      error = 'Password is required'
    }
    return error
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
    <header py={4} px={8} bg="blue.700" color="white">
      <Header />
    </header>
      <MetaTags title="Signup" />
      <Container maxW="xl" py={8}>
      <main className="rw-main w-96 mx-auto mt-12">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

            <header className="rw-segment-header">
              <Heading as="h2" size="lg" fontWeight="bold">
                Sign Up
              </Heading>
            </header>
            <Box maxW="sm" mx="auto" p={4} borderWidth={1} borderRadius="md" boxShadow="md" bgColor={'whiteAlpha.300'}>
              <Formik
                initialValues={{ name: '', email: '', password: '' }}
                onSubmit={onSubmit}
              >
              {(props) => (
                <Form>
                  <Field name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} id="name" placeholder="Name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="username" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.username && form.touched.username}>
                        <FormLabel>Email</FormLabel>
                        <Input {...field} id="username" placeholder="Email"
                        // pattern='/[^@]+@[^.]+\..+/'
                        />
                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <Input {...field} id="password" placeholder="Password" />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                    Submit
                  </Button>

                </Form>
              )
                    }
              </Formik>
            </Box>
          <div className="rw-login-link mt-2 text-center">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
      </main>
      </Container>
    </>
  )
}

export default SignupPage
