import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { User } from './entities/user.entity';
import { UpdateProjectInput } from './dto/update-project.input';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  async createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput): Promise<Project> {
    return this.projectsService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('id') id: string,
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectsService.updateProject(id, updateProjectInput);
  }

  @Mutation(() => Project)
  async deleteProject(@Args('id') id: string) {
    return this.projectsService.deleteProject(id);
  }

  @ResolveField(() => User)
  user(@Parent() project: Project): any {
    return { __typename: 'User', id: project.creator_id };
  }
}
