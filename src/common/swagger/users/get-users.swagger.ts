import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetUsersDocs() {
    return applyDecorators(
        ApiBearerAuth('JWT-auth'),
        ApiOperation({
            summary: 'Obtener todos los usuarios',
            description: 'Devuelve la lista completa de usuarios registrados.',
        }),
        
        ApiResponse({
            status: 200,
            description: 'Lista de usuarios obtenida correctamente',
        }),
        
        ApiResponse({
            status: 401,
            description: 'Token inválido o no proporcionado',
        }),
        
        ApiResponse({
            status: 403,
            description: 'No tiene permisos para acceder',
        }),
    );
}