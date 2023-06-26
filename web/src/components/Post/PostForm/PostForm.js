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

import { routes, Link } from '@redwoodjs/router';

import { Field, Form, Formik } from 'formik';

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const PostForm = (props) => {

  function validateTitle(value) {
    let error
    if (!value) {
      error = 'Title is required'
    }
    return error
  }

  function validateBody(value) {
    let error
    if (!value) {
      error = 'Post body cannot be empty'
    }
    return error
  }
  const onSubmit = (data) => {
    props.onSave(data, props?.post?.id)
  }

  return (
    <MetaTags title={props.post ? 'Edit Post ' + props.post.id : 'New Post'}>
      <Box mx="auto" p={4} borderWidth={1} borderRadius="md" boxShadow="md" bgColor={'whiteAlpha.300'}>
        <Formik
          initialValues={{ title: props.post?.title, body: props.post?.body, createdAt: formatDatetime(props.post?.createdAt), updatedAt: formatDatetime(props.post?.updatedAt) }}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field name='title' validate={validateTitle}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.title && form.touched.title}>
                    <FormLabel>Title</FormLabel>
                    <Input {...field} placeholder='title' />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='body' validate={validateBody}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.body && form.touched.body}>
                    <FormLabel>Body</FormLabel>
                    <Textarea {...field} placeholder='body' />
                    <FormErrorMessage>{form.errors.body}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <ButtonGroup>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Save
              </Button>
              <Link to={routes.posts()}>
              <Button
                mt={4}
                colorScheme="red"
                variant={'outline'}
              >
                Cancel
              </Button>
              </Link>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Box>
    </MetaTags>
  )
}

export default PostForm
