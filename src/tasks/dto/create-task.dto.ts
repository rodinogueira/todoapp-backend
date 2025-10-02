import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Comprar leite', description: 'Título da task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Ir ao mercado e comprar leite', description: 'Descrição da task', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
