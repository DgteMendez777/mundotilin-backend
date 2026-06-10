import { Module } from '@nestjs/common';
import { EventCategoriesController } from './event-categories.controller';
import { EventCategoriesService } from './event-categories.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EventCategoriesController],
  providers: [EventCategoriesService]
})
export class EventCategoriesModule {}
