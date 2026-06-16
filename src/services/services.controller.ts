import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateServiceDto } from './dto/update-sevice.dto';
import { ApiCreateServiceDocs } from '../common/swagger/services/create-service.swagger';
import { ApiGetServicesDocs } from '../common/swagger/services/get-services.swagger';
import { ApiGetServiceByIdDocs } from '../common/swagger/services/get-service-by-id.swagger';
import { ApiUpdateServiceDocs } from '../common/swagger/services/update-service.swagger';
import { ApiActivateServiceDocs } from '../common/swagger/services/activate-service.swagger';
import { ApiDeactivateServiceDocs } from '../common/swagger/services/deactivate-service.swagger';
import { ApiRemoveServiceDocs } from '../common/swagger/services/remove-service.swagger';

@ApiTags('Services')
@ApiBearerAuth('JWT-auth')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    @ApiCreateServiceDocs()
    create(@Body() data: CreateServiceDto) {
        return this.servicesService.create(data);
    }

    @Get()
    @ApiGetServicesDocs()
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    @ApiGetServiceByIdDocs()
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    @ApiUpdateServiceDocs()
    update(@Param('id') id: string, @Body() data: UpdateServiceDto) {
        return this.servicesService.update(id, data);
    }

    @Patch(':id/activate')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    @ApiActivateServiceDocs()
    activate(@Param('id') id: string) {
        return this.servicesService.activate(id);
    }

    @Patch(':id/deactivate')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    @ApiDeactivateServiceDocs()
    deactivate(@Param('id') id: string) {
        return this.servicesService.deactivate(id);
    }

    @Delete(':id/remove')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('CLOWN')
    @ApiRemoveServiceDocs()
    remove(@Param('id') id: string) {
        return this.servicesService.remove(id);
    }
}