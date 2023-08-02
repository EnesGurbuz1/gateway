import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput {

  @Field({ nullable: true })
  task_id?: string;

  @Field({ nullable: true })
  creator_user_id?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  created_at?: Date;
}
