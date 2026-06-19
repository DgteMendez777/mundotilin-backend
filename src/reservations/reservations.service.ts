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
  try {
    console.log('====================');
    console.log('CLIENT ID:', clientId);
    console.log('DATA:', data);

    const client = await this.prisma.user.findFirst({
      where: {
        id: clientId,
        role: user_role.CLIENT,
        deletedAt: null,
      },
    });

    console.log('CLIENT:', client);

    const clown = await this.prisma.user.findFirst({
      where: {
        role: user_role.CLOWN,
        deletedAt: null,
      },
    });

    console.log('CLOWN:', clown);

    const service = await this.prisma.service.findFirst({
      where: {
        id: data.serviceId,
        isActive: true,
        deletedAt: null,
      },
    });

    console.log('SERVICE:', service);

    const event = await this.prisma.event.create({
      data: {
        clownId: clown!.id,
        customerId: client!.id,
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
    });

    console.log('EVENT CREATED:', event);

    return {
      message: 'Reserva creada correctamente',
      event,
    };
  } catch (error) {
    console.error('====================');
    console.error('RESERVATION ERROR');
    console.error(error);
    throw error;
  }
}}