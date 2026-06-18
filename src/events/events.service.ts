import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { event_status, user_role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';

@Injectable()
export class EventsService {
    constructor(private readonly prisma: PrismaService) {}

    private formatEvent(event: any) {
        return {
            ...event,
            eventDate: event.eventDate
                ?.toISOString()
                .split('T')[0],

            startTime: event.startTime
                ? this.formatTime(event.startTime)
                : null,
        };
    }

    private parseTimeToDate(time: string): Date {
        const [hours, minutes] = time.split(':').map(Number);

        return new Date(Date.UTC(1970, 0, 1, hours, minutes, 0));
    }

    private formatTime(date: Date): string {
        return date.toISOString().substring(11, 16);
    }

    private async validateEventRelations(data: { clownId?: string; customerId?: string; serviceId?: string; }) {
        if (data.clownId) {
            const clown = await this.prisma.user.findFirst({
                where: {
                    id: data.clownId,
                    role: user_role.CLOWN,
                    deletedAt: null,
                },
            });

            if (!clown) {
                throw new BadRequestException('El payaso seleccionado no existe o no tiene rol CLOWN');
            }
        }

        if (data.customerId) {
            const customer = await this.prisma.user.findFirst({
                where: {
                    id: data.customerId,
                    role: user_role.CLIENT,
                    deletedAt: null,
                },
            });

            if (!customer) {
                throw new BadRequestException('El cliente seleccionado no existe o no tiene rol CLIENT');
            }
        }

        if (data.serviceId) {
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
        }
    }

    async create(data: CreateEventDto) {
        if (!data.clownId) {
            throw new BadRequestException('No se pudo identificar al payaso autenticado');
        }

        await this.validateEventRelations({
            clownId: data.clownId,
            customerId: data.customerId,
            serviceId: data.serviceId,
        });

        const event = await this.prisma.event.create({
            data: {
                clownId: data.clownId,
                customerId: data.customerId,
                serviceId: data.serviceId,
                title: data.title,
                eventDate: new Date(data.eventDate),
                startTime: this.parseTimeToDate(data.startTime),
                address: data.address,
                googleMapsUrl: data.googleMapsUrl,
                childrenCount: data.childrenCount,
                observations: data.observations,
                status: data.status ?? 'PENDING',
                totalAmount: data.totalAmount,
            },
            include: {
                clown: true,
                customer: true,
                service: true,
            },
        });

        return this.formatEvent(event);
    }

    async findAll() {
        const events = await this.prisma.event.findMany({
            where: {
                deletedAt: null,
            },
            include: {
                clown: true,
                customer: true,
                service: true,
            },
            orderBy: {
                eventDate: 'asc',
            },
        });

        return events.map(event => this.formatEvent(event));
    }

    async findOne(id: string) {
        const event = await this.prisma.event.findFirst({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                clown: true,
                customer: true,
                service: true,
            },
        });

        if (!event) {
            throw new NotFoundException('Evento no encontrado');
        }

        return this.formatEvent(event);
    }

    async update(id: string, data: UpdateEventDto) {
        await this.findOne(id);

        await this.validateEventRelations({
            clownId: data.clownId,
            customerId: data.customerId,
            serviceId: data.serviceId,
        });

        const event = await this.prisma.event.update({
            where: { id },
            data: {
                clownId: data.clownId,
                customerId: data.customerId,
                serviceId: data.serviceId,
                title: data.title,
                eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
                startTime: data.startTime
                    ? this.parseTimeToDate(data.startTime)
                    : undefined,
                address: data.address,
                googleMapsUrl: data.googleMapsUrl,
                childrenCount: data.childrenCount,
                observations: data.observations,
                status: data.status,
                totalAmount: data.totalAmount,
            },
            include: {
                clown: true,
                customer: true,
                service: true,
            },
        });

        return this.formatEvent(event);
    }

    async updateStatus(id: string, data: UpdateEventStatusDto) {
        const event = await this.findOne(id);

        const currentStatus = event.status;
        const newStatus = data.status;

        if (currentStatus === event_status.FINISHED) {
            throw new BadRequestException(
                'No se puede cambiar el estado de un evento finalizado',
            );
        }

        if (
            currentStatus === event_status.PENDING &&
            newStatus === event_status.FINISHED
        ) {
            throw new BadRequestException(
                'No se puede finalizar un evento pendiente. Primero debe confirmarse',
            );
        }

        const updatedEvent = await this.prisma.event.update({
            where: { id },
            data: {
                status: newStatus,
            },
            include: {
                clown: true,
                customer: true,
                service: true,
            },
        });

        return this.formatEvent(updatedEvent);
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.event.update({
            where: { id },
            data: { deletedAt: new Date()}
        });
    }
}