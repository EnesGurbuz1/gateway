import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
import { Task } from './task.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@shareable')
@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => [Task])
  tasks: Task[];
}
