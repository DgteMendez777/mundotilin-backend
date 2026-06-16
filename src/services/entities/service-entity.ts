export class ServiceEntity {
    id: string;
    categoryId?: string | null;
    name: string;
    description?: string | null;
    basePrice: number;
    coverImage?: string | null;
    isActive: boolean;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}