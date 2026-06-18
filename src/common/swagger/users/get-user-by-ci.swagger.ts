import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

export function ApiGetUserByCiDocs() {
    return applyDecorators(
        ApiBearerAuth('JWT-auth'),
        ApiOperation({
            summary: 'Obtener usario por CI',
            description: 'Busca un usuario con el CI seleccionado'
        }),

        ApiParam({
            name: 'ci',
            description: 'CI unico del usuario',
            example: '12345678'
        }),

        ApiResponse({
            status: 200,
            description: 'Usuario Encontrado'
        }),

        ApiResponse({
            status: 401,
            description: 'Token invalido o no proporcionado'
        }),

        ApiResponse({
            status: 403,
            description: 'No tiene permisos para acceder',
        }),

        ApiResponse({
            status: 404,
            description: 'Usuario no encontrado'
        })
    );
}