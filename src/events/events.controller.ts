import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';
import { ApiCreateEventDocs } from '../common/swagger/events/create-event.swagger';
import { ApiGetEventsDocs } from '../common/swagger/events/get-events.swagger';
import { ApiGetEventByIdDocs } from '../common/swagger/events/get-event-by-id.swagger';
import { ApiUpdateEventDocs } from '../common/swagger/events/update-event.swagger';
import { ApiDeleteEventDocs } from '../common/swagger/events/delete-event.swagger';
import { ApiUpdateEventStatusDocs } from '../common/swagger/events/update-event-status.swagger';

@ApiTags('Events')
@ApiBearerAuth('JWT-auth')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    @ApiCreateEventDocs()
    create(@Body() data: CreateEventDto, @Req() req: any) {
        return this.eventsService.create({
            ...data, 
            clownId: req.user.id
        });
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiGetEventsDocs()
    findAll() {
        return this.eventsService.findAll();
    }

    @Get(':id')
    @ApiGetEventByIdDocs()
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.eventsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiUpdateEventDocs()
    @Roles('CLOWN')
    update(@Param('id') id: string, @Body() data: UpdateEventDto) {
        return this.eventsService.update(id, data);
    }

    @Patch(':id/status')
    @ApiUpdateEventStatusDocs()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    updateStatus(@Param('id') id: string, @Body() data: UpdateEventStatusDto) {
        return this.eventsService.updateStatus(id, data);
    }

    @Delete(':id/remove')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiDeleteEventDocs()
    @Roles('CLOWN')
    remove(@Param('id') id: string) {
        return this.eventsService.remove(id);
    }
}