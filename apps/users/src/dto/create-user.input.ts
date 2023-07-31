import { InputType, ID, Field } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateUserInput {

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;
}
