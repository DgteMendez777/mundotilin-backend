import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PaymentsService } from './payments.service';
import { UploadPaymentProofDto } from './dto/upload-payment-proof.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Payments')
@ApiBearerAuth('JWT-auth')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLIENT')
  findMyPayments(@Req() req: any) {
    return this.paymentsService.findMyPayments(req.user.id);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  findAdminPayments() {
    return this.paymentsService.findAdminPayments();
  }

  @Patch(':id/proof')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLIENT')
  uploadProof(
    @Param('id') id: string,
    @Req() req: any,
    @Body() data: UploadPaymentProofDto,
  ) {
    return this.paymentsService.uploadProof(id, req.user.id, data);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  updateStatus(
    @Param('id') id: string,
    @Body() data: UpdatePaymentStatusDto,
  ) {
    return this.paymentsService.updateStatus(id, data);
  }
}