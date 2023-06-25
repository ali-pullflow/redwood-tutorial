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
        {/* <div className="rw-scaffold rw-login-container">
          <div className="rw-segment"> */}
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

            {/* <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                <Label
                    name="name"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Name
                  </Label>
                  <TextField
                    name="name"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"

                    validation={{
                      required: {
                        value: true,
                        message: 'Name is required',
                      },
                    }}
                  />

                  <FieldError name="name" className="rw-field-error" />

                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Email is required',
                      },

                  pattern: {
                    value: /[^@]+@[^.]+\..+/,
                    message: 'Please enter a valid email address',
                  },
                  }}
                  />

                  <FieldError name="username" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div> */}
          {/* </div> */}
          <div className="rw-login-link mt-2 text-center">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        {/* </div>/ */}
      </main>
      </Container>
    </>
  )
}

export default SignupPage
