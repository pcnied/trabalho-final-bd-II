// import "dotenv/config";
// import { Pool, PoolConfig } from "pg";

// // Comandos para editar conexões em Bancos de Dados externos
// const poolConfig: PoolConfig = {
//   connectionString: process.env.URL_DATABASE,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };

// const connectionPool = new Pool(poolConfig);

// async function getUsers() {
//   const client = await connectionPool.connect();
//   const response = await client.query("SELECT * FROM users");

//   client.release();

//   console.log(response.rows);
// }

// async function insertUser() {
//   const newUser = {
//     name: "Maria",
//     email: "maria@gmail.com",
//     password: "123456",
//   };

//   const client = await connectionPool.connect();
//   const response = await client.query(
//     "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
//     [newUser.name, newUser.email, newUser.password]
//   );

//   client.release();

//   console.log(response);
// }

// FUNÇÃO EXECUTADA();
