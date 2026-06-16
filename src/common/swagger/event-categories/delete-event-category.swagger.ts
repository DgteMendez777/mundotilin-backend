import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiDeleteEventCategoryDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Eliminar categoría de evento',
            description: 'Realiza una eliminación lógica de la categoría mediante deletedAt.',
        }),
        ApiParam({
            name: 'id',
            description: 'ID único de la categoría',
            example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
        }),
        ApiResponse({
            status: 200,
            description: 'Categoría eliminada correctamente',
        }),
        ApiResponse({
            status: 401,
            description: 'Token inválido o no proporcionado',
        }),
        ApiResponse({
            status: 403,
            description: 'No tiene permisos para eliminar categorías',
        }),
        ApiResponse({
            status: 404,
            description: 'Categoría no encontrada',
        }),
  );
}