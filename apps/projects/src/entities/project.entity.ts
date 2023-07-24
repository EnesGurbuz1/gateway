import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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


  // @Column()
  // @Field(() => User)
  // user?: User;
  
}
