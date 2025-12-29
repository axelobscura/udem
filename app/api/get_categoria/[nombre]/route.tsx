import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

const connectionConfig = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE_WEBINARS,
    user: process.env.MYSQL_USERNAME_WEBINARS,
    password: process.env.MYSQL_PASSWORD_WEBINARS,
};

type Params = {
    nombre: string;
};

export async function GET(request: Request, { params }: { params: Promise<Params> }) {
    let connection;
    const { nombre } = await params;
    //console.log('nombre: ', nombre);
    try {
        connection = await mysql.createConnection(connectionConfig);
        const results = await connection.execute('SELECT * FROM categorias WHERE link = ?', [nombre]) as unknown[];
        const categoria = JSON.parse(JSON.stringify(results[0]));
        const categoriaId = Number(categoria[0].id);
        const results2 = await connection.execute('SELECT * FROM webinars WHERE id_categoria = ?', [categoriaId]) as unknown[];
        const webinars = JSON.parse(JSON.stringify(results2 || []));
        return NextResponse.json({ message: 'categoria', webinars, categoria: categoria });
    } catch (error) {
        console.error('Error fetching aplicaciones:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}