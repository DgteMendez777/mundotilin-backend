import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(data.email);

    if (existingUser) {
      throw new BadRequestException('El correo ya existe');
    }

    if (data.ci) {
      const existingCi = await this.usersService.findExistingByCi(data.ci);

      if (existingCi) {
        throw new BadRequestException('El CI ya está registrado');
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.createUser({
      ...data,
      password: hashedPassword,
    });

    await this.analyticsService.trackEvent('user_registered', user.id, {
      role: user.role,
    });

    return user;
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      role: user.role,
    });

    await this.analyticsService.trackEvent('login_success', user.id, {
      role: user.role,
    });

    return {
      message: 'Login exitoso',
      token,
    };
  }
}