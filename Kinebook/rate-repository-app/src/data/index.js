const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuración de conexión a Oracle
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

// Endpoint para obtener datos
app.get('/api/users', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectarse a la base de datos');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

// Endpoint para agregar un nuevo usuario
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO users (name, email, password) VALUES (:name, :email, :password)`,
      [name, email, password],
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Usuario agregado exitosamente', userId: result.lastRowid });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar el usuario');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
