import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { media_type } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateGalleryMediaDto {
  @ApiProperty({
    example: 'Show de cumpleaños Mario Bros',
    description: 'Título del elemento multimedia',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @ApiPropertyOptional({
    example: 'Fotografía tomada durante un evento infantil.',
    description: 'Descripción opcional del contenido',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://res.cloudinary.com/.../image/upload/...',
    description: 'URL del archivo multimedia en Cloudinary',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional({
    example: 'mundotilin/gallery/images/abc123',
    description: 'Public ID generado por Cloudinary',
  })
  @IsOptional()
  @IsString()
  publicId?: string;

  @ApiProperty({
    enum: media_type,
    example: media_type.IMAGE,
    description: 'Tipo de recurso multimedia',
  })
  @IsEnum(media_type)
  type: media_type;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si aparece como destacado',
  })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si está visible públicamente',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}