import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_PLAN_KEY } from './require-plan.decorator';
import { Plan, PlanRank } from './plan.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlanGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPlan = this.reflector.get<Plan>(REQUIRE_PLAN_KEY, context.getHandler());
    console.log(`Required plan: ${requiredPlan}`);
    if (!requiredPlan) return true;

    const req = context.switchToHttp().getRequest();
    const { sub } = req.user;

    const user = await this.prisma.user.findUnique({
      where: { id: sub },
      include: { plan: true },
    });

    if (!user || !user.plan) {
      throw new ForbiddenException('Usuário sem plano definido.');
    }

    const userPlanName = typeof user.plan === 'string' ? user.plan : user.plan.name;
    console.log(`User plan: ${userPlanName}`);

    const userRank = PlanRank[userPlanName as Plan];
    console.log(`User rank: ${userRank}`)
    const requiredRank = PlanRank[requiredPlan];
    console.log(`Required rank: ${requiredRank}`)
    if (userRank >= requiredRank) return true;

    throw new ForbiddenException(`Acesso negado. Requer plano ${requiredPlan} ou superior.`);
  }
}
