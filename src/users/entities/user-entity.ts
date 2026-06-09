import { UserRole } from './user-role.enum';

export class UserEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    phone?: string;
    profileImage?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}