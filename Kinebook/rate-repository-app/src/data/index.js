const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const kinesiologoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: { type: String, unique: true },
  contraseña: String,
});

const Kinesiologo = mongoose.model('Kinesiologo', kinesiologoSchema);

const evaluacionSchema = new mongoose.Schema({
  type: String,
  answers: mongoose.Schema.Types.Mixed,
  kinesiologoId: mongoose.Schema.Types.ObjectId,
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  fecha: Date,
});

const Evaluacion = mongoose.model('Evaluacion', evaluacionSchema);

const pacienteSchema = new mongoose.Schema({
  rut: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellidoPaterno: { type: String, required: true },
  apellidoMaterno: { type: String },
  fechaNacimiento: { type: Date, required: true },
  diagnostico: { type: String, required: true },
  kinesiologoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kinesiologo', required: true },
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

app.use(cors());
app.use(bodyParser.json());

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

app.post('/api/kinesiologos', async (req, res) => {
  const { nombre, apellido, correo, contraseña } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevoKinesiologo = new Kinesiologo({ nombre, apellido, correo, contraseña: hashedPassword });
    const savedKinesiologo = await nuevoKinesiologo.save();
    res.status(201).json({ message: 'Kinesiologo agregado exitosamente', kinesiologoId: savedKinesiologo._id });
  } catch (err) {
    console.error('Error al agregar el kinesiologo:', err);
    res.status(500).send('Error al agregar el kinesiologo');
  }
});

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

app.post('/api/evaluaciones', async (req, res) => {
  try {
    const { type, answers, kinesiologoId, pacienteId, fecha, patientName } = req.body;
    if (!mongoose.Types.ObjectId.isValid(kinesiologoId) || !mongoose.Types.ObjectId.isValid(pacienteId)) {
      return res.status(400).json({ message: 'ID de kinesiólogo o paciente inválido' });
    }
    const nuevaEvaluacion = new Evaluacion({ type, answers, kinesiologoId, pacienteId, fecha, patientName });
    await nuevaEvaluacion.save();
    res.json({ message: 'Evaluacion agregada exitosamente' });
  } catch (error) {
    console.error('Error al guardar la evaluación:', error);
    res.status(500).json({ message: 'Error al guardar la evaluación' });
  }
});


app.get('/api/evaluaciones', async (req, res) => {
  try {
    const { kinesiologoId } = req.query;
    if (!mongoose.Types.ObjectId.isValid(kinesiologoId)) {
      return res.status(400).json({ message: 'ID de kinesiólogo inválido' });
    }
    const evaluaciones = await Evaluacion.find({ kinesiologoId });
    res.json(evaluaciones);
  } catch (error) {
    console.error('Error al obtener las evaluaciones:', error);
    res.status(500).json({ message: 'Error al obtener las evaluaciones' });
  }
});
app.get('/api/evaluaciones/paciente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { kinesiologoId } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(kinesiologoId)) {
      return res.status(400).json({ message: 'ID de paciente o kinesiólogo inválido' });
    }
    const evaluaciones = await Evaluacion.find({ pacienteId: id, kinesiologoId });
    res.json(evaluaciones);
  } catch (error) {
    console.error('Error al obtener las evaluaciones del paciente:', error);
    res.status(500).json({ message: 'Error al obtener las evaluaciones del paciente' });
  }
});


app.get('/api/evaluaciones/:id', async (req, res) => {
  try {
    const evaluacion = await Evaluacion.findById(req.params.id);
    if (!evaluacion) {
      return res.status(404).json({ message: 'Evaluacion no encontrada' });
    }
    res.json(evaluacion);
  } catch (err) {
    console.error('Error al obtener la evaluacion:', err);
    res.status(500).send('Error al obtener la evaluacion');
  }
});

app.delete('/api/evaluaciones/:id', async (req, res) => {
  try {
    const evaluacionId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(evaluacionId)) {
      return res.status(400).json({ message: 'ID de evaluación inválido' });
    }
    const evaluacion = await Evaluacion.findByIdAndDelete(evaluacionId);
    if (!evaluacion) {
      return res.status(404).json({ message: 'Evaluación no encontrada' });
    }
    res.json({ message: 'Evaluación eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar la evaluación:', err.message);
    res.status(500).json({ message: 'Error al eliminar la evaluación' });
  }
});

app.post('/api/pacientes', async (req, res) => {
  const { rut, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, diagnostico, kinesiologoId } = req.body;
  try {
    const nuevoPaciente = new Paciente({
      rut,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      diagnostico,
      kinesiologoId,
    });
    const savedPaciente = await nuevoPaciente.save();
    res.status(201).json({ message: 'Paciente agregado exitosamente', pacienteId: savedPaciente._id });
  } catch (err) {
    console.error('Error al agregar el paciente:', err);
    res.status(500).send('Error al agregar el paciente');
  }
});

app.get('/api/pacientes', async (req, res) => {
  try {
    const { kinesiologoId } = req.query;
    if (!mongoose.Types.ObjectId.isValid(kinesiologoId)) {
      return res.status(400).json({ message: 'ID de kinesiólogo inválido' });
    }
    const pacientes = await Paciente.find({ kinesiologoId });
    res.json(pacientes);
  } catch (error) {
    console.error('Error al obtener los pacientes:', error);
    res.status(500).json({ message: 'Error al obtener los pacientes' });
  }
});
app.get('/api/evaluaciones/paciente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const evaluaciones = await Evaluacion.find({ pacienteId: id, kinesiologoId: req.query.kinesiologoId });
    res.json(evaluaciones);
  } catch (error) {
    console.error('Error al obtener las evaluaciones del paciente:', error);
    res.status(500).json({ message: 'Error al obtener las evaluaciones del paciente' });
  }
});
app.get('/api/pacientes/:id', async (req, res) => {
  try {
    const pacienteId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(pacienteId)) {
      return res.status(400).json({ message: 'ID de paciente inválido' });
    }
    const paciente = await Paciente.findById(pacienteId);
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    res.json(paciente);
  } catch (err) {
    console.error('Error al obtener el paciente:', err);
    res.status(500).send('Error al obtener el paciente');
  }
});



app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
