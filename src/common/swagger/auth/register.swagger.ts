import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RegisterDto } from "src/auth/dto/register.dto";

export function ApiRegisterDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Registrar un nuevo usuario',
            description: 'Permite registrar usuarios CLOWN o CLIENT'
        }),

        ApiBody({
            type: RegisterDto
        }),

        ApiResponse({
            status: 200,
            description: 'usuario registrado exitosamnte'
        }),

        ApiResponse({
            status: 400,
            description: 'Correo Existente'
        })
    );
}