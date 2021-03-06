import { ArticleEvent, User, Newsletter, Article, Timestamp } from '../../types'
import { privileges } from '../../privileges'
import errors from '../../errors'

export function deleteArticle (
  user: User,
  newsletter: Newsletter,
  article: Article,
  timestamp: Timestamp
): ArticleEvent[] {

  if (
    article.ownerId !== user.userId &&
    !privileges.canDeleteArticle(user, newsletter)
  ) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'ArticleDeleted',
      payload: {
        articleId: article.articleId,
        userId: user.userId,
        timestamp
      }
    }
  ]
}
