import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-sevice.dto';

@Injectable()
export class ServicesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateServiceDto) {
        if(data.categoryId) {
            const category = await this.prisma.eventCategory.findFirst({
                where: {
                    id: data.categoryId,
                    deletedAt: null
                }
            })

            if(!category) {
                throw new BadRequestException('La categoria seleccionada no existe');
            }
        }

        return this.prisma.service.create({
            data: {
                categoryId: data.categoryId,
                name: data.name,
                description: data.description,
                basePrice: data.basePrice,
                coverImage: data.coverImage,
                isActive: data.isActive
            }
        })
    }

    async findAll() {
        return this.prisma.service.findMany({
            where: { deletedAt: null },
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        })
    }

    async findOne(id: string) {
        const service = await this.prisma.service.findFirst({
            where: { id, deletedAt: null },
            include: { category: true }
        });

        if(!service) {
            throw new BadRequestException('Servicio no encontrado');
        }

        return service;
    }

    async update(id: string, data: UpdateServiceDto) {
        await this.findOne(id);

        if(data.categoryId) {
            const category = await this.prisma.eventCategory.findFirst({
                where: {
                    id: data.categoryId,
                    deletedAt: null
                }
            })

            if(!category) {
                throw new BadRequestException('La categoria seleccionada no existe');
            }
        }

        return this.prisma.service.update({
            where: { id },
            data: {
                categoryId: data.categoryId,
                name: data.name,
                description: data.description,
                basePrice: data.basePrice,
                coverImage: data.coverImage,
                isActive: data.isActive
            }
        })
    }

    async activate(id: string) {
        await this.findOne(id)

        return this.prisma.service.update({
            where: { id },
            data: { isActive: true }
        });
    }

    async deactivate(id: string) {
        await this.findOne(id)

        return this.prisma.service.update({
            where: { id },
            data: { isActive: false }
        });
    }

    async remove(id: string) {
        await this.findOne(id)

        return this.prisma.service.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false }
        });
    }
}
