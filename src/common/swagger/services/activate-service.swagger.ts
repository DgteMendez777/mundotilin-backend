import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiActivateServiceDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Activar servicio',
            description: 'Cambia el estado del servicio a activo para mostrarlo como disponible.',
        }),
        ApiParam({
            name: 'id',
            description: 'ID único del servicio',
            example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
        }),
        ApiResponse({ status: 200, description: 'Servicio activado correctamente' }),
        ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' }),
        ApiResponse({ status: 403, description: 'No tiene permisos para activar servicios' }),
        ApiResponse({ status: 404, description: 'Servicio no encontrado' }),
    );
}