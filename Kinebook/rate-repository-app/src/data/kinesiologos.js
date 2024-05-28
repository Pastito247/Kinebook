const mongoose = require("mongoose");

const Esquema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo : {type: String, unique: true},
    contrasena : String,
},{
    collection:"Kines"
});

mongoose.model("Kines", Esquema);