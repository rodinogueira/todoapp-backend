import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const mockTasksService = {
    create: jest
      .fn()
      .mockResolvedValue({ id: 1, title: 'Teste', description: 'Descrição' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksService, useValue: mockTasksService },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create', async () => {
    const dto = { title: 'Teste', description: 'Descrição' };
    await service.create(1, dto as any);
    expect(mockTasksService.create).toHaveBeenCalledWith(1, dto);
  });
});
