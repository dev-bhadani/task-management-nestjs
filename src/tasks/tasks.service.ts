import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async updateTask(id: number, isCompleted: boolean): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new Error('Task not found');
    task.isCompleted = isCompleted;
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
