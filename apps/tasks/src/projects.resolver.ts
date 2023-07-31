import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from './entities/task.entity';
import { Project } from './entities/project.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly tasksService: TasksService) {}

  @ResolveField(() => [Task])
  async tasks(@Parent() project: Project): Promise<Task[]> {
    try {
      const { id } = project;
      // Kullanıcının tasklarını almak için hizmeti çağırma işlemi
      const projectTasks: Task[] = await this.tasksService.forProject(id);

      // Hata durumunda uygun işlemler yapma
      if (!projectTasks || projectTasks.length === 0) {
        throw new Error('Pojenin taskları bulunamadı.');
      }

      return projectTasks;
    } catch (error) {
      // Hata yönetimi: Hataları uygun bir şekilde ele almak
      console.error('Task sorgularken bir hata oluştu:', error);
      throw new Error(
        'Task sorgulanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      );
    }
  }
}
