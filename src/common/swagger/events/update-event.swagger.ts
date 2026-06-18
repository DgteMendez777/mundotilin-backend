import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateEventDto } from '../../../events/dto/update-event.dto';

export function ApiUpdateEventDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar evento',
      description: 'Permite modificar los datos principales de una reserva.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único del evento',
      example: '4f7f9d2d-8b5a-4c8f-9f23-123456789abc',
    }),
    ApiBody({ type: UpdateEventDto }),
    ApiResponse({ status: 200, description: 'Evento actualizado correctamente' }),
    ApiResponse({ status: 400, description: 'Relaciones inválidas o datos incorrectos' }),
    ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' }),
    ApiResponse({ status: 403, description: 'No tiene permisos para actualizar eventos' }),
    ApiResponse({ status: 404, description: 'Evento no encontrado' }),
  );
}