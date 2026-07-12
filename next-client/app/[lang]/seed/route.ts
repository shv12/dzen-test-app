import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { addOrder, getOrder } from "@/app/lib/actions";

function getPort() {
  const defaultPort = 4000;
  const strPort = process.env.TIDB_PORT;
  if (typeof strPort === 'string') {
    return parseInt(strPort) || defaultPort;
  } else {
    return defaultPort;
  }
}

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.TIDB_HOST || 'localhost',
    port: getPort(),
    user: process.env.TIDB_USER || 'root',
    password: process.env.TIDB_PASSWORD || '',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: process.env.TIDB_REJECT_UNAUTHORIZED === "1"
    }
  });
  try {
console.log('🔄 Подключение к TiDB установлено. Создаем базу данных...');

    // 2. Выполняем SQL-запрос на создание базы данных
    const dbName = 'dzen_test_app_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
    console.log(`🟢 База данных "${dbName}" успешно создана (или уже существовала).`);


  await connection.query(`USE ${dbName};`);
} catch (error) {
    console.error('❌ Ошибка при инициализации базы данных:', error);
  } finally {
    // Обязательно закрываем соединение
    await connection.end();
  }
}

export const createConnection = async () => {
  return await mysql.createConnection({
    host: process.env.TIDB_HOST || 'localhost',
    port: getPort(),
    user: process.env.TIDB_USER || 'root',
    password: process.env.TIDB_PASSWORD || '',
    database: process.env.TIDB_NAME || 'dzen_test_app_db',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: process.env.TIDB_REJECT_UNAUTHORIZED === "1"
    }
  });
}

async function createTables() {
  const connection = await createConnection();
  try {
    console.log('🔄 Подключение к TiDB установлено. Создаем table orders...');

    // 2. Выполняем SQL-запрос на создание tables
    await connection.query(`CREATE TABLE IF NOT EXISTS orders (
      id int AUTO_INCREMENT PRIMARY KEY,
      orderName VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`);
    console.log('🟢 Таблица "orders" успешно инициализирована.');

    await connection.query(`CREATE TABLE IF NOT EXISTS productTypes (
      id int AUTO_INCREMENT PRIMARY KEY,
      productType VARCHAR(255) NOT NULL
      );`);
    console.log('🟢 Таблица "productTypes" успешно инициализирована.');

    await connection.query(`CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      productName VARCHAR(255) NOT NULL,
      productType INT NOT NULL,
      guaranteeFrom DATE NOT NULL,
      guaranteeUntil DATE NOT NULL,
      priceUAH INT,
      priceUSD INT,
      orderID INT NOT NULL,

      CONSTRAINT fk_product_type
        FOREIGN KEY (productType) REFERENCES productTypes(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,

      CONSTRAINT fk_product_order
        FOREIGN KEY (orderID) REFERENCES orders(id)
        ON DELETE CASCADE ON UPDATE CASCADE
      );`);

    console.log('🟢 Таблица "products" успешно инициализирована.');

} catch (error) {
    console.error('❌ Ошибка при инициализации базы данных:', error);
  } finally {
    // Обязательно закрываем соединение
    await connection.end();
  }
}

export async function GET() {
  await initDatabase();
  await createTables();
  return NextResponse.json({ success: true }, {status: 200});
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log('POST :: body', body);
  const { action, payload } = body;

  let result = null;
  const connection = await createConnection();
  try {
    switch (body.action) {
      case 'addOrder':
        const orderID = await addOrder({ connection, orderName: payload.orderName });
        result = await getOrder({connection, orderID});
        break;
      default:
        result = `Unknown acion ${action}`;
    }
} catch (error) {
    console.error('❌ Ошибка при инициализации базы данных:', error);
  } finally {
    // Обязательно закрываем соединение
    await connection.end();
  }

  return NextResponse.json({ success: true, result }, {status: 200});
}