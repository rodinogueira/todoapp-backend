import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { REQUIRE_FEATURE_KEY } from './require-feature.decorator';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFeature = this.reflector.get<string>(
      REQUIRE_FEATURE_KEY,
      context.getHandler(),
    );
    if (!requiredFeature) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    if (!userId) return false;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        plan: { include: { features: true } }, // pega features do plano
      },
    });

    if (!user || !user.plan) return false;

    const hasFeature = user.plan.features.some((f: any) => f.name === requiredFeature);
    return hasFeature;
  }
}
