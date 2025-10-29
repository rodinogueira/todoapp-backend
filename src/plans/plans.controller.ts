import { Controller, Get } from '@nestjs/common';
import { PlansService } from './plans.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Lista todos os planos disponíveis' })
  findAll() {
    return this.plansService.findAll();
  }
}
