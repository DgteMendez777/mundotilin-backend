import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateTestimonialDto, clientId: string) {
  const client = await this.prisma.user.findFirst({
    where: {
      id: clientId,
      role: 'CLIENT',
      deletedAt: null,
    },
  });

  if (!client) {
    throw new NotFoundException('Cliente no encontrado');
  }

  return this.prisma.testimonial.create({
    data: {
      clientId,
      clientName: data.clientName,
      comment: data.comment,
      rating: data.rating ?? 5,
      eventType: data.eventType,
      imageUrl: data.imageUrl,
      isFeatured: false,
      isActive: true,
    },
    include: {
      client: true,
    },
  });
}

    async findPublic() {
        return this.prisma.testimonial.findMany({
            where: {
                isActive: true,
                deletedAt: null,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findFeatured() {
        return this.prisma.testimonial.findMany({
            where: {
                isActive: true,
                isFeatured: true,
                deletedAt: null,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 6,
        });
    }

    async findAdmin() {
        return this.prisma.testimonial.findMany({
            where: {
                deletedAt: null,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        const testimonial = await this.prisma.testimonial.findFirst({
            where: {
                id,
                deletedAt: null,
            },
        });

        if (!testimonial) {
            throw new NotFoundException('Testimonio no encontrado');
        }

        return testimonial;
    }

    async update(id: string, data: UpdateTestimonialDto) {
        await this.findOne(id);

        return this.prisma.testimonial.update({
            where: { id },
            data: {
                clientName: data.clientName,
                comment: data.comment,
                rating: data.rating,
                eventType: data.eventType,
                imageUrl: data.imageUrl,
                isFeatured: data.isFeatured,
                isActive: data.isActive,
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.testimonial.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                isActive: false,
            },
        });
    }
}