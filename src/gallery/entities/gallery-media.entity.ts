import { media_type } from '@prisma/client';

export class GalleryMediaEntity {
  id: string;
  title: string;
  description?: string | null;
  url: string;
  publicId?: string | null;
  type: media_type;
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}