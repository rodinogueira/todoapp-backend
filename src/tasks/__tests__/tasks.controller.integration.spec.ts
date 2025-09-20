import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuthController (integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('/POST auth/register should create a user', async () => {
    const email = `test+${Date.now()}@test.com`;
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'Test', email, password: '123456' })
      .expect(201);

    const user = response.body as { id: number; name: string; email: string };

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(email);
  });
});
