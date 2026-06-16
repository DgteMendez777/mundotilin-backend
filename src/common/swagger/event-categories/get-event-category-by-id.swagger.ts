import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiGetEventCategoryByIdDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Obtener categoría por ID',
            description: 'Busca una categoría de evento específica mediante su identificador.',
        }),
        ApiParam({
            name: 'id',
            description: 'ID único de la categoría',
            example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
        }),
        ApiResponse({
            status: 200,
            description: 'Categoría encontrada',
        }),
        ApiResponse({
            status: 404,
            description: 'Categoría no encontrada',
        }),
    );
}