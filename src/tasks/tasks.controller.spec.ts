import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    create: jest.fn().mockResolvedValue({ id: 1, title: 'Test Task' }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Task' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const dto = { title: 'Test Task', description: 'Descrição' };
    const userId = 1;
    const mockReq = { user: { sub: 1 } };
    const result = await controller.create(mockReq as any, dto as any);

    expect(mockTasksService.create).toHaveBeenCalledWith(userId, dto);
    expect(result).toEqual({ id: 1, title: 'Test Task' });
  });

  
});
