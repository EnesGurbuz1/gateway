import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateTaskInput {

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

  @Column({ type: 'datetime', nullable: true})
  @Field({ nullable: true })
  deadline: Date;

  @Column()
  @Field()
  status: string;
}
