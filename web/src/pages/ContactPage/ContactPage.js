import { MetaTags } from '@redwoodjs/web'
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


import { Field, Form, Formik } from 'formik';
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  // const formMethods = useForm()

  function validateEmail(value) {
    let error
    if (!value) {
      error = 'Email is required'
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

  function validateMessage(value) {
    let error
    if (!value) {
      error = 'Please type a message'
    }
    return error
  }

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
    console.log(data)
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <Container maxW="xl" py={8}>
      <main className="rw-main w-96 mx-auto mt-12">
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
              <header className="rw-segment-header">
                <Heading as='h2' size='lg' fontWeight='bold'>
                  Contact
                </Heading>
              </header>
              <Box maxW="sm" mx="auto" p={4} borderWidth={1} borderRadius="md" boxShadow="md" bgColor={'whiteAlpha.300'}>
              <Formik
                initialValues={{ name: '', email: '', message: '' }}
                onSubmit={onSubmit}
                formMethods={formMethods}
              >
                {(props) => (
                  <Form>
                    <Field name='name' validate={validateName}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                          <FormLabel>Name</FormLabel>
                          <Input {...field} placeholder='name' />
                          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='email' validate={validateEmail}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                          <FormLabel>Email</FormLabel>
                          <Input {...field} placeholder='email' />
                          <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='message' validate={validateMessage}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.message && form.touched.message}>
                          <FormLabel>Message</FormLabel>
                          <Textarea {...field} placeholder='message' />
                          <FormErrorMessage>{form.errors.message}</FormErrorMessage>
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

export default ContactPage
