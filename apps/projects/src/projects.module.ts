import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {  ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { UsersResolver } from './user.resolver';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile:{
        federation: 2,
      }
    }),
  ],
  providers: [ProjectsResolver, ProjectsService, UsersResolver]
})
export class ProjectsModule {}
