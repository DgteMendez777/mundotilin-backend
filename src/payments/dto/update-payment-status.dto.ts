import { ApiProperty } from '@nestjs/swagger';
import { payment_status } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentStatusDto {
  @ApiProperty({
    enum: payment_status,
    example: payment_status.PAID,
  })
  @IsEnum(payment_status)
  status: payment_status;

  @IsOptional()
  @IsString()
  notes?: string;
}