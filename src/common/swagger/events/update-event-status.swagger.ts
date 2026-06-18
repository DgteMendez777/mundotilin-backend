import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateEventStatusDto } from '../../../events/dto/update-event-status.dto';

export function ApiUpdateEventStatusDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar estado del evento',
      description: 'Permite cambiar el estado de una reserva entre PENDING, CONFIRMED y FINISHED.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del evento',
      example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
    }),
    ApiBody({ type: UpdateEventStatusDto }),
    ApiResponse({ status: 200, description: 'Estado del evento actualizado correctamente' }),
    ApiResponse({ status: 400, description: 'Transición de estado inválida' }),
    ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' }),
    ApiResponse({ status: 403, description: 'No tiene permisos para cambiar estados' }),
    ApiResponse({ status: 404, description: 'Evento no encontrado' }),
  );
}