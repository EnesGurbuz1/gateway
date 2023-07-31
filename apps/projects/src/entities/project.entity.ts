import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Directive('@key(fields: "id")')
@Directive('@shareable') 
@Entity()
@ObjectType()
export class Project {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  creator_id: string;
}
