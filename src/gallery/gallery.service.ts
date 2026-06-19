import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryMediaDto } from './dto/create-gallery-media.dto';
import { UpdateGalleryMediaDto } from './dto/update-gallery-media.dto';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateGalleryMediaDto) {
    return this.prisma.galleryMedia.create({
      data: {
        title: data.title,
        description: data.description,
        url: data.url,
        publicId: data.publicId,
        type: data.type,
        isFeatured: data.isFeatured ?? false,
        isActive: data.isActive ?? true,
      },
    });
  }

  async findPublic() {
    return this.prisma.galleryMedia.findMany({
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
    return this.prisma.galleryMedia.findMany({
      where: {
        isActive: true,
        isFeatured: true,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 8,
    });
  }

  async findAdmin() {
    return this.prisma.galleryMedia.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const media = await this.prisma.galleryMedia.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!media) {
      throw new NotFoundException('Elemento de galería no encontrado');
    }

    return media;
  }

  async update(id: string, data: UpdateGalleryMediaDto) {
    await this.findOne(id);

    return this.prisma.galleryMedia.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        url: data.url,
        publicId: data.publicId,
        type: data.type,
        isFeatured: data.isFeatured,
        isActive: data.isActive,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.galleryMedia.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }
}