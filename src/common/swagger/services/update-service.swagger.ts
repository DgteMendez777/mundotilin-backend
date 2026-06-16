import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateServiceDto } from '../../../services/dto/update-sevice.dto';

export function ApiUpdateServiceDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Actualizar servicio',
            description: 'Permite modificar los datos de un servicio existente.',
        }),
        ApiParam({
            name: 'id',
            description: 'ID único del servicio',
            example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
        }),
        ApiBody({ type: UpdateServiceDto }),
        ApiResponse({ status: 200, description: 'Servicio actualizado correctamente' }),
        ApiResponse({ status: 400, description: 'La categoría seleccionada no existe o los datos son inválidos' }),
        ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' }),
        ApiResponse({ status: 403, description: 'No tiene permisos para actualizar servicios' }),
        ApiResponse({ status: 404, description: 'Servicio no encontrado' }),
    );
}