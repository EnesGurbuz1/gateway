import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  creator_id: string;
}
