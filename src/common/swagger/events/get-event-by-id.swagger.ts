import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiGetEventByIdDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener evento por ID',
      description: 'Busca una reserva específica mediante su identificador.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del evento',
      example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
    }),
    ApiResponse({ status: 200, description: 'Evento encontrado' }),
    ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' }),
    ApiResponse({ status: 404, description: 'Evento no encontrado' }),
  );
}