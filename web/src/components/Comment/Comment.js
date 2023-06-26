import { Card, CardHeader, CardBody, Button, Flex } from '@chakra-ui/react'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

const DELETE = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      postId
    }
  }
`

const formattedDate = (datetime) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })
  return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
}

const Comment = ({ comment }) => {
  const { hasRole } = useAuth()
  const [deleteComment] = useMutation(DELETE, {
    refetchQueries: [
      {
        query: CommentsQuery,
        variables: { postId: comment.postId },
      },
    ],
  })

  const moderate = () => {
    if (confirm('Are you sure?')) {
      deleteComment({
        variables: { id: comment.id },
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="font-semibold text-gray-700">{comment.name}</h2>
        <time className="text-xs text-gray-500" dateTime={comment.createdAt}>
          {formattedDate(comment.createdAt)}
        </time>
      </CardHeader>
      <CardBody>
        <p className="text-sm mt-2">{comment.body}</p>
        <Flex justify="flex-end" className="mt-4">
      {(hasRole('moderator') || hasRole('admin')) && (
        <Button
        type="button"
        colorScheme={'red'}
        variant={'outline'}
        onClick={() => moderate()}
        >
          Delete
        </Button>
      )}
      </Flex>
      </CardBody>
    </Card>
  )
}

export default Comment