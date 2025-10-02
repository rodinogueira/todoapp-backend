import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const mockTasksService = {
    create: jest.fn().mockResolvedValue({ id: 1, title: 'Teste', description: 'Descrição' }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Teste', description: 'Descrição' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Single Task', description: '...' }),
    update: jest.fn().mockResolvedValue({ count: 1 }),
    remove: jest.fn().mockResolvedValue({ count: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

  it('should call findAll', async () => {
    await service.findAll(1);

    expect(mockTasksService.findAll).toHaveBeenCalledWith(1);
  });

  it('should call findOne', async() => {
    await service.findOne(1, 99);

    expect(mockTasksService.findOne).toHaveBeenCalledWith(1, 99);
  });

    it('should call update', async () => {
    const dto = { title: 'Updated Task' };
    await service.update(1, 99, dto as any);

    expect(mockTasksService.update).toHaveBeenCalledWith(1, 99, dto);
  });

  it('should call remove', async () => {
    await service.remove(1, 99);

    expect(mockTasksService.remove).toHaveBeenCalledWith(1, 99);
  });
});
