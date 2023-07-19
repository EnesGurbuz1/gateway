
import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
import { Project } from './project.entity';


@ObjectType()
@Directive('@key(fields: "id")')
export class User {
   @Field(() => ID)
    id: string;

    @Field(() => [Project])
    projects: Project[];
    
}
