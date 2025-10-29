import { Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Lista todos os planos disponíveis' })
  findAll() {
    return this.plansService.findAll();
  }

  @Patch(':planId/subscribe')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Plano assinado com sucesso' })
  async subscribe(@Param('planId') planId: string, @Request() req) {
    const userId = req.user.sub;
    return this.plansService.subscribe(userId, parseInt(planId));
  }
}
