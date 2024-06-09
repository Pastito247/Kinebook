const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Para hashear las contraseñas
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGO_URI || 'mongodb+srv://ADMIN:1ayYpcTHzc5QelgJ@kinecluster.njnbyxo.mongodb.net/Kinebook?retryWrites=true&w=majority&appName=KineCluster';

// Conectar a MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Definir el esquema y el modelo
const kinesiologoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: { type: String, unique: true },
  contraseña: String,
});

const Kinesiologo = mongoose.model('Kinesiologo', kinesiologoSchema);

app.use(cors());
app.use(bodyParser.json());

// Endpoint para crear un nuevo kinesiologo
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

// Endpoint para iniciar sesión
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
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      kinesiologoId: kinesiologo._id,
      nombre: kinesiologo.nombre // Asegúrate de que el nombre se está devolviendo aquí
    });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).send('Error al iniciar sesión');
  }
});
// Endpoint para obtener todos los kinesiologos
app.get('/api/kinesiologos', async (req, res) => {
  try {
    const kinesiologos = await Kinesiologo.find();
    res.json(kinesiologos);
  } catch (err) {
    console.error('Error al obtener los kinesiologos:', err);
    res.status(500).send('Error al obtener los kinesiologos');
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
