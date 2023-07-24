import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Project } from './entities/project.entity';
import { User } from './entities/user.entity';
import { ProjectsService } from './projects.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @ResolveField(() => [Project])
  async projects(@Parent() user: User): Promise<Project[]> {
    try {
      const { id } = user;
      // Kullanıcının projelerini almak için hizmeti çağırma işlemi
      const userProjects: Project[] = await this.projectsService.forCreator(id);

      // Hata durumunda uygun işlemler yapma
      if (!userProjects || userProjects.length === 0) {
        throw new Error('Kullanıcının projeleri bulunamadı.');
      }

      return userProjects;
    } catch (error) {
      // Hata yönetimi: Hataları uygun bir şekilde ele almak
      console.error('Proje sorgularken bir hata oluştu:', error);
      throw new Error(
        'Proje sorgulanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      );
    }
  }
}
