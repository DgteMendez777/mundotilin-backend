import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { user_role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  private parseTimeToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(Date.UTC(1970, 0, 1, hours, minutes, 0));
  }

  private formatEvent(event: any) {
    return {
      ...event,
      eventDate: event.eventDate?.toISOString().split('T')[0],
      startTime: event.startTime?.toISOString().substring(11, 16),
    };
  }

  async createReservation(data: CreateReservationDto, clientId: string) {
    const client = await this.prisma.user.findFirst({
      where: {
        id: clientId,
        role: user_role.CLIENT,
        deletedAt: null,
      },
    });

    if (!client) {
      throw new BadRequestException('Solo un cliente puede realizar reservas');
    }

    const clown = await this.prisma.user.findFirst({
      where: {
        role: user_role.CLOWN,
        deletedAt: null,
      },
    });

    if (!clown) {
      throw new NotFoundException('No existe un payaso disponible para asignar la reserva');
    }

    const service = await this.prisma.service.findFirst({
      where: {
        id: data.serviceId,
        isActive: true,
        deletedAt: null,
      },
    });

    if (!service) {
      throw new BadRequestException('El servicio seleccionado no existe o no está activo');
    }

    const event = await this.prisma.event.create({
      data: {
        clownId: clown.id,
        customerId: client.id,
        serviceId: data.serviceId,
        title: data.title,
        eventDate: new Date(data.eventDate),
        startTime: this.parseTimeToDate(data.startTime),
        address: data.address,
        googleMapsUrl: data.googleMapsUrl,
        childrenCount: data.childrenCount,
        observations: data.observations,
        status: 'PENDING',
        totalAmount: data.totalAmount,
      },
      include: {
        clown: true,
        customer: true,
        service: true,
      },
    });

    const payment = await this.prisma.payment.create({
      data: {
        eventId: event.id,
        clientId: client.id,
        amount: data.advanceAmount ?? data.totalAmount,
        method: 'QR',
        status: 'PENDING',
        qrImageUrl: process.env.QR_PAYMENT_IMAGE_URL,
      },
    });

    return {
      message: 'Reserva creada correctamente. Realice el pago mediante QR.',
      event: this.formatEvent(event),
      payment,
      qr: {
        imageUrl: payment.qrImageUrl,
        amount: payment.amount,
      },
    };
  }
}