import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetEventsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar eventos',
      description: 'Devuelve todos los eventos registrados no eliminados.',
    }),
    ApiResponse({ status: 200, description: 'Eventos obtenidos correctamente' }),
    ApiResponse({ status: 401, description: 'Token inválido o no proporcionado' }),
  );
}