import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { UsersService } from "../../users/services/users.service";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/jwt";

export class AuthService {
    private usersService = new UsersService();

    async register(data: RegisterDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const existingUser = await this.usersService.findByEmail(data.email);
        
        if(existingUser) {
            throw new Error('el correo ya existe');
        }

        const user = await this.usersService.createUser({...data, password: hashedPassword});

        return user;
    }

    async login(data: LoginDto){
        const user = await this.usersService.findByEmail(data.email);
        const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);

        if(!user) {
            throw new Error('Credenciales invalidas');
        }

        if(!isPasswordValid) {
            throw new Error('Credenciales invalidas');
        }

        const token = generateToken(user.id, user.role);

        return {message: 'Login exitoso', token};
    }
}