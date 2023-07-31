import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { UsersResolver } from 'apps/tasks/src/user.resolver';
import { ProjectsResolver } from 'apps/tasks/src/projects.resolver';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
    host: 'localhost',
    port: 3306,
    username : 'root',
    password : 'Enes2002',
    database : 'basecamp',
    entities: [Task], 
    synchronize: true,
    }),
    TypeOrmModule.forFeature([Task]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile:{
        federation: 2,
      }
    }),
  ],
  providers: [TasksResolver, TasksService, UsersResolver, ProjectsResolver]
})
export class TasksModule {}
