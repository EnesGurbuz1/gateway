import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Comment } from './entities/comment.entity';
import { Task } from './entities/task.entity';
import { CommentsService } from './comments.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @ResolveField(() => [Comment])
  async comments(@Parent() task: Task): Promise<Comment[]> {
    try {
      const { id } = task;
      // Kullanıcının commentlarını almak için hizmeti çağırma işlemi
      const taskComments: Comment[] = await this.commentsService.forTask(id);

     // Eğer proje altında görev yoksa, null değeri döndürün
     if (!taskComments || taskComments.length === 0) {
      return null;
    }

    return taskComments;
  } catch (error) {
    // Hata yönetimi: Hataları uygun bir şekilde ele almak
    console.error('Comment sorgularken bir hata oluştu:', error);
    throw new Error(
      'Comment sorgulanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    );
    }
  }
}
