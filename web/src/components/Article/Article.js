import { Link, routes } from '@redwoodjs/router'
import CommentsCell from 'src/components/CommentsCell'
import CommentForm from 'src/components/CommentForm'
import { Card, CardHeader, CardBody, CardFooter, Heading, Divider } from '@chakra-ui/react'
// const truncate = (text, length) => {
//   return text.substring(0, length) + '...'
// }

const Article = ({ article, summary = false }) => {
  return (
    <Card>
      <Link to={routes.article({ id: article.id })}>
      <CardHeader>
        <Heading size="md">
            {article.title}
          {/* <span className="ml-2 text-gray-400 font-normal">
            by {article.user.name}
          </span> */}
        </Heading>
        <Heading size="sm" className="text-gray-400 font-normal">
          by {article.user.name}
        </Heading>
      </CardHeader>
      <CardBody>
        {/* <p>{summary ? truncate(article.body, 200) : article.body}</p> */}
        <p>{article.body}</p>
      </CardBody>
      </Link>
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