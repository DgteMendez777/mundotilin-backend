import pool from "../../../config/db";

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
}