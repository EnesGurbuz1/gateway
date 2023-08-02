// update-project.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  creator_id?: string;

  @Field({ nullable: true })
  root_id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  start_date?: Date;

  @Field({ nullable: true })
  end_date?: Date;

  @Field({ nullable: true })
  created_at?: Date;
}
