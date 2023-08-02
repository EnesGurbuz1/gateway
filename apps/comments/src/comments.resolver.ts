import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { User } from 'apps/comments/src/entities/user.entity';
import { Task } from 'apps/comments/src/entities/task.entity';


@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  async createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput): Promise<Comment> {
    return this.commentsService.create(createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentsService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args('id') id: string,
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.updateComment(id, updateCommentInput);
  }

  @Mutation(() => Comment)
  async deleteComment(@Args('id') id: string) {
    return this.commentsService.deleteComment(id);
  }

  @ResolveField(() => User)
  user(@Parent() comment: Comment): any {
    return { __typename: 'User', id: comment.creator_user_id };
  }
  
  @ResolveField(() => Task)
  task(@Parent() comment: Comment): any {
    return { __typename: 'Task', id: comment.task_id };
  }
  
}
