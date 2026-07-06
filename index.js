const express = require("express");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/productRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(mongoSanitize());

app.use("/api/productos", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});