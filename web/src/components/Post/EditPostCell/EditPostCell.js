import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import PostForm from 'src/components/Post/PostForm'

import { Container, Heading } from '@chakra-ui/react'

export const QUERY = gql`
  query FindPostById($id: Int!) {
    post: adminPost(id: $id) {
      id
      title
      body
    }
  }
`
const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ post }) => {
  const [updatePost, { loading, error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post updated')
      navigate(routes.posts())
    },
  })

  const onSave = (input, id) => {
    updatePost({ variables: { id, input } })
  }

  return (
    <Container maxW="container.sm">
      <main className="rw-main mx-auto mt-12">
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <header className="rw-segment-header">
            <Heading as='h2' size='lg' fontWeight='bold'>
              Edit Post {post?.id}
            </Heading>
          </header>
        <PostForm post={post} onSave={onSave} error={error} loading={loading} />
      </main>
      </Container>
  )
}
