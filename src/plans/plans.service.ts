import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlansService {
  constructor(
    private prisma: PrismaService
) {}

  findAll() {
    return this.prisma.plans.findMany();
  }

  async subscribe(userId: number, planId: number) {
    // Atualiza o usuário com o novo plano e ativa o plano
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        plan: { connect: { id: planId } },
        isPlanActivated: true,
      },
    });
    console.log(`Subscribe user: ${user}`)
    return { message: `Plano ${planId} assinado com sucesso`, user };
  }
}
