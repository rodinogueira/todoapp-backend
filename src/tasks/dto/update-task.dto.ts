import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Comprar leite', description: 'Título da task' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Ir ao mercado e comprar leite', description: 'Descrição da task' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'completed', description: 'Status da task', enum: ['pending', 'completed'] })
  @IsOptional()
  @IsIn(['pending', 'completed'])
  status?: string;
}
