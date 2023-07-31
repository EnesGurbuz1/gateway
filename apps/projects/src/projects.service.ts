import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  //CREATE
  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const newProject: Project = this.projectRepository.create({
      ...createProjectInput,
      id: uuidv4(), // UUID oluşturup atama yapılıyor
    });

    return this.projectRepository.save(newProject);
  }


  //READ
  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  //READ
  async findOne(id: string): Promise<Project> {
    return this.projectRepository.findOne({ where: { id } });
  }

  //READ
  async forCreator(creatorId: string): Promise<Project[]> {
    return this.projectRepository.find({ where: { creator_id: creatorId } });
  }


  //UPDATE
  //result.affected değeri, etkilenen satır sayısını döndürür. Eğer güncelleme işlemi başarılı olduysa, affected değeri 1 olacaktır.
  // Eğer etkilenen satır sayısı 0 ise, güncellenmek istenen proje bulunmamış demektir ve hata fırlatılır.
  async updateProject(
    id: string,
    updateProjectInput: UpdateProjectInput,
  ): Promise<Project> {
    const result = await this.projectRepository.update(
      { id },
      updateProjectInput,
    );
    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }
    const updatedProject = await this.projectRepository.findOne({
      where: { id },
    });
    return updatedProject;
  }


  //DELETE
  async deleteProject(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectRepository.remove(project);
    return project;
  }
}
