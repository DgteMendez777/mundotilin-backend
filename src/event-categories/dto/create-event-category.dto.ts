import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEventCategoryDto {
    @ApiProperty({
        example: 'Cumpleaños',
        description: 'Nombre de la categoría de evento',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiPropertyOptional({
        example: 'Eventos de cumpleaños infantiles',
        description: 'Descripción de la categoría',
    })
    @IsOptional()
    @IsString()
    description?: string;
}