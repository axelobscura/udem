import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

const connectionConfig = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE_WEBINARS,
    user: process.env.MYSQL_USERNAME_WEBINARS,
    password: process.env.MYSQL_PASSWORD_WEBINARS,
};

type Params = {
    url: string;
};

export async function GET(request: Request, { params }: { params: Promise<Params> }) {
    let connection;
    const { url } = await params;
    try {
        connection = await mysql.createConnection(connectionConfig);
        const results = await connection.execute('SELECT * FROM webinars WHERE url = ?', [url]) as unknown[];
        const tipo = JSON.parse(JSON.stringify(results[0]));
        return NextResponse.json({ tipo: tipo });
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