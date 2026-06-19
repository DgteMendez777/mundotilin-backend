import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PublicService } from './public.service';

@ApiTags('Public')
@Controller('public')
export class PublicController {
    constructor(private readonly publicService: PublicService) { }

    @Get('featured-services')
    @ApiOperation({
        summary: 'Obtener servicios destacados',
        description:
            'Endpoint público para mostrar servicios activos en la página principal.',
    })
    @ApiResponse({
        status: 200,
        description: 'Servicios destacados obtenidos correctamente',
    })
    getFeaturedServices() {
        return this.publicService.getFeaturedServices();
    }
    @Get('stats')
    @ApiOperation({
        summary: 'Obtener estadísticas generales',
        description:
            'Endpoint público para mostrar estadísticas generales de MundoTilín en la página principal.',
    })
    @ApiResponse({
        status: 200,
        description: 'Estadísticas obtenidas correctamente',
    })
    getStats() {
        return this.publicService.getStats();
    }
}