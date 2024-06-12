// Importar dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Crear la aplicación express y definir el puerto
const app = express();
const port = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Definir el esquema y el modelo de Kinesiologo
const kinesiologoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: { type: String, unique: true },
  contraseña: String,
});

const Kinesiologo = mongoose.model('Kinesiologo', kinesiologoSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint para obtener los datos de un kinesiologo por ID
app.get('/api/kinesiologo/:id', async (req, res) => {
  try {
    const kinesiologo = await Kinesiologo.findById(req.params.id);
    if (!kinesiologo) {
      return res.status(404).json({ message: 'Kinesiologo no encontrado' });
    }
    res.json(kinesiologo);
  } catch (err) {
    console.error('Error al obtener el kinesiologo:', err);
    res.status(500).send('Error al obtener el kinesiologo');
  }
});

// Otros endpoints...
app.post('/api/kinesiologos', async (req, res) => {
  const { nombre, apellido, correo, contraseña } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10); // Hashear la contraseña
    const nuevoKinesiologo = new Kinesiologo({ nombre, apellido, correo, contraseña: hashedPassword });
    const savedKinesiologo = await nuevoKinesiologo.save();
    res.status(201).json({ message: 'Kinesiologo agregado exitosamente', kinesiologoId: savedKinesiologo._id });
  } catch (err) {
    console.error('Error al agregar el kinesiologo:', err);
    res.status(500).send('Error al agregar el kinesiologo');
  }
});

// Iniciar sesión
app.post('/api/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const kinesiologo = await Kinesiologo.findOne({ correo });
    if (!kinesiologo) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }
    const isMatch = await bcrypt.compare(contraseña, kinesiologo.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso', kinesiologoId: kinesiologo._id });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).send('Error al iniciar sesión');
  }
});

// Otros endpoints para crear, actualizar, eliminar kinesiologos...

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
