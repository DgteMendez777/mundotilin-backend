import { EventStatus } from "./event-status.enum";

export class EventEntity {
    id: string;
    clownId: string;
    customerId: string;
    serviceId: string;
    title: string;
    eventDate: Date;
    startTime: Date;
    address: string;
    googleMapsUrl?: string;
    childrenCount?: number;
    observations?: string;
    status: EventStatus;
    totalAmount: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}