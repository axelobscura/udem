import { NextResponse } from "next/server";
import mysql, { RowDataPacket } from 'mysql2/promise';

const connectionConfig = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE_WEBINARS,
    user: process.env.MYSQL_USERNAME_WEBINARS,
    password: process.env.MYSQL_PASSWORD_WEBINARS,
};

type Params = {
    webinar: string;
};

export async function GET(request: Request, { params }: { params: Promise<Params> }) {
    let connection;
    const { webinar } = await params;
    console.log('webinar: ', webinar);
    try {
        connection = await mysql.createConnection(connectionConfig);
        const results = await connection.execute('SELECT * FROM webinars WHERE url = ?', [webinar]) as unknown[];
        const categoria = JSON.parse(JSON.stringify(results[0]));
        const [rows2] = await connection.execute(`SELECT * FROM ${categoria[0].preguntas}`) as [RowDataPacket[], unknown];
        const pregRep = [];
        for (let i = 0; i < rows2.length; i++) {
            const [rows3] = await connection.execute(`SELECT * FROM ${categoria[0].respuestas} where id_pregunta = ?`, [rows2[i].id]) as [RowDataPacket[], unknown];
            pregRep.push({ id: Number(rows2[i].id), pregunta: rows2[i].pregunta, respuesta: rows3 });
        }
        return NextResponse.json({ message: 'evaluacion', preguntas: pregRep });
    } catch (error) {
        console.error('Error fetching aplicaciones:', error);
        return NextResponse.json(
            { error: 'Failed to fetch evaluaciones' },
            { status: 500 }
        );
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}