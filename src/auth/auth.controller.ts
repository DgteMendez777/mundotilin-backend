import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags  } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiRegisterDocs } from 'src/common/swagger/auth/register.swagger';
import { ApiLoginDocs } from 'src/common/swagger/auth/login.swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiRegisterDocs()
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('login')
  @ApiLoginDocs()
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}