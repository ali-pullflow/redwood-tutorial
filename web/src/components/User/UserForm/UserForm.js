import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
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
  Select,
  ButtonGroup,
  Spacer
} from '@chakra-ui/react';

import { Field, Form, Formik } from 'formik';
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { navigate, routes, Link } from '@redwoodjs/router'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const UserForm = (props) => {
  const [submitting, setSubmitting] = useState(false);
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

  const onSubmit = (data) => {
    console.log(data)
    props.onSave(data, props?.user?.id)
  }

  return (
    <>
      <MetaTags title={props.user ? 'Edit User' : 'New User'} />
        <Box maxW="sm" mx="auto" p={4} borderWidth={1} borderRadius="md" boxShadow="md" bgColor={'whiteAlpha.300'}>
          <Formik
            initialValues={{ name: props.user?.name, email: props.user?.email, roles: props.user?.roles }}
            onSubmit={onSubmit}
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
                <Field name='roles'>
                  {({ field, form }) => (
                <FormControl>
                  {console.log(props.user?.roles)}
                  <FormLabel>Role</FormLabel>
                  <Select {...field}>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="user">User</option>
                  </Select>
                </FormControl>
                  )}
                </Field>
                <ButtonGroup>
                  <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit'
                    isLoading={props.isSubmitting}
                  >
                    Submit
                  </Button>
                  <Link to={routes.users()}>
                  <Button
                    mt={4}
                    variant="outline"
                    colorScheme="red"
                  >
                    Cancel
                  </Button>
                  </Link>

                </ButtonGroup>
              </Form>
            )}
          </Formik>
        </Box>
    </>
  )
}

export default UserForm
