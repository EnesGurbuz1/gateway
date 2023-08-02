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
  root_id: string;

  @Column()
  @Field()
  creator_id: string;

  @Column()
  @Field()
  project_id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  created_at: Date;

  @Column({ type: 'datetime', nullable: true})
  @Field({ nullable: true })
  deadline: Date;

  @Column()
  @Field()
  status: string;
}
