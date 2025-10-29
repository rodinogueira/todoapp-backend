import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const plan = await this.prisma.plans.findUnique({
      where: { name: 'BRONZE' },
    });

    if (!plan) throw new Error('Plano padrão não encontrado');

    console.log(plan);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        plan: {
          connect: { id: plan.id }, //connect não cria um novo plano, apenas associa o usuário a um plano existente.
        },
        isPlanActivated: true
      },
      // include: { plan: true }, // incluir dados do plano
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { plan: true },
    });

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    const token = this.jwtService.sign({ sub: user.id, email: user.email, plan: user.plan });
    return { access_token: token };
  }
}
