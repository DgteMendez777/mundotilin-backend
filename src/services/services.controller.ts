import { Body, Controller, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateServiceDto } from './dto/update-sevice.dto';

@ApiTags('Services')
@ApiBearerAuth('JWT-auth')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    create(@Body() data: CreateServiceDto) {
        return this.servicesService.create(data);
    }

    @Get()
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    update(@Param('id') id: string, @Body() data: UpdateServiceDto) {
        return this.servicesService.update(id, data);
    }

    @Patch(':id/activate')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    activate(@Param('id') id: string) {
        return this.servicesService.activate(id);
    }

    @Patch(':id/deactivate')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    deactivate(@Param('id') id: string) {
        return this.servicesService.deactivate(id);
    }

    @Patch(':id/remove')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    remove(@Param('id') id: string) {
        return this.servicesService.remove(id);
    }
}