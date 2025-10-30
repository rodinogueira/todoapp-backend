import { Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('plans')
@UseGuards(JwtAuthGuard)
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista todos os planos disponíveis' })
  findAll() {
    return this.plansService.findAll();
  }

  @Patch(':id/subscribe')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Plano assinado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async subscribe(@Param('id') planId: string, @Req() req) {
    const userId = req.user.sub;
    return this.plansService.subscribe(userId, parseInt(planId));
  }

  // Alterar ou desativar plano
  @Patch('change/:id') // planId opcional para desativar foi substituido por :id
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Plano alterado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async changePlan(@Param('id') planId: string, @Req() req) {
    const userId = req.user.sub;
    return this.plansService.changePlan(userId, planId ? +planId : null);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Plano removido com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async deletePlan(@Req() req) {
    const userId = req.user.sub;
    return this.plansService.deletePlan(userId);
  }
}
