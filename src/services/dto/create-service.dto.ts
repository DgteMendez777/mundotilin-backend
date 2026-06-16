import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class CreateServiceDto {
    @ApiPropertyOptional({
        example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
        description: 'ID de la categoría del evento'
    })
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @ApiProperty({
        example: 'Show básico infantil',
        description: 'Nombre del servicio',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiPropertyOptional({
        example: 'Show de payaso con juegos, música y globos.',
        description: 'Descripción del servicio',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        example: 350,
        description: 'Precio base del servicio',
    })
    @IsNumber()
    @Min(0)
    basePrice: number;

    @ApiPropertyOptional({
        example: 'https://res.cloudinary.com/mundotilin/show-basico.jpg',
        description: 'Imagen representativa del servicio',
    })
    @IsOptional()
    @IsString()
    coverImage?: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Indica si el servicio está activo',
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}