import { Container, Table, TableCaption, TableContainer, Tbody, Th, Tr, Td, Button, ButtonGroup } from '@chakra-ui/react'
import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'


const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Post = ({ post }) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post deleted')
      navigate(routes.posts())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  return (
    <MetaTags title={`Post ${post.id}`} description={post.body}>
    <Container maxW="container.xl">
      <TableContainer>
        <Table>
          <TableCaption>Post {post.id} Detail</TableCaption>
          <Tbody>
            <Tr>
              <Th>Id</Th>
              <Td>{post.id}</Td>
            </Tr>
            <Tr>
              <Th>Title</Th>
              <Td>{post.title}</Td>
            </Tr>
            <Tr>
              <Th>Body</Th>
              <Td>{post.body}</Td>
            </Tr>
            <Tr>
              <Th>Created at</Th>
              <Td>{timeTag(post.createdAt)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <ButtonGroup>
        <Link
          to={routes.editPost({ id: post.id })}
        >
          <Button colorScheme="teal">Edit</Button>
        </Link>
        <Button
          colorScheme="red"
          variant={'outline'}
          onClick={() => onDeleteClick(post.id)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </Container>
    </MetaTags>
  )
}

export default Post
