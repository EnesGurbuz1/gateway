import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields: "id")' )
@Directive('@shareable') 

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID) 
  id: string;

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
