import 'dotenv/config';

import fs from 'fs';
import path from 'path';

import pool from '../config/db';

async function runMigrations(): Promise<void> {
    try {

        const migrationsPath = path.join(
            __dirname,
            'migrations'
        );

        const files = fs
            .readdirSync(migrationsPath)
            .filter(file => file.endsWith('.sql'))
            .sort();

        for (const file of files) {

            console.log(`Ejecutando migración: ${file}`);

            const sql = fs.readFileSync(
                path.join(migrationsPath, file),
                'utf8'
            );

            await pool.query(sql);

            console.log(`${file} completada`);
        }

        console.log('Todas las migraciones ejecutadas');

        process.exit(0);

    } catch (error) {

        console.error(error);

        process.exit(1);
    }
}

runMigrations();