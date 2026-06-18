import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        return user;
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email }
        });
    }

    async createUser(data: CreateUserDto) {
        return await this.prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                ci: data.ci,
                passwordHash: data.password,
                phone: data.phone,
                role: data.role
            }
        });
    }

    async findByCi(ci: string) {
        const user = await this.prisma.user.findFirst({
            where: { ci, deletedAt: null }
        });

        if (!user) {
            throw new NotFoundException('Usuario no encontrado por ci');
        }

        return user;
    }

    async findExistingByCi(ci: string) {
        return this.prisma.user.findFirst({
            where: {
                ci,
                deletedAt: null,
            },
        });
    }
}