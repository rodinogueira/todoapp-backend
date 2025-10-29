import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_PLAN_KEY } from './require-plan.decorator';
import { Plan, PlanRank } from './plan.enum';

@Injectable()
export class PlanGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPlan = this.reflector.get<Plan>(REQUIRE_PLAN_KEY, context.getHandler());
    if (!requiredPlan) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !user.plan) {
      throw new ForbiddenException('Usuário sem plano definido.');
    }

    const userRank = PlanRank[user.plan as Plan];
    const requiredRank = PlanRank[requiredPlan];

    if (userRank >= requiredRank) return true;

    throw new ForbiddenException(`Acesso negado. Requer plano ${requiredPlan} ou superior.`);
  }
}
