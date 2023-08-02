import { InputType, ID, Field } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateUserInput {

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()  
  lastname: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;
}
