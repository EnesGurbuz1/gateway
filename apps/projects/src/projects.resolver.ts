import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { User } from './entities/user.entity';
// import { UpdateProjectInput } from './dto/update-project.input';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return this.projectsService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args('id',) id: string) {
    return this.projectsService.findOne(id);
  }

  @ResolveField(() => User)
  user(@Parent() project: Project): any{
    return {__typename: 'User', id: project.creator_id};
  }
  // @Mutation(() => Project)
  // updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
  //   return this.projectsService.update(updateProjectInput.id, updateProjectInput);
  // }

  // @Mutation(() => Project)
  // removeProject(@Args('id', { type: () => Int }) id: number) {
  //   return this.projectsService.remove(id);
  // }
}
