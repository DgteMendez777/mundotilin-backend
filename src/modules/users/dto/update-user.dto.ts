import { UserRole } from "../entities/user-role.enum";

export interface UbdateUserDto {
    filtersName?: string;
    lastName?: string;
    phone?: string;
    profileImage?: string;
    role?: UserRole;
}