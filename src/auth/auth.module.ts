import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    AnalyticsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
})
export class AuthModule {}