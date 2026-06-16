import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiRemoveServiceDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Eliminar servicio',
            description: 'Realiza una eliminación lógica del servicio mediante deletedAt.',
        }),
        ApiParam({
            name: 'id',
            description: 'ID único del servicio',
            example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
        }),
        ApiResponse({ status: 200, description: 'Servicio eliminado correctamente' }),
        ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' }),
        ApiResponse({ status: 403, description: 'No tiene permisos para eliminar servicios' }),
        ApiResponse({ status: 404, description: 'Servicio no encontrado' }),
    );
}