import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { payment_status, user_role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UploadPaymentProofDto } from './dto/upload-payment-proof.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMyPayments(clientId: string) {
    return this.prisma.payment.findMany({
      where: {
        clientId,
        deletedAt: null,
      },
      include: {
        event: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAdminPayments() {
    return this.prisma.payment.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        client: true,
        event: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async uploadProof(
    paymentId: string,
    clientId: string,
    data: UploadPaymentProofDto,
  ) {
    const payment = await this.prisma.payment.findFirst({
      where: {
        id: paymentId,
        clientId,
        deletedAt: null,
      },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    if (payment.status === payment_status.PAID) {
      throw new BadRequestException('Este pago ya fue aprobado');
    }

    return this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        proofImageUrl: data.proofImageUrl,
        status: payment_status.REVIEW,
      },
      include: {
        event: true,
      },
    });
  }

  async updateStatus(id: string, data: UpdatePaymentStatusDto) {
    const payment = await this.prisma.payment.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        event: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    const updatedPayment = await this.prisma.payment.update({
      where: { id },
      data: {
        status: data.status,
        notes: data.notes,
      },
      include: {
        event: true,
      },
    });

    if (data.status === payment_status.PAID) {
      await this.prisma.event.update({
        where: {
          id: payment.eventId,
        },
        data: {
          status: 'CONFIRMED',
        },
      });
    }

    return updatedPayment;
  }
}