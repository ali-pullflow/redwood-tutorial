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
    // <>
    //   <div className="rw-segment">
    //     <header className="rw-segment-header">
    //       <h2 className="rw-heading rw-heading-secondary">
    //         User {user.id} Detail
    //       </h2>
    //     </header>
    //     <table className="rw-table">
    //       <tbody>
    //         <tr>
    //           <th>Id</th>
    //           <td>{user.id}</td>
    //         </tr>
    //         <tr>
    //           <th>Name</th>
    //           <td>{user.name}</td>
    //         </tr>
    //         <tr>
    //           <th>Email</th>
    //           <td>{user.email}</td>
    //         </tr>
    //         <tr>
    //           <th>Roles</th>
    //           <td>{user.roles}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    //   <nav className="rw-button-group">
    //     <Link
    //       to={routes.editUser({ id: user.id })}
    //       className="rw-button rw-button-blue"
    //     >
    //       Edit
    //     </Link>
    //     <button
    //       type="button"
    //       className="rw-button rw-button-red"
    //       onClick={() => onDeleteClick(user.id)}
    //     >
    //       Delete
    //     </button>
    //   </nav>
    // </>
  )
}

export default User
