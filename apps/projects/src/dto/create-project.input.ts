import { InputType, ID, Field } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateProjectInput {

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  creator_id: string;
}
