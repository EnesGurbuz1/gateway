import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { TasksResolver } from 'apps/comments/src/tasks.resolver';
import { UsersResolver } from 'apps/comments/src/user.resolver';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username : 'root',
    password : 'Enes2002',
    database : 'basecamp',
    entities: [Comment], 
    synchronize: true,
    }),
    TypeOrmModule.forFeature([Comment]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile:{
        federation: 2,
      }
    }),
  ],
  providers: [CommentsResolver, CommentsService, TasksResolver, UsersResolver]
})
export class CommentsModule {}