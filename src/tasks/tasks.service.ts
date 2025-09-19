import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description ?? '',
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async findOne(userId: number, id: number) {
    return this.prisma.task.findFirst({ where: { id, userId } });
  }

  async update(userId: number, id: number, dto: UpdateTaskDto) {
    return this.prisma.task.updateMany({
      where: { id, userId },
      data: dto,
    });
  }

  async remove(userId: number, id: number) {
    return this.prisma.task.deleteMany({ where: { id, userId } });
  }
}
