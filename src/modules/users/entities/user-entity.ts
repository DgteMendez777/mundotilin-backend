import { UserRole } from "./user-role.enum";

export interface UserEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    phone: string;
    profileImage: string | null;
    role: UserRole;
    createdAt: Date;
    updateAt: Date;
    deletedAt: Date;
}