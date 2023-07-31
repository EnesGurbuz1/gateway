import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Task {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
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
