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
import { ApiTags, ApiBody, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlanGuard } from '../auth/plan.guard';
import { RequirePlan } from '../auth/require-plan.decorator';
import { Plan } from '../auth/plan.enum';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard, PlanGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @RequirePlan(Plan.GOLD)
  create(@Request() req, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(req.user.sub, dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de tasks' })
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Task encontrada' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.tasksService.findOne(req.user.sub, +id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(req.user.sub, +id, dto);
  }
  
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Task deletada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  remove(@Request() req, @Param('id') id: string) {
    return this.tasksService.remove(req.user.sub, +id);
  }
}
