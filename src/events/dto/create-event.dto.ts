import { EventStatus } from "../entities/event-status.enum";

export class CreateEventDto {
    clownId: string;
    customerId: string;
    serviceId: string;
    title: string;
    eventDate: string;
    startTime: string;
    address: string;
    googleMapsUrl?: string;
    childrenCount?: number;
    observations?: string;
    status: EventStatus;
    totalAmount: number;
}