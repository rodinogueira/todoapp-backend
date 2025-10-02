import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Nome completo do usuário' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email do usuário' })
  @IsEmail()
  email: string;

   @ApiProperty({ example: 'strongPassword123', description: 'Senha com no mínimo 6 caracteres' })
  @MinLength(6)
  password: string;
}
