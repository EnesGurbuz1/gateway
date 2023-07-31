import { InputType, ID, Field } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateTaskInput {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  creator_id: string;

  @Column()
  @Field()
  project_id: string;
}
