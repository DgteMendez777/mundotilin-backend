import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

export function ApiGetUserByIdDocs() {
    return applyDecorators(
        ApiBearerAuth('JWT-auth'),
        ApiOperation({
            summary: 'Obtener usario por ID',
            description: 'Busca un usuario con el ID seleccionado'
        }),

        ApiParam({
            name: 'id',
            description: 'ID unico del usuario',
            example: 'e4d6603d-fe3e-45ef-9a3f-f4e90586686c'
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