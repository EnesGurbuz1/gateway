import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Comment } from './entities/comment.entity';
import { User } from './entities/user.entity';
import { CommentsService } from './comments.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @ResolveField(() => [Comment])
  async comments(@Parent() user: User): Promise<Comment[]> {
    try {
      const { id } = user;
      // Kullanıcının commentlarını almak için hizmeti çağırma işlemi
      const userComments: Comment[] = await this.commentsService.forCreator(id);

      // Hata durumunda uygun işlemler yapma
      if (!userComments || userComments.length === 0) {
        return null;
      }

      return userComments;
    } catch (error) {
      // Hata yönetimi: Hataları uygun bir şekilde ele almak
      console.error('Comment sorgularken bir hata oluştu:', error);
      throw new Error(
        'Comment sorgulanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      );
    }
  }
}
