import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  root_id?: string;

  @Field({ nullable: true })
  creator_id?: string;

  @Field({ nullable: true })
  project_id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  deadline?: Date;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_at?: Date;
}
