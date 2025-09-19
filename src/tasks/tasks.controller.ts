import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.tasksService.findOne(req.user.sub, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(req.user.sub, +id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.tasksService.remove(req.user.sub, +id);
  }
}
