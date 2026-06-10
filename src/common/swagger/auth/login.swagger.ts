import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../../../auth/dto/login.dto';

export function ApiLoginDocs() {
    return applyDecorators(
        ApiOperation({
            summary: 'Iniciar sesión',
            description: 'Valida las credenciales del usuario y devuelve un token JWT.',
        }),
            
        ApiBody({ 
            type: LoginDto 
        }),
        
        ApiResponse({
            status: 200,
            description: 'Login exitoso',
        }),

        ApiResponse({
            status: 401,
            description: 'Credenciales inválidas',
        }),
    );
}