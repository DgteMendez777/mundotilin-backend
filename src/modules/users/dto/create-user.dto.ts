import { UserRole } from "../entities/user-role.enum";

export interface createUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
}