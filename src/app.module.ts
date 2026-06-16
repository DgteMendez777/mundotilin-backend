import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { EventCategoriesModule } from './event-categories/event-categories.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, EventsModule, EventCategoriesModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
