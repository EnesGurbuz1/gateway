import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Comment {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  task_id: string;

  @Column()
  @Field()
  creator_user_id: string;

  @Column()
  @Field()
  content: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  created_at: Date;
}
