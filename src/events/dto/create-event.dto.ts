import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { event_status } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class CreateEventDto {
    @ApiProperty({
        example: 'c0711088-e14f-4bc4-9b74-ae93c8c8cca6',
        description: 'ID del usuario payaso asignado al evento',
    })
    @IsUUID()
    clownId: string;

    @ApiProperty({
        example: '50af0b7d-f89c-41a2-9bfa-0814e5c97827',
        description: 'ID del cliente que contrata el evento',
    })
    @IsUUID()
    customerId: string;

    @ApiProperty({
        example: '5e39a04c-086f-4fd6-a72d-807909816916',
        description: 'ID del servicio contratado',
    })
    @IsUUID()
    serviceId: string;

    @ApiProperty({
        example: 'Cumpleaños de Mateo',
        description: 'Título o nombre del evento',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title: string;

    @ApiProperty({
        example: '2026-06-25',
        description: 'Fecha del evento en formato YYYY-MM-DD',
    })
    @IsDateString()
    eventDate: string;

    @ApiProperty({
        example: '15:30',
        description: 'Hora de inicio del evento en formato HH:mm',
    })
    @IsString()
    startTime: string;

    @ApiProperty({
        example: 'Av. Siempre Viva #123',
        description: 'Dirección donde se realizará el evento',
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiPropertyOptional({
        example: 'https://maps.google.com/...',
        description: 'URL de Google Maps del lugar del evento',
    })
    @IsOptional()
    @IsString()
    googleMapsUrl?: string;

    @ApiPropertyOptional({
        example: 25,
        description: 'Cantidad aproximada de niños',
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    childrenCount?: number;

    @ApiPropertyOptional({
        example: 'Llevar parlante y decoración temática.',
        description: 'Observaciones adicionales del evento',
    })
    @IsOptional()
    @IsString()
    observations?: string;

    @ApiPropertyOptional({
        enum: event_status,
        example: event_status.PENDING,
        description: 'Estado inicial del evento',
    })
    @IsOptional()
    @IsEnum(event_status)
    status?: event_status;

    @ApiProperty({
        example: 350,
        description: 'Monto total acordado para el evento',
    })
    @IsNumber()
    @Min(0)
    totalAmount: number;
}