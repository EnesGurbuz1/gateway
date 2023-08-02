import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateCommentInput {

  @Column()
  @Field()
  task_id: string;

  @Column()
  @Field()
  creator_user_id: string;

  @Column()
  @Field()
  content: string;
}
