import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { UsersResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
// import mysqlConfig from 'database/mysql.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
    host: 'localhost',
    port: 3306,
    username : 'root',
    password : 'Enes2002',
    database : 'basecamp',
    entities: [Project], 
    synchronize: true,
    }),
    TypeOrmModule.forFeature([Project]),
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
