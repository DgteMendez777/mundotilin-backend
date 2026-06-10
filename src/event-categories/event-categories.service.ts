import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';

@Injectable()
export class EventCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEventCategoryDto) {
    return this.prisma.eventCategory.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async findAll() {
    return this.prisma.eventCategory.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        services: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.eventCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        services: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Categoría de evento no encontrada');
    }

    return category;
  }

  async update(id: string, data: UpdateEventCategoryDto) {
    await this.findOne(id);

    return this.prisma.eventCategory.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.eventCategory.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}