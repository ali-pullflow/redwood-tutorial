import { Container, Table, TableCaption, TableContainer, Thead, Tr, Th, Td, Tbody, Button, ButtonGroup } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/User/UsersCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const UsersList = ({ users }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  return (
    <Container maxW="container.xl">
      <TableContainer>
        <Table colorScheme="teal">
          <TableCaption>Users</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Roles</Th>
              <Th>&nbsp;</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{truncate(user.id)}</Td>
                <Td>{truncate(user.name)}</Td>
                <Td>{truncate(user.email)}</Td>
                <Td>{truncate(user.roles)}</Td>
                <Td>
                  <ButtonGroup>
                    <Link
                      to={routes.user({ id: user.id })}
                    >
                      <Button
                      variant={'outline'}
                        colorScheme='teal'
                      >
                        View
                      </Button>
                    </Link>
                    <Link
                      to={routes.editUser({ id: user.id })}
                    >
                      <Button
                        colorScheme='teal'
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      colorScheme="red"
                      onClick={() => onDeleteClick(user.id)}
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

export default UsersList
