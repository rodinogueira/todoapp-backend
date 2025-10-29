import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
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
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async subscribe(@Param('planId') planId: string, @Req() req) {
    const userId = req.user.sub;
    return this.plansService.subscribe(userId, parseInt(planId));
  }

    // Alterar ou desativar plano
  @Patch('change/:planId') // planId opcional para desativar
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Plano alterado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async changePlan(@Param('planId') planId: string, @Req() req) {
    const userId = req.user.sub;
    return this.plansService.changePlan(userId, planId ? parseInt(planId) : null);
  }
}
