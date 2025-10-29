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

  async changePlan(userId: number, planId: number | null) {
    const data: any = {
      isPlanActivated: !!planId,
    };

    if (planId) {
      data.plan = { connect: { id: planId } };
    } else {
      data.plan = { disconnect: true }; // remove plano
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
      include: { plan: true },
    });

    if (!user.plan) {
      throw new Error('Usuário não tem plano associado');
    }

    return { message: planId ? `Plano alterado para ${user.plan.name}` : 'Plano desativado', user };
  }

  async deletePlan(userId: number) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        plan: { disconnect: true },   // remove o plano
        isPlanActivated: false,       // marca como desativado
      },
      include: { plan: true },       // retorna detalhes do plano (agora null)
    });

    console.log(`Plano removido do usuário: ${user}`);
    return { message: 'Plano removido com sucesso', user };
  }

  async getUserPlanFeatures(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { plan: true },
    });

    if (!user || !user.plan) {
      return { message: 'Usuário não tem plano ativo', features: [] };
    }

    let features: string[] = [];

    switch (user.plan.name) {
      case 'BRONZE':
        features = ['Acesso básico', 'Suporte limitado'];
        break;
      case 'SILVER':
        features = ['Acesso básico', 'Suporte prioritário', 'Funcionalidade intermediária'];
        break;
      case 'GOLD':
        features = ['Acesso total', 'Suporte premium', 'Funcionalidades completas', 'Relatórios avançados'];
        break;
    }

    return { plan: user.plan.name, features };
  }
}
