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
  creator_id: string;

  @Column()
  @Field()
  root_id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column({ type: 'datetime', nullable: true})
  @Field({ nullable: true })
  start_date: Date;

  @Column({ type: 'datetime', nullable: true})
  @Field({ nullable: true })
  end_date: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  created_at: Date;
}
