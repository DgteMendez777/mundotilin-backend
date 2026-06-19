import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateReservationDto {
  @ApiProperty()
  @IsUUID()
  serviceId: string;

  @ApiProperty({ example: 'Cumpleaños de Mateo' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '2026-06-25' })
  @IsDateString()
  eventDate: string;

  @ApiProperty({ example: '15:30' })
  @IsString()
  startTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  googleMapsUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  childrenCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  advanceAmount?: number;
}