import pool from "../../../config/db";
import { CreateUserDto } from "../dto/create-user.dto";

export class UsersService {
    async findAll() {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    }

    async findById(id: string) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }

    async findByEmail(email: string) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    async createUser(data: CreateUserDto) {
        const query = `INSERT INTO users ( first_name, last_name, email, password_hash, phone, role) VALUES (
                $1, $2, $3, $4, $5, $6
            ) RETURNING *`;
        
        const values = [
            data.firstName,
            data.lastName,
            data.email,
            data.password,
            data.phone,
            data.role
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    }
}