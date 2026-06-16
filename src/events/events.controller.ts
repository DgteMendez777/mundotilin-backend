import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Events')
@ApiBearerAuth('JWT-auth')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    create(@Body() data: CreateEventDto) {
        return this.eventsService.create(data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.eventsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.eventsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    update(@Param('id') id: string, @Body() data: UpdateEventDto) {
        return this.eventsService.update(id, data);
    }

    @Delete(':id/remove')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    remove(@Param('id') id: string) {
        return this.eventsService.remove(id);
    }
}