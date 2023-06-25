import { MetaTags } from '@redwoodjs/web'
import { useState, useEffect, useRef } from 'react'
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  Heading,
  Container,
  Box,
} from '@chakra-ui/react';

import { Field, Form, Formik } from 'formik';
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { routes, Link, navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Header from 'src/components/Header/Header';

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

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

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // const usernameRef = useRef()

  // useEffect(() => {
  //   usernameRef.current.focus()
  // }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
    <Header/>
    <MetaTags title="Forgot Password" description="Forgot Password"/>
    <Container maxW="xl" py={8}>
    <main className="rw-main w-96 mx-auto mt-12">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-segment-header">
        <Heading as='h2' size='lg' fontWeight='bold'>
          Forgot Password?
        </Heading>
      </header>
      <Box maxW="sm" mx="auto" p={4} borderWidth={1} borderRadius="md" boxShadow="md" bgColor={'whiteAlpha.300'}>
        <Formik
          initialValues={{ username: ''}}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field name='username' validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.username && form.touched.username}>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder='email' />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
      </Box>
    </main>
  </Container>
  </>
  )
}

export default ForgotPasswordPage
