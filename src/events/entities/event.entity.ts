import { event_status } from '@prisma/client';

export class EventEntity {
    id: string;
    clownId: string;
    customerId: string;
    serviceId: string;
    title: string;
    eventDate: Date;
    startTime: Date;
    address: string;
    googleMapsUrl?: string | null;
    childrenCount?: number | null;
    observations?: string | null;
    status: event_status;
    totalAmount: number;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}