import { Module, forwardRef } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'
@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [PlansController],
  providers: [PlansService, PrismaService],
})
export class PlansModule {}
