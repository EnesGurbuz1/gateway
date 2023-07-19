import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
