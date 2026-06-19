import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({
    example: 'María López',
    description: 'Nombre del cliente que dejó el testimonio',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  clientName: string;

  @ApiProperty({
    example: 'Excelente show, los niños se divirtieron muchísimo.',
    description: 'Comentario u opinión del cliente',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiPropertyOptional({
    example: 5,
    description: 'Calificación del servicio de 1 a 5',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    example: 'Cumpleaños infantil',
    description: 'Tipo de evento relacionado al testimonio',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  eventType?: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/.../image/upload/...',
    description: 'Imagen opcional asociada al testimonio',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si el testimonio aparece como destacado',
  })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si el testimonio está visible públicamente',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}