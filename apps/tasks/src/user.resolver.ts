import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from './entities/task.entity';
import { User } from './entities/user.entity';
import { TasksService } from './tasks.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly tasksService: TasksService) {}

  @ResolveField(() => [Task])
  async tasks(@Parent() user: User): Promise<Task[]> {
    try {
      const { id } = user;
      // Kullanıcının tasklarını almak için hizmeti çağırma işlemi
      const userTasks: Task[] = await this.tasksService.forCreator(id);

      // Hata durumunda uygun işlemler yapma
      if (!userTasks || userTasks.length === 0) {
        throw new Error('Kullanıcının taskları bulunamadı.');
      }

      return userTasks;
    } catch (error) {
      // Hata yönetimi: Hataları uygun bir şekilde ele almak
      console.error('Task sorgularken bir hata oluştu:', error);
      throw new Error(
        'Task sorgulanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      );
    }
  }
}
