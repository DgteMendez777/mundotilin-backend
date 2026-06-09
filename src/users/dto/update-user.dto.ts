import { user_role } from '@prisma/client';

export class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    profileImage?: string;
    role?: user_role;
}