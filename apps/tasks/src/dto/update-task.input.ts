// update-task.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  creator_id?: string;

  @Field({ nullable: true })
  project_id?: string;
}
