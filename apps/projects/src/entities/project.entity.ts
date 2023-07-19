import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  creator_id: string;

  @Field(() => User)
  user?: User;
  
}
