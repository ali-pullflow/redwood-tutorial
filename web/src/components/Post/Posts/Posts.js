import { Container, Table, TableCaption, TableContainer, Thead, Tr, Th, Td, Tbody, Button, ButtonGroup } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Post/PostsCell'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 10

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const PostsList = ({ posts }) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  return (
    <Container maxW="container.xl">
      <TableContainer>
        <Table colorScheme="teal">
          <TableCaption>Posts</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Title</Th>
              <Th>Body</Th>
              <Th>Created at</Th>
              <Th>&nbsp;</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post) => (
              <Tr key={post.id}>
                <Td>{truncate(post.id)}</Td>
                <Td>{truncate(post.title)}</Td>
                <Td>{truncate(post.body)}</Td>
                <Td>{timeTag(post.createdAt)}</Td>
                <Td>
                  <ButtonGroup>
                    <Link
                      to={routes.post({ id: post.id })}
                    >
                      <Button variant="outline" colorScheme="teal">
                        View
                      </Button>
                    </Link>
                    <Link
                      to={routes.editPost({ id: post.id })}
                    >
                      <Button colorScheme='teal'
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      colorScheme="red"
                      onClick={() => onDeleteClick(post.id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default PostsList
