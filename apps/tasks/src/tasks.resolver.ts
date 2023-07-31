import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<Task> {
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id') id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ) {
    return this.tasksService.updateTask(id, updateTaskInput);
  }

  @Mutation(() => Task)
  async deleteTask(@Args('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @ResolveField(() => User)
  user(@Parent() task: Task): any {
    return { __typename: 'User', id: task.project_id };
  }

  @ResolveField(() => Project)
  project(@Parent() task: Task): any {
    return { __typename: 'Project', id: task.project_id };
  }
}
