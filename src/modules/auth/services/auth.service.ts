import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { UsersService } from "../../users/services/users.service";

export class AuthService {
    private usersService = new UsersService();

    async register(data: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(data.email);
        
        if(existingUser) {
            throw new Error('el correo ya existe');
        }

        const user = await this.usersService.createUser(data);

        return user;
    }

    async login(data: LoginDto){
        const user = await this.usersService.findByEmail(data.email);

        if(!user) {
            throw new Error('Credenciales invalidas');
        }

        if(user.password_hash !== user.password) {
            throw new Error('Credenciales invalidas');
        }

        return {message: 'Login exitoso'};
    }
}