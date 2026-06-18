import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiDeleteEventDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar evento',
      description: 'Realiza una eliminación lógica del evento mediante deletedAt.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del evento',
      example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
    }),
    ApiResponse({ status: 200, description: 'Evento eliminado correctamente' }),
    ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' }),
    ApiResponse({ status: 403, description: 'No tiene permisos para eliminar eventos' }),
    ApiResponse({ status: 404, description: 'Evento no encontrado' }),
  );
}