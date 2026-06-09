import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async createUser(data: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                passwordHash: data.password,
                phone: data.phone,
                role: data.role
            }
        });
    }
}