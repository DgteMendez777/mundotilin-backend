import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEventCategoryDto } from '../../../event-categories/dto/create-event-category.dto';

export function ApiCreateEventCategoryDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Crear categoría de evento',
            description: 'Permite al payaso crear una nueva categoría como cumpleaños, baby shower u otros.',
        }),
        ApiBody({ type: CreateEventCategoryDto }),
        ApiResponse({
            status: 201,
            description: 'Categoría creada correctamente',
        }),
        ApiResponse({
            status: 401,
            description: 'Token inválido o no proporcionado',
        }),
        ApiResponse({
            status: 403,
            description: 'No tiene permisos para crear categorías',
        }),
    );
}