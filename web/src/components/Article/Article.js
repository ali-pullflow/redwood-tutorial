import { Link, routes } from '@redwoodjs/router'
import CommentsCell from 'src/components/CommentsCell'
import CommentForm from 'src/components/CommentForm'
import { Card, CardHeader, CardBody, CardFooter, Heading, Divider } from '@chakra-ui/react'
const truncate = (text, length) => {
  return text.substring(0, length) + '...'
}

const Article = ({ article, summary = false }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
          <span className="ml-2 text-gray-400 font-normal">
            by {article.user.name}
          </span>
        </Heading>
      </CardHeader>
      <CardBody>
        <p>{summary ? truncate(article.body, 100) : article.body}</p>
      </CardBody>
      <CardFooter style={{ flexDirection: 'column', gap: '1rem' }}>
        {!summary && (
          <>
          <CommentForm postId={article.id} />
          <CommentsCell postId={article.id} />
        </>
      )}
      </CardFooter>
    </Card>
  )
}

export default Article