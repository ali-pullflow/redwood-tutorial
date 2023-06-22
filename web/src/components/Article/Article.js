import { Link, routes } from '@redwoodjs/router'
import CommentsCell from 'src/components/CommentsCell'
import CommentForm from 'src/components/CommentForm'
import { Card, CardHeader, CardBody, CardFooter, Heading, Divider } from '@chakra-ui/react'
const truncate = (text, length) => {
  return text.substring(0, length) + '...'
}

const Article = ({ article, summary = false }) => {
  return (
    <article>
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
      <CardFooter>
        {!summary && (
          <>
            <CommentForm postId={article.id} />
            <div className="mt-12">
              <CommentsCell postId={article.id} />
            </div>
          </>
        )}
      </CardFooter>
    </Card>
    </article>
  )
}

export default Article