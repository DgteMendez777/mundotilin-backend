import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateServiceDto } from '../../../services/dto/create-service.dto';

export function ApiCreateServiceDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Crear servicio',
            description: 'Permite al payaso crear un nuevo servicio o paquete del catálogo.',
        }),
        ApiBody({ type: CreateServiceDto }),
        ApiResponse({ status: 201, description: 'Servicio creado correctamente' }),
        ApiResponse({ status: 400, description: 'La categoría seleccionada no existe o los datos son inválidos' }),
        ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' }),
        ApiResponse({ status: 403, description: 'No tiene permisos para crear servicios' }),
    );
}