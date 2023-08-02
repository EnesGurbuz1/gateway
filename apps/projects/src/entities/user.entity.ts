import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
import { Project } from './project.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields: "id")') 
@Directive('@shareable')
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID) 
  id: string;

  @Column()
  @Field(() => [Project])
  projects: Project[];
}
