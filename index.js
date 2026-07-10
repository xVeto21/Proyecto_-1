const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/productRoutes");

const app = express();

connectDB();

app.use(express.json());

// Ruta de prueba
app.get("/prueba", (req, res) => {
    res.send("Servidor funcionando");
});

// Rutas de productos
app.use("/api/productos", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});