export class EventCategoryEntity {
    id: string;
    name: string;
    description?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}