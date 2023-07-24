// update-project.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  creator_id?: string;
}
