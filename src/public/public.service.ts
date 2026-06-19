import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicService {
    constructor(private readonly prisma: PrismaService) { }

    async getFeaturedServices() {
        return this.prisma.service.findMany({
            where: {
                isActive: true,
                deletedAt: null,
            },
            select: {
                id: true,
                name: true,
                description: true,
                basePrice: true,
                coverImage: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 6,
        });
    }

    async getStats() {
        const [
            servicesCount,
            categoriesCount,
            completedEventsCount,
            totalEventsCount,
        ] = await Promise.all([
            this.prisma.service.count({
                where: {
                    isActive: true,
                    deletedAt: null,
                },
            }),

            this.prisma.eventCategory.count({
                where: {
                    deletedAt: null,
                },
            }),

            this.prisma.event.count({
                where: {
                    status: 'FINISHED',
                    deletedAt: null,
                },
            }),

            this.prisma.event.count({
                where: {
                    deletedAt: null,
                },
            }),
        ]);

        return {
            servicesCount,
            categoriesCount,
            completedEventsCount,
            totalEventsCount,
            experienceYears: 5,
        };
    }
}