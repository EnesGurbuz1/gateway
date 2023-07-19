import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Project } from './entities/project.entity';
import { User } from './entities/user.entity';
import { ProjectsService } from './projects.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @ResolveField(() => [Project])
  projects(@Parent() user: User): Project[] {
    return this.projectsService.forCreator(user.id);
  }
}
