import { ApiProperty } from '@nestjs/swagger';
import { user_role } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RegisterDto {

  @ApiProperty({
    example: 'Tilin',
    description: 'Nombre del usuario'
  })
  firstName: string;

  @ApiProperty({
    example: 'Tolon',
    description: 'Apellido del usuario'
  })
  lastName: string;

  @ApiProperty({
    example: 'tilin@gmail.com',
    description: 'Correo electrónico'
  })
  email: string;

  @ApiPropertyOptional({
    example: '12345678',
    description: 'Carnet de identidad del usuario',
  })
  @IsOptional()
  @IsString()
  ci?: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña'
  })
  password: string;

  @ApiProperty({
    example: '69688100',
    description: 'Teléfono'
  })
  phone?: string;

  @ApiProperty({
    example: 'CLOWN',
    enum: user_role
  })
  role: user_role;
}