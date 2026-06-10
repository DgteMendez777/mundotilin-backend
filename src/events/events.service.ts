import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateEventDto) {
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
            }
        });
    }

    async findAll(){
        return this.prisma.event.findMany({
            include: {
                clown: true,
                customer: true,
                service: true
            }
        });
    }

    async findOne(id: string){
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                clown: true,
                customer: true,
                service: true
            }
        });

        if(!event) {
            throw new NotFoundException('Evento no encontrado');
        }

        return event;
    }

    async update(id: string, data: UpdateEventDto) {
        await this.findOne(id);
        
        return this.prisma.event.update({
            where: { id },
            data: {
                ...data,
                eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
                startTime: data.startTime
                    ? new Date(`1970-01-01T${data.startTime}:00`)
                    : undefined,
            }
        });
    }
}
