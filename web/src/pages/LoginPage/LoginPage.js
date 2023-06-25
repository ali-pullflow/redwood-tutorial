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
  Container
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import Header from 'src/components/Header/Header';

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  function validateEmail(value) {
    let error
    if (!value) {
      error = 'Email is required'
    }
    return error
  }

  function validatePassword(value) {
    let error
    if (!value) {
      error = 'Password required'
    }
    return error
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <header py={4} px={8} bg="blue.700" color="white">
        <Header />
      </header>
      <MetaTags title="Login" />
      <Container maxW="xl" py={8}>
        <main>
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <div className="rw-scaffold rw-login-container">
            <div className="rw-segment">
              <header className="rw-segment-header">
                <Heading as='h1' size='xl' textAlign='center' mb={8}>
                  Login
                </Heading>
              </header>
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={onSubmit}
              >
                {(props) => (
                  <Form>
                    <Field name='username' validate={validateEmail}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                          <FormLabel>Email</FormLabel>
                          <Input {...field} placeholder='email' />
                          <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='password' validate={validatePassword}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.password && form.touched.password}>
                          <FormLabel>Password</FormLabel>
                          <InputGroup size='md'>
                            <Input
                              pr='4.5rem'
                              type={show ? 'text' : 'password'}
                              {...field}
                              placeholder='password'
                            />
                            <InputRightElement width='4.5rem'>
                              <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Link
                      to={routes.forgotPassword()}
                      className="rw-forgot-link underline"
                    >
                      Forgot Password?
                    </Link>
                    <div className="rw-form-buttons">
                      <Button
                        mt={4}
                        colorScheme='teal'
                        isLoading={props.isSubmitting}
                        type='submit'
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="rw-login-link mt-2 text-center">
              <span>Don&apos;t have an account?</span>{' '}
              <Link to={routes.signup()} className="rw-link">
                Sign up!
              </Link>
            </div>
          </div>
        </main>
      </Container>
    </>
  )
}

export default LoginPage
