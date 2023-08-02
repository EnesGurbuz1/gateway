import { InputType, ID, Field } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateProjectInput {

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
  @Field()
  start_date: Date;

  @Column({ type: 'datetime', nullable: true})
  @Field()
  end_date: Date;

}
