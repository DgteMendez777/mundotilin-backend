import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateEventCategoryDto } from '../../../event-categories/dto/update-event-category.dto';

export function ApiUpdateEventCategoryDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Actualizar categoría de evento',
            description: 'Permite modificar el nombre o descripción de una categoría existente.',
        }),
        ApiParam({
            name: 'id',
            description: 'ID único de la categoría',
            example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
        }),
        ApiBody({ type: UpdateEventCategoryDto }),
        ApiResponse({
            status: 200,
            description: 'Categoría actualizada correctamente',
        }),
        ApiResponse({
            status: 401,
            description: 'Token inválido o no proporcionado',
        }),
        ApiResponse({
            status: 403,
            description: 'No tiene permisos para actualizar categorías',
        }),
        ApiResponse({
            status: 404,
            description: 'Categoría no encontrada',
        }),
    );
}