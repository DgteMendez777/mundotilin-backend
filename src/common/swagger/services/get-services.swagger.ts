import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetServicesDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Listar servicios',
            description: 'Devuelve todos los servicios activos o registrados en el catálogo.',
        }),
        ApiResponse({ status: 200, description: 'Servicios obtenidos correctamente' }),
    );
}