import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiGetServiceByIdDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Obtener servicio por ID',
            description: 'Busca un servicio específico mediante su identificador.',
        }),
        ApiParam({
            name: 'id',
            description: 'ID único del servicio',
            example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
        }),
        ApiResponse({ status: 200, description: 'Servicio encontrado' }),
        ApiResponse({ status: 404, description: 'Servicio no encontrado' }),
    );
}