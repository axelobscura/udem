// pages/api/users.js
import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

const connectionConfig = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE_WEBINARS,
  user: process.env.MYSQL_USERNAME_WEBINARS,
  password: process.env.MYSQL_PASSWORD_WEBINARS,
};

export async function GET() {
  let connection;
  
  try {
    connection = await mysql.createConnection(connectionConfig);
    const [rows] = await connection.execute('SELECT * FROM categorias');
    return NextResponse.json(rows);
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