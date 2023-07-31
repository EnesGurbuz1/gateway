import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(Task)
  private taskRepository: Repository<Task>,
  ) {}

  //CREATE
  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    // Görevin var olup olmadığını kontrol edelim
    const existingTask = await this.taskRepository.findOne({ where: { id: createTaskInput.id } });
    if (existingTask) {
      throw new Error('Aynı ID ile başka bir görev zaten mevcut.');
    }
    const newTask = this.taskRepository.create(createTaskInput);
    return this.taskRepository.save(newTask);
  }

  //READ
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  //READ
  async findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne({where: {id}});
  }

  async forCreator(creatorId: string): Promise<Task[]> {
    return this.taskRepository.find({where: {creator_id: creatorId}});
  }

  async forProject(projectId: string): Promise<Task[]> {
    return this.taskRepository.find({where: {project_id: projectId}});
  }

  //UPDATE
  async updateTask(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {
    const result = await this.taskRepository.update({ id }, updateTaskInput);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
    const updatedTask = await this.taskRepository.findOne({ where: { id } });
    return updatedTask;
  }
  
  //DELETE
  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
  
}
