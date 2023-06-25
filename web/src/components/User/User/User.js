import { Container, Table, TableCaption, TableContainer, Tbody, Th, Tr, Td, Button, ButtonGroup } from '@chakra-ui/react'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const User = ({ user }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  return (
    <Container maxW="container.xl">
      <TableContainer>
        <Table>
          <TableCaption>User {user.id} Detail</TableCaption>
          <Tbody>
            <Tr>
              <Th>Id</Th>
              <Td>{user.id}</Td>
            </Tr>
            <Tr>
              <Th>Name</Th>
              <Td>{user.name}</Td>
            </Tr>
            <Tr>
              <Th>Email</Th>
              <Td>{user.email}</Td>
            </Tr>
            <Tr>
              <Th>Roles</Th>
              <Td>{user.roles}</Td>
            </Tr>

          </Tbody>
        </Table>
      </TableContainer>
      <ButtonGroup>
        <Link
          to={routes.editUser({ id: user.id })}
        >
          <Button colorScheme="teal">
            Edit
          </Button>
        </Link>
        <Button
          type="button"
          color={'red'}
          onClick={() => onDeleteClick(user.id)}
        >
          Delete
        </Button>
      </ButtonGroup>

    </Container>
  )
}

export default User
