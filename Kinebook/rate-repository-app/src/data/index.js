const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());


const   mongoURL =
  "mongodb+srv://ADMIN:1ayYpcTHzc5QelgJ@kinecluster.njnbyxo.mongodb.net/?retryWrites=true&w=majority&appName=KineCluster"
  ;

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => {
    console.error("Error connecting to MongoDB:", e);
  });


 
require('./kinesiologos');
const Kine = mongoose.model("Kines");


app.get("/", (req, res) => {
  res.send({status: "Started"});
});

app.post("/register", async(req, res) => {
  const {nombre, apellido, correo, contrasena} = req.body;

  const creado = await Kine.findOne({correo:correo});

  if(creado){
    res.status(400).send({message:"El correo ya existe"});
  }

  try {
    await Kine.create({
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      contraseña: contrasena,
    });
    res.send({status:"ok", data:"Kinesilogo Creado"})
  } catch (error) {
    res.send({status:"error", data:"Error"})
  }

})


app.listen(3000, () =>{
  console.log("nodeJS server started");
});
