export class TestimonialEntity {
  id: string;
  clientName: string;
  comment: string;
  rating: number;
  eventType?: string | null;
  imageUrl?: string | null;
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}