import { user_role } from '@prisma/client';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  ci?: string;
  password: string;
  phone?: string;
  role: user_role;
}