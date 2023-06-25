import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import PostForm from 'src/components/Post/PostForm'

import { Container, Heading } from '@chakra-ui/react'

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`

const NewPost = () => {
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post created')
      navigate(routes.posts())
    },
  })

  const onSave = (input) => {
    createPost({ variables: { input } })
  }

  return (
    <Container maxW="container.sm">
      <main className="rw-main w-96 mx-auto mt-12">
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <header className="rw-segment-header">
            <Heading as='h2' size='lg' fontWeight='bold'>
              New Post
            </Heading>
          </header>
        <PostForm onSave={onSave} error={error} loading={loading} />
      </main>
      </Container>
  )
}

export default NewPost
