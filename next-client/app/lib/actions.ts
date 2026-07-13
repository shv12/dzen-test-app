import mysql from "mysql2/promise";
import { Order, ProductType, Product } from "@/app/types/definitions";

export const addOrder = async ({ orderName, connection }: {
  orderName: string,
  connection: mysql.Connection
}) => {
  const sql = `INSERT INTO orders (orderName) VALUES (?)`;
  const values = [
      orderName
  ];
  const [result] = await connection.execute(sql, values);
  const insertResult = result as mysql.ResultSetHeader;
  console.log('addOrder :: insertResult', insertResult);
  return insertResult.insertId;
}

export const addProduct = async ({ connection, payload }: {
  connection: mysql.Connection,
  payload: Product
}) => {
  const {
    productName,
    productType,
    guaranteeFrom,
    guaranteeUntil,
    priceUAH,
    priceUSD,
    orderID
  } = payload;

  // check if productTypes contains productType
  let productTypeID: number | undefined = 0;
  let addedProductType: ProductType | undefined | null = undefined;
  if (typeof productType === "string") {
    const productTypeResult = await getProductTypeID({ connection, productType });
    if ("addedProductType" in productTypeResult) {
      productTypeID = productTypeResult.addedProductType?.id;
      addedProductType = productTypeResult.addedProductType;
    } else {
      productTypeID = productTypeResult.productTypeID;
    }
  }

  const sql = `INSERT INTO products (
      productName,
      productType,
      guaranteeFrom,
      guaranteeUntil,
      priceUAH,
      priceUSD,
      orderID
  ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    productName,
    productTypeID!,
    guaranteeFrom,
    guaranteeUntil,
    priceUAH,
    priceUSD,
    orderID
  ];
  const [result] = await connection.execute(sql, values);
  const insertResult = result as mysql.ResultSetHeader;
  // console.log('actions :: addProduct :: insertResult', insertResult);
  const addedProduct = await getProduct({ connection, productID: insertResult.insertId });
  // console.log('actions :: addProduct :: addedProduct', addedProduct);
  return { addedProduct, addedProductType };
}

export const deleteOrder = async ({ connection, orderID }: {
  connection: mysql.Connection,
  orderID: number
}) => {
  const sql = `DELETE FROM orders WHERE id = ?`;
  const values = [orderID];
  const [result] = await connection.execute(sql, values);
  return result;
}

export const deleteOrderProduct = async ({ connection, productID }: {
  connection: mysql.Connection,
  productID: number
}) => {
 const sql = `DELETE FROM products WHERE id = ?`;
  const values = [productID];
  const [result] = await connection.execute(sql, values);
  return result;
}

export const getOrderProducts = async ({ connection, orderID }: {
  connection: mysql.Connection,
  orderID: number
}) => {
  const sql = `SELECT * FROM products WHERE orderID = ?`;
  const values = [orderID];
  const [result] = await connection.execute(sql, values);
  return result;
}

export const getOrders = async ({ connection }: {connection: mysql.Connection}) => {
    const sql = `
        SELECT
         o.id,
         o.orderName,
         o.createdAt,
         COUNT(p.id) AS productsCount,
         CAST(IFNULL(SUM(p.priceUAH), 0) AS DOUBLE) AS amountUAH,
         CAST(IFNULL(SUM(p.priceUSD), 0) AS DOUBLE) AS amountUSD
        FROM orders o
        LEFT JOIN products p ON o.id = p.orderID
        GROUP BY o.id, o.orderName, o.createdAt
        ORDER BY o.createdAt DESC;
    `;
    const [result] = await connection.execute(sql);
    // console.log('actions :: getOrders :: result', result);
    return result as Order[];
}

export const getOrder = async ({ connection, orderID }: {connection: mysql.Connection, orderID: number}) => {
  const sql = `
      SELECT
        o.id,
        o.orderName,
        o.createdAt,
        COUNT(p.id) AS productsCount,
        CAST(IFNULL(SUM(p.priceUAH), 0) AS DOUBLE) AS amountUAH,
        CAST(IFNULL(SUM(p.priceUSD), 0) AS DOUBLE) AS amountUSD
      FROM orders o
      LEFT JOIN products p ON o.id = p.orderID
      WHERE o.id = ?
      GROUP BY o.id, o.orderName, o.createdAt
      ORDER BY o.createdAt DESC;
  `;
  const values = [orderID,];
  const [result] = await connection.execute(sql, values);
  // console.log('getOrder :: result', result);
  const typedResult = result as Order[];
    if (typedResult.length > 0) {
        return typedResult[0];
    } else {
        return null;
    }
}

export const getProduct = async ({ connection, productID }: {
  connection: mysql.Connection,
  productID: number
}) => {
  const sql = `
    SELECT
      p.id,
      p.productName,
      p.guaranteeFrom,
      p.guaranteeUntil,
      p.priceUSD,
      p.priceUAH,
      p.productType,
      p.orderID,
      pt.productType AS productTypeName,
      o.orderName
    FROM
      products p,
      productTypes pt,
      orders o
    WHERE
      p.productType = pt.id AND
      p.orderID = o.id AND
      p.id = ?
  `;
  const values = [productID];
  const [result] = await connection.execute(sql, values);
  const typedResult = result as Product[];
  // console.log('actions :: getProduct :: typedResult', typedResult);
  if (typedResult.length > 0) {
    return typedResult[0];
  } else {
    return null;
  }
}

export const getProducts = async ({ connection }: { connection: mysql.Connection }) => {
  const sql = `
    SELECT
      p.id,
      p.productName,
      p.guaranteeFrom,
      p.guaranteeUntil,
      p.priceUSD,
      p.priceUAH,
      p.productType,
      p.orderID,
      pt.productType AS productTypeName,
      o.orderName
    FROM
      products p,
      productTypes pt,
      orders o
    WHERE
      p.productType = pt.id AND
      p.orderID = o.id
  `;
  const [result] = await connection.execute(sql);
  return result;
}

export const getProductsCount = async ({ connection }: { connection: mysql.Connection }) => {
  const sql = `SELECT COUNT(*) AS productsCount FROM products`;
  const [result] = await connection.execute(sql);
  const typedResult = result as { productsCount: number }[];
  return typedResult[0].productsCount;
}

const getProductType = async ({ connection, productTypeID }: {
  connection: mysql.Connection,
  productTypeID: number
}) => {
  const sql = `SELECT * FROM productTypes WHERE id = ?;`;
  const values = [productTypeID];
  const [result] = await connection.execute(sql, values);
  const typedResult = result as ProductType[];
  return typedResult.length > 0 ? typedResult[0] : null;
}

const getProductTypeID = async({ connection, productType }: {
  connection: mysql.Connection,
  productType: string
}) => {
  const productTypeSql = `SELECT * FROM productTypes WHERE productType = ?`;
  const productTypesValues = [productType];
  const [productTypesResult] = await connection.execute(productTypeSql, productTypesValues);
  const typedResult = productTypesResult as ProductType[];
  console.log("actions :: addProduct :: typedResult", typedResult);
  if (typedResult.length < 1) {
    // create new productType
    const sql = `INSERT INTO productTypes (productType) VALUES (?);`;
    const values = [productType];
    const [insertResult] = await connection.execute(sql, values);
    const typedResult = insertResult as mysql.ResultSetHeader;
    const addedProductType = await getProductType({
      connection,
      productTypeID: typedResult.insertId
    });
    return { addedProductType };
  } else {
    return { productTypeID: typedResult[0].id };
  }

}

export const getProductTypes = async ({ connection}: { connection: mysql.Connection}) => {
  const sql = `SELECT * from productTypes`;
  const [result] = await connection.execute(sql);
  const typedResult = result as ProductType[];
  return typedResult;
}