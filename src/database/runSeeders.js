require('dotenv').config();

const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

async function runSeeders() {
    try {
        const seedersPath = path.join(
            __dirname,
            'seeders'
        );
        const files = fs
            .readdirSync(seedersPath)
            .filter(file => file.endsWith('.sql'))
            .sort();

        for (const file of files) {
            console.log(`Ejecutando seeder: ${file}`);
            const sql = fs.readFileSync(
                path.join(seedersPath, file),
                'utf8'
            );
            await pool.query(sql);
            console.log(`${file} completado`);
        }
        console.log('Todos los seeders ejecutados');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runSeeders();