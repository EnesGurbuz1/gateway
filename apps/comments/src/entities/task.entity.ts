import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@shareable') 
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => [Comment])
  comments: Comment[];
}
