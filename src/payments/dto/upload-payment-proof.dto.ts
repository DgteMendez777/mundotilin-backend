import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadPaymentProofDto {
  @ApiProperty({
    example: 'https://res.cloudinary.com/.../payment-proof.jpg',
    description: 'URL del comprobante de pago subido a Cloudinary',
  })
  @IsString()
  @IsNotEmpty()
  proofImageUrl: string;
}