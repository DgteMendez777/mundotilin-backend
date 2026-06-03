import { UserRole } from "../../users/entities/user-role.enum";

export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole
}