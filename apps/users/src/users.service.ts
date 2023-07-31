import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser: User = this.userRepository.create({
      ...createUserInput,
      id: uuidv4(), // UUID oluşturup atama yapılıyor
    });

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const result = await this.userRepository.update({ id }, updateUserInput);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return updatedUser;
  }
  
  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return user;
  }
}
