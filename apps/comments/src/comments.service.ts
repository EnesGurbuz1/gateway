import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {

  constructor(@InjectRepository(Comment)
  private commentRepository: Repository<Comment>,
  ) {}
  
 //CREATE
  async create(createCommentInput: CreateCommentInput): Promise<Comment> {
    const newComment: Comment = this.commentRepository.create({
      ...createCommentInput,
      id: uuidv4(), // UUID oluşturup atama yapılıyor
    });
    return this.commentRepository.save(newComment);
  }

  //READ
  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  //READ
  async findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOne({where: {id}});
  }

  async forTask(taskId: string): Promise<Comment[]> {
    return this.commentRepository.find({where: {task_id: taskId}});
  }

  async forCreator(creatorId: string): Promise<Comment[]> {
    return this.commentRepository.find({where: {creator_user_id: creatorId}});
  }

  //UPDATE
  async updateComment(id: string, updateCommentInput: UpdateCommentInput): Promise<Comment> {
    const result = await this.commentRepository.update({ id }, updateCommentInput);
    if (result.affected === 0) {
      throw new NotFoundException('Comment not found');
    }
    const updatedComment = await this.commentRepository.findOne({ where: { id } });
    return updatedComment;
  }

  //DELETE
  async deleteComment(id: string): Promise<void> {
    const result = await this.commentRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Comment not found');
    }
  }

}
