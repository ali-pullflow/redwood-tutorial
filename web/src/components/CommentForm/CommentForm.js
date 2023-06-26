import { useState } from 'react'

import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

import { useAuth } from 'src/auth'
import { isConstValueNode } from 'graphql';

const CREATE = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      name
      body
      createdAt
    }
  }
`

const CommentForm = ({ postId }) => {
  const { currentUser } = useAuth();
  function validateName(value) {
    let error
    if (!value) {
      error = 'Name is required'
    }
    return error
  }

  function validateBody(value) {
    let error
    if (!value) {
      error = 'Comment is required'
    }
    return error
  }

  const [hasPosted, setHasPosted] = useState(false)
  const [createComment, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      setHasPosted(true)
      toast.success('Thank you for your comment!')
    },
    refetchQueries: [{ query: CommentsQuery, variables: { postId } }],
  })

  const onSubmit = (input) => {
    console.log(input)
    createComment({ variables: { input: { postId, ...input } } })
  }

  return (
    <div className={hasPosted ? 'hidden' : ''}>
      <h3 className="font-light text-lg text-gray-600">Leave a Comment</h3>
      <Formik
      initialValues={{ name: currentUser?.name || '', body: '' }}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Form>
          {console.log(currentUser)}
          <Field name='name' validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Name</FormLabel>
                <Input {...field} placeholder='name' maxW={200}/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='body' validate={validateBody}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.body && form.touched.body}>
                <FormLabel>Comment</FormLabel>
                <Textarea {...field} placeholder='comment' />
                <FormErrorMessage>{form.errors.body}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme='teal'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default CommentForm;