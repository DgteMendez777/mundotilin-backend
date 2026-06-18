import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEventDto } from '../../../events/dto/create-event.dto';

export function ApiCreateEventDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear evento',
      description: 'Permite registrar una reserva asociada a un payaso, cliente y servicio.',
    }),
    ApiBody({ type: CreateEventDto }),
    ApiResponse({ status: 201, description: 'Evento creado correctamente' }),
    ApiResponse({ status: 400, description: 'Relaciones inválidas o datos incorrectos' }),
    ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' }),
    ApiResponse({ status: 403, description: 'No tiene permisos para crear eventos' }),
  );
}