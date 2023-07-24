import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
// import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectsService {
  // private readonly projects: Project[] = [];

  constructor(@InjectRepository(Project)
  private projectRepository: Repository<Project>,
  ) {}

  async create(CreateProjectInput: CreateProjectInput): Promise<Project> {
    const newProject = this.projectRepository.create(CreateProjectInput);
    return this.projectRepository.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    return this.projectRepository.findOne({where: {id}});
  }

  async forCreator(creatorId: string): Promise<Project[]> {
    return this.projectRepository.find({where: {creator_id: creatorId}});
  }

  //result.affected değeri, etkilenen satır sayısını döndürür. Eğer güncelleme işlemi başarılı olduysa, affected değeri 1 olacaktır.
  // Eğer etkilenen satır sayısı 0 ise, güncellenmek istenen proje bulunmamış demektir ve hata fırlatılır.
  async updateProject(id: string, updateProjectInput: UpdateProjectInput): Promise<Project> {
    const result = await this.projectRepository.update({ id }, updateProjectInput);
    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }
    const updatedProject = await this.projectRepository.findOne({ where: { id } });
    return updatedProject;
  }
  
  
  async deleteProject(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
  
    await this.projectRepository.remove(project);
    return project;
  }
  
  
}
