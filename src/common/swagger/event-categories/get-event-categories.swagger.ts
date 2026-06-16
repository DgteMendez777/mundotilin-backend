import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetEventCategoriesDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Listar categorías de evento',
            description: 'Devuelve las categorías disponibles para clasificar servicios y eventos.',
        }),
        ApiResponse({
            status: 200,
            description: 'Categorías obtenidas correctamente',
        }),
    );
}