import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async register(data: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(data.email);

    if (existingUser) {
      throw new BadRequestException(
        'El correo ya existe',
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.createUser({ ...data, password: hashedPassword });

    return user;
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash,);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );
    }

    const token = this.jwtService.sign({ userId: user.id, role: user.role });

    return {
      message: 'Login exitoso',
      token
    };
  }
}