import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventCategoriesService } from './event-categories.service';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiCreateEventCategoryDocs } from '../common/swagger/event-categories/create-event-category.swagger';
import { ApiGetEventCategoriesDocs } from '../common/swagger/event-categories/get-event-categories.swagger';
import { ApiGetEventCategoryByIdDocs } from '../common/swagger/event-categories/get-event-category-by-id.swagger';
import { ApiUpdateEventCategoryDocs } from '../common/swagger/event-categories/update-event-category.swagger';
import { ApiDeleteEventCategoryDocs } from '../common/swagger/event-categories/delete-event-category.swagger';

@ApiTags('Event Categories')
@ApiBearerAuth('JWT-auth')
@Controller('event-categories')
export class EventCategoriesController {
  constructor(private readonly eventCategoriesService: EventCategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  @ApiCreateEventCategoryDocs()
  create(@Body() data: CreateEventCategoryDto) {
    return this.eventCategoriesService.create(data);
  }

  @Get()
  @ApiGetEventCategoriesDocs()
  findAll() {
    return this.eventCategoriesService.findAll();
  }

  @Get(':id')
  @ApiGetEventCategoryByIdDocs()
  findOne(@Param('id') id: string) {
    return this.eventCategoriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  @ApiUpdateEventCategoryDocs()
  update(@Param('id') id: string, @Body() data: UpdateEventCategoryDto) {
    return this.eventCategoriesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  @ApiDeleteEventCategoryDocs()
  remove(@Param('id') id: string) {
    return this.eventCategoriesService.remove(id);
  }
}