// pages/api/users.js
import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';

const connectionConfig = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
};

export async function GET() {
  let connection;

  try {
    connection = await mysql.createConnection(connectionConfig);
    const [rows] = await connection.execute('SELECT * FROM usuarios');
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

export async function POST(request: NextRequest) {
  let connection;

  try {
    connection = await mysql.createConnection(connectionConfig);
    const { email, password } = await request.json();

    // SELECT query to find user with matching email and password
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      'SELECT * FROM usuarios WHERE email = ? AND password = ?',
      [email, password]
    );

    // Check if user exists
    if (Array.isArray(rows) && rows.length > 0) {
      // User found - login successful
      const user = rows[0] as {
        id: number;
        email: string;
        nombre?: string;
        categoria?: string;
        password?: string;
        [key: string]: unknown;
      };

      // Create user object without password
      const { password, ...userWithoutPassword } = user;
      console.log(password);

      return NextResponse.json(
        {
          message: 'Login successful',
          user: userWithoutPassword
        },
        { status: 200 }
      );
    } else {
      // User not found - invalid credentials
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}