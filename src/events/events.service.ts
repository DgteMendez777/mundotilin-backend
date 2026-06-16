import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { user_role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
    constructor(private readonly prisma: PrismaService) {}

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
        await this.validateEventRelations({
            clownId: data.clownId,
            customerId: data.customerId,
            serviceId: data.serviceId,
        });

        return this.prisma.event.create({
            data: {
                clownId: data.clownId,
                customerId: data.customerId,
                serviceId: data.serviceId,
                title: data.title,
                eventDate: new Date(data.eventDate),
                startTime: new Date(`1970-01-01T${data.startTime}:00`),
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
    }

    async findAll() {
        return this.prisma.event.findMany({
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

        return event;
    }

    async update(id: string, data: UpdateEventDto) {
        await this.findOne(id);

        await this.validateEventRelations({
            clownId: data.clownId,
            customerId: data.customerId,
            serviceId: data.serviceId,
        });

        return this.prisma.event.update({
            where: { id },
            data: {
                clownId: data.clownId,
                customerId: data.customerId,
                serviceId: data.serviceId,
                title: data.title,
                eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
                startTime: data.startTime ? new Date(`1970-01-01T${data.startTime}:00`) : undefined,
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
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.event.update({
            where: { id },
            data: { deletedAt: new Date()}
        });
    }
}